import prisma from '../utils/prisma';

// Interface for search result documents
interface SearchResult {
    id: number;
    filename: string;
    content: string;
    content_raw: string;
    score: number;
    tfIdfDetails?: {
        queryTerms: string[];
        termScores: { [term: string]: { tf: number; idf: number; tfIdf: number; isFuzzy: boolean } };
        totalScore: number;
        cosineSimilarity: number;
        tfIdfScore: number;
        combinedScore: number;
    };
}

// Simple query tokenization function (splits by spaces and cleans)
const tokenizeQuery = (text: string): string[] => {
    return text
        .toLowerCase()
        .split(/\s+/)
        .filter((token: string) => token.length > 0 && /^[a-zA-Z]+$/.test(token));
};

// Calculate Levenshtein distance for fuzzy matching
const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = Array(Math.max(str1.length, str2.length) + 1)
        .fill(null)
        .map(() => Array(Math.max(str1.length, str2.length) + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) {
        matrix[0][i] = i;
    }

    for (let j = 0; j <= str2.length; j++) {
        matrix[j][0] = j;
    }

    for (let j = 1; j <= str2.length; j++) {
        for (let i = 1; i <= str1.length; i++) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j][i - 1] + 1, // deletion
                matrix[j - 1][i] + 1, // insertion
                matrix[j - 1][i - 1] + indicator // substitution
            );
        }
    }

    return matrix[str2.length][str1.length];
};

// Find fuzzy matches for a term in a list of terms
const findFuzzyMatches = (queryTerm: string, terms: string[], maxDistance: number = 2): string[] => {
    const matches = [];
    for (const term of terms) {
        const distance = levenshteinDistance(queryTerm, term);
        if (distance <= maxDistance) {
            matches.push(term);
        }
    }
    return matches;
};

// Enhanced tokenization with fuzzy matching
const expandQueryWithFuzzy = (queryTerms: string[], vocabulary: string[]): string[] => {
    const expandedTerms = new Set<string>();
    
    for (const queryTerm of queryTerms) {
        // Add exact match
        expandedTerms.add(queryTerm);
        
        // Add fuzzy matches (distance <= 2 for terms >= 4 chars, distance <= 1 for shorter terms)
        const maxDistance = queryTerm.length >= 4 ? 2 : 1;
        const fuzzyMatches = findFuzzyMatches(queryTerm, vocabulary, maxDistance);
        fuzzyMatches.forEach(match => expandedTerms.add(match));
    }
    
    return Array.from(expandedTerms);
};

// Calculate Term Frequency (TF)
const calculateTF = (term: string, document: string[]): number => {
    const termCount = document.filter(t => t === term).length;
    return termCount / document.length;
};

// Calculate Inverse Document Frequency (IDF)
const calculateIDF = (term: string, corpus: string[][], totalDocs: number): number => {
    const docsContainingTerm = corpus.filter(doc => doc.includes(term)).length;
    if (docsContainingTerm === 0) return 0;
    return Math.log(totalDocs / docsContainingTerm);
};

// Calculate TF-IDF score
const calculateTFIDF = (tf: number, idf: number): number => {
    return tf * idf;
};

// Build vocabulary from entire corpus
const buildVocabulary = (corpus: string[][]): string[] => {
    const vocabularySet = new Set<string>();
    corpus.forEach(doc => {
        doc.forEach(term => vocabularySet.add(term));
    });
    return Array.from(vocabularySet);
};

// Create TF-IDF vector for document
const createTFIDFVector = (
    documentTerms: string[], 
    vocabulary: string[], 
    corpus: string[][], 
    totalDocs: number
): number[] => {
    return vocabulary.map(term => {
        const tf = calculateTF(term, documentTerms);
        const idf = calculateIDF(term, corpus, totalDocs);
        return calculateTFIDF(tf, idf);
    });
};

// Calculate dot product of two vectors
const dotProduct = (vectorA: number[], vectorB: number[]): number => {
    return vectorA.reduce((sum, a, i) => sum + (a * vectorB[i]), 0);
};

// Calculate magnitude (norm) of vector
const magnitude = (vector: number[]): number => {
    return Math.sqrt(vector.reduce((sum, val) => sum + (val * val), 0));
};

// Calculate Cosine Similarity between two vectors
const cosineSimilarity = (vectorA: number[], vectorB: number[]): number => {
    const dot = dotProduct(vectorA, vectorB);
    const magA = magnitude(vectorA);
    const magB = magnitude(vectorB);
    
    if (magA === 0 || magB === 0) return 0;
    return dot / (magA * magB);
};

// Calculate similarity score for query vs document with TF-IDF + Cosine Similarity + Fuzzy matching
const calculateDocumentScore = (
    originalQueryTerms: string[],
    expandedQueryTerms: string[], 
    documentTerms: string[], 
    corpus: string[][], 
    totalDocs: number,
    vocabulary: string[],
    queryVector: number[]
): { 
    score: number; 
    details: { [term: string]: { tf: number; idf: number; tfIdf: number; isFuzzy: boolean } };
    cosineSim: number;
    tfIdfScore: number;
} => {
    let tfIdfScore = 0;
    const termDetails: { [term: string]: { tf: number; idf: number; tfIdf: number; isFuzzy: boolean } } = {};
    
    // Calculate TF-IDF score for all expanded query terms (including fuzzy matches)
    for (const queryTerm of expandedQueryTerms) {
        const tf = calculateTF(queryTerm, documentTerms);
        const idf = calculateIDF(queryTerm, corpus, totalDocs);
        const tfIdf = calculateTFIDF(tf, idf);
        
        // Check if this is a fuzzy match (not in original query terms)
        const isFuzzy = !originalQueryTerms.includes(queryTerm);
        
        // Apply penalty for fuzzy matches
        const fuzzyPenalty = isFuzzy ? 0.7 : 1.0; // 70% score for fuzzy matches
        const adjustedTfIdf = tfIdf * fuzzyPenalty;
        
        termDetails[queryTerm] = { tf, idf, tfIdf: adjustedTfIdf, isFuzzy };
        tfIdfScore += adjustedTfIdf;
    }
    
    // Create TF-IDF vector for document using expanded terms
    const documentVector = createTFIDFVector(documentTerms, vocabulary, corpus, totalDocs);
    
    // Calculate Cosine Similarity
    const cosineSim = cosineSimilarity(queryVector, documentVector);
    
    // Combined score: TF-IDF + weighted Cosine Similarity
    const cosineWeight = 0.7; // 70% for cosine similarity
    const tfIdfWeight = 0.3;  // 30% for traditional TF-IDF
    
    const combinedScore = (tfIdfScore * tfIdfWeight) + (cosineSim * cosineWeight);
    
    return { 
        score: combinedScore, 
        details: termDetails,
        cosineSim,
        tfIdfScore
    };
};

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { query, debugMode = false } = body;
        
        if (!query || typeof query !== 'string') {
            throw new Error('Query parameter is required');
        }
        
        // Tokenize query
        const originalQueryTerms = tokenizeQuery(query);
        if (originalQueryTerms.length === 0) {
            return { results: [], message: 'No valid terms found in query after preprocessing' };
        }
        
        // Get all documents from database
        const documents = await prisma.document.findMany({
            select: {
                id: true,
                filename: true,
                content: true,
                content_raw: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        
        if (documents.length === 0) {
            return { results: [], message: 'No documents found in database' };
        }
        
        // Preprocess all documents and build corpus
        const corpus: string[][] = [];
        const documentMap: { [index: number]: typeof documents[0] } = {};
        
        documents.forEach((doc: typeof documents[0], index: number) => {
            // Content is already preprocessed, just split by spaces
            const processedTokens = doc.content.split(' ').filter((token: string) => token.length > 0);
            corpus.push(processedTokens);
            documentMap[index] = doc;
        });
        
        // Build vocabulary from entire corpus
        const vocabulary = buildVocabulary(corpus);
        
        // Expand query terms with fuzzy matching
        const expandedQueryTerms = expandQueryWithFuzzy(originalQueryTerms, vocabulary);
        
        // Create TF-IDF vector for query using expanded terms
        const queryVector = createTFIDFVector(expandedQueryTerms, vocabulary, corpus, documents.length);
        
        // Calculate similarity score for each document
        const searchResults: SearchResult[] = [];
        
        corpus.forEach((documentTokens, docIndex) => {
            const document = documentMap[docIndex];
            
            // Calculate combined score (TF-IDF + Cosine Similarity + Fuzzy matching)
            const { score: baseScore, details, cosineSim, tfIdfScore } = calculateDocumentScore(
                originalQueryTerms,
                expandedQueryTerms, 
                documentTokens, 
                corpus, 
                documents.length,
                vocabulary,
                queryVector
            );
            
            // Filename boost: check if query terms exist in filename (including fuzzy matches)
            let filenameBoost = 0;
            const filenameTokens = tokenizeQuery(document.filename);
            
            // Check original query terms first (higher boost)
            for (const queryTerm of originalQueryTerms) {
                if (filenameTokens.includes(queryTerm)) {
                    filenameBoost += 2.0; // Significant boost for exact filename match
                }
                
                // Partial matching for filename
                if (document.filename.toLowerCase().includes(queryTerm)) {
                    filenameBoost += 1.0;
                }
            }
            
            // Check fuzzy matches in filename (lower boost)
            for (const queryTerm of expandedQueryTerms) {
                if (!originalQueryTerms.includes(queryTerm)) {
                    if (filenameTokens.includes(queryTerm)) {
                        filenameBoost += 1.0; // Lower boost for fuzzy filename match
                    }
                    
                    // Fuzzy partial matching for filename
                    if (document.filename.toLowerCase().includes(queryTerm)) {
                        filenameBoost += 0.5;
                    }
                }
            }
            
            const finalScore = baseScore + filenameBoost;
            
            // Only add to results if score > 0
            if (finalScore > 0) {
                const result: SearchResult = {
                    id: document.id,
                    filename: document.filename,
                    content: document.content,
                    content_raw: document.content_raw,
                    score: finalScore
                };
                
                // Add TF-IDF details if debug mode is active
                if (debugMode) {
                    result.tfIdfDetails = {
                        queryTerms: originalQueryTerms,
                        termScores: details,
                        totalScore: finalScore,
                        cosineSimilarity: cosineSim,
                        tfIdfScore: tfIdfScore,
                        combinedScore: baseScore
                    };
                }
                
                searchResults.push(result);
            }
        });
        
        // Sort by score (descending)
        searchResults.sort((a, b) => b.score - a.score);
        
        // Limit results (optional)
        const limitedResults = searchResults.slice(0, 20);
        
        return {
            results: limitedResults,
            totalFound: searchResults.length,
            queryInfo: {
                originalQuery: query,
                originalTerms: originalQueryTerms,
                expandedTerms: expandedQueryTerms,
                fuzzyMatches: expandedQueryTerms.filter(term => !originalQueryTerms.includes(term)),
                totalDocuments: documents.length
            }
        };
        
    } catch (error) {
        console.error('TF-IDF Search Error:', error);
        return {
            error: true,
            message: (error as Error).message || 'Internal Server Error',
            results: []
        };
    }
});
