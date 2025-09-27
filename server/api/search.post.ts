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
        termScores: { [term: string]: { tf: number; idf: number; tfIdf: number } };
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

// Calculate similarity score for query vs document with TF-IDF + Cosine Similarity
const calculateDocumentScore = (
    queryTerms: string[], 
    documentTerms: string[], 
    corpus: string[][], 
    totalDocs: number,
    vocabulary: string[],
    queryVector: number[]
): { 
    score: number; 
    details: { [term: string]: { tf: number; idf: number; tfIdf: number } };
    cosineSim: number;
    tfIdfScore: number;
} => {
    let tfIdfScore = 0;
    const termDetails: { [term: string]: { tf: number; idf: number; tfIdf: number } } = {};
    
    // Calculate traditional TF-IDF score for query terms
    for (const queryTerm of queryTerms) {
        const tf = calculateTF(queryTerm, documentTerms);
        const idf = calculateIDF(queryTerm, corpus, totalDocs);
        const tfIdf = calculateTFIDF(tf, idf);
        
        termDetails[queryTerm] = { tf, idf, tfIdf };
        tfIdfScore += tfIdf;
    }
    
    // Create TF-IDF vector for document
    const documentVector = createTFIDFVector(documentTerms, vocabulary, corpus, totalDocs);
    
    // Calculate Cosine Similarity
    const cosineSim = cosineSimilarity(queryVector, documentVector);
    
    // Combined score: TF-IDF + weighted Cosine Similarity
    // Weight for cosine similarity to strengthen relevance of similar documents
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
        const queryTerms = tokenizeQuery(query);
        if (queryTerms.length === 0) {
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
        
        // Create TF-IDF vector for query
        const queryVector = createTFIDFVector(queryTerms, vocabulary, corpus, documents.length);
        
        // Calculate similarity score for each document
        const searchResults: SearchResult[] = [];
        
        corpus.forEach((documentTokens, docIndex) => {
            const document = documentMap[docIndex];
            
            // Calculate combined score (TF-IDF + Cosine Similarity)
            const { score: baseScore, details, cosineSim, tfIdfScore } = calculateDocumentScore(
                queryTerms, 
                documentTokens, 
                corpus, 
                documents.length,
                vocabulary,
                queryVector
            );
            
            // Filename boost: check if query terms exist in filename
            let filenameBoost = 0;
            const filenameTokens = tokenizeQuery(document.filename);
            
            for (const queryTerm of queryTerms) {
                if (filenameTokens.includes(queryTerm)) {
                    filenameBoost += 2.0; // Significant boost for filename match
                }
                
                // Partial matching for filename
                if (document.filename.toLowerCase().includes(queryTerm)) {
                    filenameBoost += 1.0;
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
                        queryTerms,
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
                processedTerms: queryTerms,
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
