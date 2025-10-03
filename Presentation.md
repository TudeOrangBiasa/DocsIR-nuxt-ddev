# Coding Information Retrieval System from Scratch
**Tutorial: Membangun Search Engine dengan TF-IDF & Cosine Similarity**

---

## 🎯 **Tujuan Utama: Coding Information Retrieval System**

Project ini adalah **tutorial step-by-step bagaimana membangun Information Retrieval (IR) system dari nol menggunakan coding**. Bukan hanya menggunakan library search engine yang sudah jadi, tetapi **mengimplementasikan algoritma IR secara manual** untuk memahami bagaimana search engine bekerja di level fundamental.

### **Learning Objectives:**
1. **Memahami teori Information Retrieval** melalui implementasi kode langsung
2. **Mengkoding algoritma TF-IDF dari scratch** tanpa dependency library IR
3. **Mengimplementasikan Cosine Similarity** untuk document similarity measurement  
4. **Membangun complete search pipeline** dari text preprocessing hingga ranking
5. **Memahami trade-offs algoritma IR** melalui eksperimen coding langsung

### **Mengapa Coding IR dari Scratch?**
- **Deep Understanding**: Memahami setiap step algoritma, bukan black box
- **Customizable**: Bisa modify algoritma sesuai kebutuhan spesifik
- **Performance Control**: Optimize setiap component untuk use case tertentu
- **Academic Foundation**: Memahami mathematical foundation yang sebenarnya

---

## 🧠 **Information Retrieval: Masalah yang Harus Dipecahkan**

### **Problem Statement: Mengapa Butuh IR System?**
```
User Query: "machine learning algorithms"
Documents: 1000+ PDF papers tentang berbagai topik

Challenge: Bagaimana menemukan dokumen paling relevan?
```

### **Naive Approach vs Smart Approach:**

#### ❌ **Naive String Matching:**
```javascript
// SALAH: Simple substring search
const naiveSearch = (query, documents) => {
    return documents.filter(doc => 
        doc.content.toLowerCase().includes(query.toLowerCase())
    );
};
```

**Masalah Naive Approach:**
1. **No ranking**: Semua hasil dianggap sama penting
2. **Exact match only**: "run" tidak match dengan "running"
3. **No relevance**: Document dengan 1 match = document dengan 100 matches
4. **Common words bias**: Document dengan "the, a, is" dianggap relevan

#### ✅ **Information Retrieval Approach:**
```javascript
// BENAR: IR-based search dengan scoring
const irSearch = (query, documents) => {
    // 1. Preprocess query dan documents
    // 2. Calculate TF-IDF scores
    // 3. Measure document similarity  
    // 4. Rank by relevance score
    // 5. Return top-k results
};
```

### **Core IR Problems yang Harus Diselesaikan:**
1. **Text Normalization**: Bagaimana standardize text untuk comparison?
2. **Term Weighting**: Bagaimana weight importance setiap kata?
3. **Document Similarity**: Bagaimana measure relevance document dengan query?
4. **Ranking**: Bagaimana sort results by relevance?

---

## 💡 **Mengapa TF-IDF? Problem Solving Approach**

### **Problem 1: Kata yang Sering Muncul ≠ Penting**
```
Document A: "The cat sat on the mat. The mat was red."
Query: "cat"

Frequency Count:
- "the" = 3 occurrences
- "cat" = 1 occurrence
- "mat" = 2 occurrences
```

**Masalah**: Kata "the" paling frequent, tapi tidak relevan dengan query "cat"

**Solusi TF-IDF**: Beri weight lebih tinggi pada kata yang **rare di corpus tapi frequent di document**

### **Problem 2: Document Length Bias**
```
Document A (short): "Machine learning is powerful" (4 words)
Document B (long): "This is a very long document about various topics including machine learning and many other subjects..." (100+ words)

Query: "machine learning"
```

**Masalah**: Document panjang akan punya raw count lebih tinggi, tapi belum tentu lebih relevan

**Solusi Term Frequency**: Normalize dengan panjang document
```javascript
TF = (count of term in document) / (total terms in document)
```

### **Problem 3: Common Words Everywhere**
```
Corpus:
- Document 1: "The machine learning algorithm is good"
- Document 2: "The database system is efficient"  
- Document 3: "The web application is fast"

Query: "machine learning"
```

**Analisis**:
- "the" muncul di semua document → tidak discriminative
- "machine learning" hanya di 1 document → very discriminative

**Solusi Inverse Document Frequency**:
```javascript
IDF = log(total_documents / documents_containing_term)
```

### **TF-IDF: Kombinasi Solusi**
```javascript
TF-IDF = TF × IDF
```

**Interpretasi**:
- **High TF**: Term frequent dalam document (relevan dengan document)
- **High IDF**: Term rare dalam corpus (discriminative)
- **High TF-IDF**: Term yang important untuk document dan unique dalam corpus

---

## 🎯 **Mengapa Cosine Similarity? Advanced Problem Solving**

### **Problem: TF-IDF Alone is Not Enough**

#### **Case Study: Document Similarity**
```
Query: "machine learning algorithm"

Document A: "machine learning algorithm neural network"
TF-IDF scores: [0.5, 0.6, 0.7, 0.3] = Total: 2.1

Document B: "algorithm machine learning technique method approach"  
TF-IDF scores: [0.7, 0.5, 0.6, 0.2, 0.4, 0.3] = Total: 2.7
```

**Problem dengan Sum of TF-IDF**:
- Document B punya total score lebih tinggi
- Tapi Document A lebih similar dengan query (exact match 3/3 terms)
- **Length bias**: Document panjang akan punya total score lebih tinggi

### **Solusi: Vector Space Model**

#### **Konsep: Document sebagai Vector**
```
Vocabulary: [machine, learning, algorithm, neural, network, technique, method, approach]

Query Vector:    [0.5, 0.6, 0.7, 0.0, 0.0, 0.0, 0.0, 0.0]
Document A:      [0.5, 0.6, 0.7, 0.3, 0.0, 0.0, 0.0, 0.0]  
Document B:      [0.5, 0.6, 0.7, 0.0, 0.0, 0.2, 0.4, 0.3]
```

#### **Cosine Similarity: Angle Between Vectors**
```javascript
// Cosine similarity measures angle, not magnitude
cos(θ) = (A · B) / (||A|| × ||B||)
```

**Mengapa Cosine, bukan Euclidean Distance?**

```
Query = [1, 1, 0]
Doc A = [2, 2, 0]  // Same direction, different magnitude
Doc B = [1, 0, 1]  // Different direction, same magnitude

Euclidean Distance:
- distance(Query, Doc A) = sqrt((1-2)² + (1-2)² + (0-0)²) = sqrt(2) = 1.41
- distance(Query, Doc B) = sqrt((1-1)² + (1-0)² + (0-1)²) = sqrt(2) = 1.41

Cosine Similarity:
- cos(Query, Doc A) = (1×2 + 1×2 + 0×0) / (sqrt(2) × sqrt(8)) = 4/4 = 1.0 (perfect)
- cos(Query, Doc B) = (1×1 + 1×0 + 0×1) / (sqrt(2) × sqrt(2)) = 1/2 = 0.5 (partial)
```

**Kesimpulan**: Cosine similarity fokus pada **direction (content similarity)**, bukan **magnitude (document length)**

---

## 🔧 **Step 1: Coding Text Preprocessing Pipeline**

### **Masalah: Raw Text is Messy**
```
Input: "The students are studying ADVANCED algorithms in 2024!!!"
Goal: Standardize untuk IR processing
```

### **Solution: Step-by-Step Preprocessing**

#### **Step 1: Tokenization + Lowercasing**
```javascript
const tokenizer = new WordTokenizer();
let tokens = tokenizer.tokenize(text.toLowerCase());
// Result: ["the", "students", "are", "studying", "advanced", "algorithms", "in", "2024"]
```

**Mengapa lowercase?** 
- "Algorithm" vs "algorithm" harus dianggap sama
- Case-insensitive search lebih user-friendly

#### **Step 2: Stopwords Removal**
```javascript
// Problem: Common words tidak memberikan information
const indonesianStopwords = ['ada', 'adalah', 'dan', 'atau', 'yang', ...]; // 400+ words
const englishStopwords = ['the', 'a', 'an', 'and', 'or', 'but', ...];

tokens = tokens.filter(token => 
    !englishStopwords.includes(token) && 
    !indonesianStopwords.includes(token)
);
// Result: ["students", "studying", "advanced", "algorithms", "2024"]
```

**Mengapa remove stopwords?**
- Kata seperti "the", "and", "adalah" muncul di semua document
- Tidak discriminative untuk ranking
- Menghemat computational resources

#### **Step 3: Non-Alphabetic Filtering**
```javascript
tokens = tokens.filter(token => token.match(/^[a-zA-Z]+$/));
// Result: ["students", "studying", "advanced", "algorithms"]
// Removed: "2024" (number)
```

**Mengapa remove numbers/punctuation?**
- Focus pada semantic content
- Numbers sering tidak relevant untuk general search
- Simplified processing pipeline

#### **Step 4: Stemming - Core IR Technique**
```javascript
// Problem: "running", "runs", "ran" should be treated as same concept
tokens = tokens.map(token => PorterStemmer.stem(token));
// Result: ["student", "studi", "advanc", "algorithm"]
```

**Porter Stemmer Algorithm (Simplified)**:
```javascript
// Rule-based stemming
"running" → remove "ing" → "run"  
"studies" → remove "ies" → "studi"
"advanced" → remove "d" → "advanc"
```

**Mengapa Stemming Critical untuk IR?**
- **Improves Recall**: "search" query matches "searching", "searched"
- **Reduces Vocabulary**: Less unique terms = more efficient processing
- **Semantic Grouping**: Related word forms treated as same concept

#### **Step 5: Join Back to String**
```javascript
return preprocessedTokens.join(' ');
// Final Result: "student studi advanc algorithm"
```

### **Complete Preprocessing Function:**
```javascript
const preprocessText = (text) => {
    let tokens = tokenizer.tokenize(text.toLowerCase()); 
    
    return tokens
        .filter(token => !stopwords.includes(token) && !indonesianStopwords.includes(token))
        .filter(token => token.match(/^[a-zA-Z]+$/))
        .map(token => PorterStemmer.stem(token))
        .join(' ');
};
```

### **Why This Pipeline Works for IR:**
1. **Standardization**: All text processed consistently
2. **Noise Reduction**: Focus on meaningful terms
3. **Normalization**: Different forms of same word unified  
4. **Efficiency**: Smaller vocabulary = faster processing

---

## 🧮 **Step 2: Coding TF-IDF Algorithm dari Scratch**

### **Real Example: Understanding TF-IDF Through Code**

#### **Sample Corpus untuk Experiment:**
```javascript
const corpus = [
    "machine learning algorithm neural network",           // Doc 1
    "database management system performance",              // Doc 2  
    "machine learning data mining techniques",             // Doc 3
    "neural network deep learning machine"                 // Doc 4
];

const query = "machine learning";
```

### **Step 2.1: Coding Term Frequency (TF)**

#### **Mathematical Definition:**
```
TF(t,d) = (count of term t in document d) / (total terms in document d)
```

#### **Code Implementation:**
```javascript
const calculateTF = (term, document) => {
    const termCount = document.filter(word => word === term).length;
    const totalTerms = document.length;
    
    return termCount / totalTerms;
};

// Example calculation:
const doc1 = ["machine", "learning", "algorithm", "neural", "network"];
const tf_machine_doc1 = calculateTF("machine", doc1);
// Result: 1/5 = 0.2 (machine appears 1 time in 5 total terms)

const tf_learning_doc1 = calculateTF("learning", doc1);  
// Result: 1/5 = 0.2

const tf_database_doc1 = calculateTF("database", doc1);
// Result: 0/5 = 0.0 (database not in doc1)
```

**Why TF Matters:**
- **Local Relevance**: High TF = term is important to this specific document
- **Length Normalization**: Prevents bias toward longer documents
- **Proportional Weighting**: More mentions = higher relevance

### **Step 2.2: Coding Inverse Document Frequency (IDF)**

#### **Mathematical Definition:**
```
IDF(t) = log(total_documents / documents_containing_term)
```

#### **Code Implementation:**
```javascript
const calculateIDF = (term, corpus, totalDocs) => {
    const docsContainingTerm = corpus.filter(doc => 
        doc.includes(term)
    ).length;
    
    if (docsContainingTerm === 0) return 0; // Avoid division by zero
    
    return Math.log(totalDocs / docsContainingTerm);
};

// Example calculation dengan corpus di atas:
const totalDocs = 4;

const idf_machine = calculateIDF("machine", corpus, totalDocs);
// "machine" appears in doc1, doc3, doc4 = 3 documents
// IDF = log(4/3) = log(1.33) = 0.29

const idf_database = calculateIDF("database", corpus, totalDocs);  
// "database" appears in doc2 only = 1 document
// IDF = log(4/1) = log(4) = 1.39

const idf_the = calculateIDF("the", corpus, totalDocs);
// Hypothetical: "the" appears in all 4 documents
// IDF = log(4/4) = log(1) = 0.0
```

**Why IDF Matters:**
- **Global Rarity**: High IDF = term is rare and discriminative
- **Stopword Penalty**: Common words get low IDF (close to 0)
- **Uniqueness Reward**: Rare terms get high IDF

### **Step 2.3: Combining TF-IDF**

#### **Code Implementation:**
```javascript
const calculateTFIDF = (term, document, corpus, totalDocs) => {
    const tf = calculateTF(term, document);
    const idf = calculateIDF(term, corpus, totalDocs);
    
    return tf * idf;
};

// Complete example:
const doc1 = ["machine", "learning", "algorithm", "neural", "network"];

const tfidf_machine_doc1 = calculateTFIDF("machine", doc1, corpus, 4);
// TF = 0.2, IDF = 0.29
// TF-IDF = 0.2 × 0.29 = 0.058

const tfidf_database_doc1 = calculateTFIDF("database", doc1, corpus, 4);
// TF = 0.0, IDF = 1.39  
// TF-IDF = 0.0 × 1.39 = 0.0
```

### **Step 2.4: Full Document Scoring**

```javascript
const scoreDocument = (queryTerms, document, corpus, totalDocs) => {
    let totalScore = 0;
    const termDetails = {};
    
    for (const term of queryTerms) {
        const tf = calculateTF(term, document);
        const idf = calculateIDF(term, corpus, totalDocs);
        const tfidf = tf * idf;
        
        termDetails[term] = { tf, idf, tfidf };
        totalScore += tfidf;
    }
    
    return { totalScore, termDetails };
};

// Example scoring untuk query "machine learning":
const queryTerms = ["machine", "learning"];
const result = scoreDocument(queryTerms, doc1, corpus, 4);

// Result:
// {
//   totalScore: 0.116,
//   termDetails: {
//     machine: { tf: 0.2, idf: 0.29, tfidf: 0.058 },
//     learning: { tf: 0.2, idf: 0.29, tfidf: 0.058 }
//   }
// }
```

### **Why This TF-IDF Implementation Works:**

1. **Mathematical Soundness**: Follows academic IR literature exactly
2. **Edge Case Handling**: Zero division protection, missing terms
3. **Interpretable Results**: Can debug why document gets certain score
4. **Scalable**: Works with any corpus size

### **TF-IDF Limitations (Why We Need Cosine Similarity Next):**

```javascript
// Problem scenario:
const shortDoc = ["machine", "learning"];                    // 2 terms
const longDoc = ["machine", "learning", "other", "terms"];   // 4 terms + noise

// TF-IDF scores:
// shortDoc: machine(0.5×0.29) + learning(0.5×0.29) = 0.29
// longDoc: machine(0.25×0.29) + learning(0.25×0.29) = 0.145

// Problem: shortDoc gets higher score, but both equally relevant!
// Solution: Need length-normalized similarity → Cosine Similarity
```

---

## 📐 **Step 3: Coding Cosine Similarity untuk Advanced IR**

### **Problem: TF-IDF Bias Toward Document Length**

#### **Concrete Example:**
```javascript
// Scenario: Same content, different verbosity
const query = ["machine", "learning"];

const conciseDoc = ["machine", "learning"];  
// TF-IDF: machine(0.5×0.69) + learning(0.5×0.69) = 0.69

const verboseDoc = ["machine", "learning", "technique", "method", "approach", "system"];
// TF-IDF: machine(0.167×0.69) + learning(0.167×0.69) = 0.23

// Problem: Concise doc gets 3x higher score, but content similarity is same!
```

### **Solution: Vector Space Model + Cosine Similarity**

#### **Step 3.1: Build Vocabulary dari Corpus**
```javascript
const buildVocabulary = (corpus) => {
    const vocabularySet = new Set();
    
    corpus.forEach(doc => {
        doc.forEach(term => vocabularySet.add(term));
    });
    
    return Array.from(vocabularySet);
};

// Example:
const corpus = [
    ["machine", "learning", "algorithm"],
    ["database", "system", "performance"],  
    ["machine", "learning", "data", "mining"]
];

const vocabulary = buildVocabulary(corpus);
// Result: ["machine", "learning", "algorithm", "database", "system", "performance", "data", "mining"]
```

#### **Step 3.2: Create TF-IDF Vectors**
```javascript
const createVector = (document, vocabulary, corpus, totalDocs) => {
    return vocabulary.map(term => {
        if (document.includes(term)) {
            const tf = calculateTF(term, document);
            const idf = calculateIDF(term, corpus, totalDocs);
            return tf * idf;
        } else {
            return 0; // Term not in document
        }
    });
};

// Example vectors:
const query = ["machine", "learning"];
const queryVector = createVector(query, vocabulary, corpus, 3);
// [0.35, 0.35, 0, 0, 0, 0, 0, 0]

const doc1 = ["machine", "learning", "algorithm"];  
const doc1Vector = createVector(doc1, vocabulary, corpus, 3);
// [0.23, 0.23, 0.37, 0, 0, 0, 0, 0]
```

#### **Step 3.3: Implement Cosine Similarity**

##### **Mathematical Components:**
```javascript
// Dot Product: A · B = Σ(Ai × Bi)
const dotProduct = (vectorA, vectorB) => {
    return vectorA.reduce((sum, a, i) => sum + (a * vectorB[i]), 0);
};

// Magnitude: ||A|| = √(Σ(Ai²))
const magnitude = (vector) => {
    return Math.sqrt(vector.reduce((sum, val) => sum + (val * val), 0));
};

// Cosine Similarity: cos(θ) = (A·B) / (||A|| × ||B||)
const cosineSimilarity = (vectorA, vectorB) => {
    const dot = dotProduct(vectorA, vectorB);
    const magA = magnitude(vectorA);
    const magB = magnitude(vectorB);
    
    if (magA === 0 || magB === 0) return 0; // Handle zero vectors
    return dot / (magA * magB);
};
```

##### **Working Example:**
```javascript
const queryVector = [0.35, 0.35, 0, 0, 0, 0, 0, 0];
const doc1Vector =  [0.23, 0.23, 0.37, 0, 0, 0, 0, 0];

// Step-by-step calculation:
const dot = dotProduct(queryVector, doc1Vector);
// = (0.35×0.23) + (0.35×0.23) + (0×0.37) + ... = 0.161

const magQuery = magnitude(queryVector);  
// = √(0.35² + 0.35²) = √0.245 = 0.495

const magDoc1 = magnitude(doc1Vector);
// = √(0.23² + 0.23² + 0.37²) = √0.243 = 0.493

const similarity = cosineSimilarity(queryVector, doc1Vector);
// = 0.161 / (0.495 × 0.493) = 0.161 / 0.244 = 0.66
```

### **Step 3.4: Why Cosine Similarity Solves Length Bias**

#### **Comparison Test:**
```javascript
const query = [0.5, 0.5];           // [machine, learning]
const shortDoc = [0.5, 0.5];        // [machine, learning]  
const longDoc = [0.17, 0.17, 0.33]; // [machine, learning, others]

// Traditional TF-IDF sum:
// shortDoc = 0.5 + 0.5 = 1.0
// longDoc = 0.17 + 0.17 = 0.34
// shortDoc wins by 3x! (biased)

// Cosine Similarity:  
const shortSim = cosineSimilarity(query, shortDoc);   // = 1.0 (perfect match)
const longSim = cosineSimilarity(query, longDoc);     // = 0.84 (good match)
// More fair comparison!
```

### **Step 3.5: Hybrid Scoring Strategy**

#### **Why Combine TF-IDF + Cosine Similarity?**
```javascript
// TF-IDF: Good for exact term matching and term importance
// Cosine: Good for document similarity and length normalization

const hybridScore = (queryTerms, document, queryVector, docVector, corpus) => {
    // Traditional TF-IDF score
    let tfIdfScore = 0;
    for (const term of queryTerms) {
        const tf = calculateTF(term, document);
        const idf = calculateIDF(term, corpus, corpus.length);
        tfIdfScore += tf * idf;
    }
    
    // Cosine similarity score
    const cosineSim = cosineSimilarity(queryVector, docVector);
    
    // Weighted combination
    const tfIdfWeight = 0.3;   // 30% for term importance
    const cosineWeight = 0.7;  // 70% for document similarity
    
    return (tfIdfScore * tfIdfWeight) + (cosineSim * cosineWeight);
};
```

#### **Why 70:30 Ratio?**
```javascript
// Experiment results (hypothetical):
// Query: "machine learning algorithm"

// Document A: "machine learning neural network"
// TF-IDF: 0.4 (2/3 terms match)
// Cosine: 0.8 (high similarity)
// Combined (70:30): 0.4×0.3 + 0.8×0.7 = 0.68

// Document B: "machine learning machine learning" (spam)
// TF-IDF: 0.8 (high term frequency)  
// Cosine: 0.6 (lower diversity)
// Combined (70:30): 0.8×0.3 + 0.6×0.7 = 0.66

// Result: Document A (natural) beats Document B (spam)
```

### **Complete Similarity Function:**
```javascript
const calculateDocumentSimilarity = (query, document, corpus) => {
    // Build vocabulary for vector space
    const vocabulary = buildVocabulary(corpus);
    
    // Create vectors
    const queryVector = createVector(query, vocabulary, corpus, corpus.length);
    const docVector = createVector(document, vocabulary, corpus, corpus.length);
    
    // Calculate both scores
    const tfIdfScore = calculateTraditionalTFIDF(query, document, corpus);
    const cosineScore = cosineSimilarity(queryVector, docVector);
    
    // Combine with weights
    return {
        tfIdfScore,
        cosineScore, 
        finalScore: (tfIdfScore * 0.3) + (cosineScore * 0.7)
    };
};
```

**Benefits of This Approach:**
1. **Length Normalization**: Long documents tidak unfairly advantaged
2. **Semantic Similarity**: Documents dengan similar term distribution ranked higher  
3. **Balanced Scoring**: Combines exact matching dengan similarity
4. **Interpretable**: Dapat debug mengapa document dapat score tertentu

---

## 🚀 **Step 4: Complete IR System Architecture**

### **End-to-End Search Flow Implementation**

#### **System Design: Two-Phase Approach**
```
Phase 1 (Upload Time): PDF/TXT → Parse → Preprocess → Store
Phase 2 (Search Time): Query → TF-IDF + Cosine → Rank → Return
```

### **Phase 1: Upload & Preprocessing Implementation**

#### **Upload Pipeline Code:**
```javascript
// server/api/upload.post.ts
const processDocument = async (file) => {
    // 1. Parse file content
    let rawText = '';
    if (file.name.endsWith('.pdf')) {
        const pdfData = await parsePDF(file.buffer);
        rawText = pdfData.text;
    } else {
        rawText = fs.readFileSync(file.path, 'utf-8');
    }
    
    // 2. Apply preprocessing pipeline
    const processedText = preprocessText(rawText);
    
    // 3. Store both versions
    const document = await prisma.document.create({
        data: {
            filename: cleanFilename(file.originalName),
            content_raw: rawText,     // For display
            content: processedText,   // For search
        },
    });
    
    return document.id;
};
```

**Why Store Both Raw & Processed?**
- **Raw content**: For user display and highlighting
- **Processed content**: For search efficiency (no repeated preprocessing)
- **Performance**: Preprocessing done once, not on every search

### **Phase 2: Search Implementation**

#### **Complete Search Function:**
```javascript
// server/api/search.post.ts
const performSearch = async (query) => {
    // 1. Preprocess query (same pipeline as documents)
    const queryTerms = tokenizeQuery(query);
    
    // 2. Fetch all documents (preprocessed content)
    const documents = await prisma.document.findMany({
        select: { id: true, filename: true, content: true, content_raw: true }
    });
    
    // 3. Build corpus for IDF calculation
    const corpus = documents.map(doc => doc.content.split(' '));
    
    // 4. Build vocabulary for vector space
    const vocabulary = buildVocabulary(corpus);
    
    // 5. Create query vector
    const queryVector = createTFIDFVector(queryTerms, vocabulary, corpus, documents.length);
    
    // 6. Score each document
    const results = [];
    
    documents.forEach((doc, index) => {
        const docTerms = corpus[index];
        const docVector = createTFIDFVector(docTerms, vocabulary, corpus, documents.length);
        
        // Calculate combined score
        const { score, details, cosineSim, tfIdfScore } = calculateDocumentScore(
            queryTerms, docTerms, corpus, documents.length, vocabulary, queryVector
        );
        
        // Add filename boosting
        const finalScore = score + calculateFilenameBoost(queryTerms, doc.filename);
        
        if (finalScore > 0) {
            results.push({
                ...doc,
                score: finalScore,
                debug: { cosineSim, tfIdfScore, details }
            });
        }
    });
    
    // 7. Sort by relevance and limit results
    return results
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
};
```

### **Advanced Enhancement: Filename Boosting**

#### **Why Filename Matters in IR:**
```javascript
// User search: "machine learning"
// Document A: "advanced_algorithms.pdf" → Content: "machine learning neural networks"  
// Document B: "machine_learning_guide.pdf" → Content: "introduction to AI techniques"

// Problem: Document A has better content match
// But: User probably looking for Document B based on filename
```

#### **Filename Boosting Implementation:**
```javascript
const calculateFilenameBoost = (queryTerms, filename) => {
    let boost = 0;
    const filenameTokens = tokenizeQuery(filename);
    
    for (const queryTerm of queryTerms) {
        // Exact term match in filename (strong signal)
        if (filenameTokens.includes(queryTerm)) {
            boost += 2.0;
        }
        // Partial match in original filename (weaker signal)  
        else if (filename.toLowerCase().includes(queryTerm)) {
            boost += 1.0;
        }
    }
    
    return boost;
};

// Example:
// Query: ["machine", "learning"]
// Filename: "machine_learning_tutorial.pdf"
// Boost = 2.0 + 2.0 = 4.0 (strong boost)

// Final score = TF-IDF + Cosine + Filename Boost
```

### **Performance Optimization Strategies**

#### **1. Database Schema Design:**
```sql
-- Optimized for IR operations
model Document {
  id          Int      @id @default(autoincrement())
  filename    String   @db.VarChar(255)
  content_raw String   @db.Text        -- Original for display
  content     String   @db.Text        -- Preprocessed for search  
  createdAt   DateTime @default(now())
  
  @@index([createdAt])  -- For recent documents first
}
```

#### **2. Memory Management:**
```javascript
// Efficient corpus building (stream processing for large datasets)
const buildCorpusEfficiently = async () => {
    const batchSize = 100;
    const corpus = [];
    
    let offset = 0;
    while (true) {
        const batch = await prisma.document.findMany({
            select: { content: true },
            skip: offset,
            take: batchSize
        });
        
        if (batch.length === 0) break;
        
        batch.forEach(doc => corpus.push(doc.content.split(' ')));
        offset += batchSize;
    }
    
    return corpus;
};
```

#### **3. Search Response Optimization:**
```javascript
const optimizedSearch = async (query) => {
    // Early termination for empty queries
    if (!query || query.trim().length === 0) {
        return { results: [], message: 'Empty query' };
    }
    
    // Limit vocabulary size for performance
    const maxVocabSize = 10000;
    const vocabulary = buildVocabulary(corpus).slice(0, maxVocabSize);
    
    // Pre-allocate result arrays
    const results = new Array(documents.length);
    let resultCount = 0;
    
    // Process documents with early filtering
    for (let i = 0; i < documents.length; i++) {
        const score = calculateQuickScore(queryTerms, documents[i]);
        
        // Only do expensive calculation if quick score > threshold
        if (score > 0.1) {
            const finalScore = calculateFullScore(queryTerms, documents[i]);
            if (finalScore > 0) {
                results[resultCount++] = { ...documents[i], score: finalScore };
            }
        }
    }
    
    // Efficient sorting (only sort actual results)
    return results
        .slice(0, resultCount)
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
};
```

### **Debug Mode for Development:**
```javascript
const searchWithDebug = async (query, debugMode = false) => {
    const results = await performSearch(query);
    
    if (debugMode) {
        return {
            results,
            debug: {
                originalQuery: query,
                processedTerms: tokenizeQuery(query),
                vocabularySize: vocabulary.length,
                corpusSize: corpus.length,
                processingTimeMs: Date.now() - startTime
            }
        };
    }
    
    return { results };
};
```

**Benefits of This Architecture:**
1. **Separation of Concerns**: Upload ≠ Search processing
2. **Performance**: Preprocessing once, search many times
3. **Scalability**: Can optimize each phase independently  
4. **Debuggability**: Clear data flow and intermediate results
5. **Extensibility**: Easy to add new features (filters, facets, etc.)

---

## 💾 **Step 5: Database Strategy untuk IR System**

### **Problem: How to Store Documents for Efficient IR?**

#### **Naive Approach (❌ Don't Do This):**
```sql
-- Bad schema design
CREATE TABLE documents (
    id INT PRIMARY KEY,
    filename VARCHAR(255),
    content TEXT  -- Only store raw content
);

-- Problems:
-- 1. Must preprocess on every search (slow)
-- 2. No separation between display vs search content
-- 3. No optimization for IR operations
```

#### **IR-Optimized Schema (✅ Correct Approach):**
```sql
-- schema.prisma
model Document {
  id          Int      @id @default(autoincrement())
  filename    String   @db.VarChar(255)
  content_raw String   @db.Text     -- Original text (for display)
  content     String   @db.Text     -- Preprocessed text (for search)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([createdAt])
}
```

### **Why This Schema Design Works:**

#### **1. Dual Content Storage Strategy:**
```javascript
// Upload time: Store both versions
await prisma.document.create({
    data: {
        filename: "Machine Learning Guide.pdf",
        content_raw: "The students are studying advanced algorithms in machine learning...",
        content: "student studi advanc algorithm machin learn..."  // Preprocessed
    }
});

// Search time: Use preprocessed content
const documents = await prisma.document.findMany({
    select: {
        id: true,
        filename: true,
        content: true,      // Preprocessed for TF-IDF
        content_raw: true,  // Original for display
    }
});
```

**Benefits:**
- **Performance**: No preprocessing during search (expensive operation)
- **Consistency**: Same preprocessing applied to all documents
- **Display Quality**: Original text preserved for user viewing
- **Debug Capability**: Can compare original vs processed

#### **2. PostgreSQL-Specific Optimizations:**
```sql
-- Advanced indexing for future enhancements
CREATE INDEX idx_content_gin ON documents USING gin(to_tsvector('english', content));
CREATE INDEX idx_filename_gin ON documents USING gin(to_tsvector('english', filename));

-- Full-text search capabilities (future enhancement)
SELECT * FROM documents 
WHERE to_tsvector('english', content) @@ to_tsquery('english', 'machine & learning');
```

### **Database Operations untuk IR:**

#### **Efficient Document Retrieval:**
```javascript
// Optimized query for search operations
const getDocumentsForSearch = async () => {
    return await prisma.document.findMany({
        select: {
            id: true,
            filename: true,
            content: true,        // Only preprocessed content
            content_raw: true,    // Original for result display
        },
        orderBy: { createdAt: 'desc' },  // Recent documents first
        take: 1000  // Limit for performance (can be paginated)
    });
};

// Memory-efficient approach for large datasets
const getDocumentsBatch = async (batchSize = 100, offset = 0) => {
    return await prisma.document.findMany({
        select: { id: true, content: true },
        skip: offset,
        take: batchSize,
    });
};
```

#### **Search Result Preparation:**
```javascript
const prepareSearchResults = async (scoredResults) => {
    // Get detailed document info for top results only
    const topResultIds = scoredResults.slice(0, 20).map(r => r.id);
    
    const detailedResults = await prisma.document.findMany({
        where: { id: { in: topResultIds } },
        select: {
            id: true,
            filename: true,
            content_raw: true,  // Full original text for display
            createdAt: true,
        }
    });
    
    // Merge with scores
    return scoredResults.map(scored => ({
        ...detailedResults.find(detail => detail.id === scored.id),
        score: scored.score,
        relevanceDetails: scored.debug
    }));
};
```

### **Performance Considerations:**

#### **1. Connection Pooling:**
```javascript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Connection pool configuration
// DATABASE_URL="postgresql://user:pass@localhost:5432/db?connection_limit=20&pool_timeout=20"
```

#### **2. Query Optimization:**
```javascript
// Bad: N+1 query problem
const badSearchResults = async (resultIds) => {
    const results = [];
    for (const id of resultIds) {
        const doc = await prisma.document.findUnique({ where: { id } });
        results.push(doc);
    }
    return results;
};

// Good: Single batch query
const goodSearchResults = async (resultIds) => {
    return await prisma.document.findMany({
        where: { id: { in: resultIds } },
        orderBy: { createdAt: 'desc' }
    });
};
```

#### **3. Pagination for Large Results:**
```javascript
const paginatedSearch = async (query, page = 1, limit = 20) => {
    const allResults = await performSearch(query);
    const totalResults = allResults.length;
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
        results: allResults.slice(startIndex, endIndex),
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalResults / limit),
            totalResults,
            hasNext: endIndex < totalResults,
            hasPrev: page > 1
        }
    };
};
```

### **Data Flow Architecture:**

```
Upload Flow:
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  PDF/TXT    │───▶│  Parse      │───▶│ Preprocess  │───▶│ Store Dual  │
│  File       │    │ Content     │    │ Pipeline    │    │ Content     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘

Search Flow:
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Query      │───▶│ Preprocess  │───▶│ Fetch       │───▶│ TF-IDF +    │
│  Input      │    │ Query       │    │ Documents   │    │ Cosine Sim  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                                               │
┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│ Return      │◀───│ Format      │◀───│ Rank &      │◀────────┘  
│ Results     │    │ Results     │    │ Limit       │
└─────────────┘    └─────────────┘    └─────────────┘
```

### **Monitoring & Analytics:**
```javascript
// Add search analytics
const logSearchQuery = async (query, resultCount, responseTime) => {
    await prisma.searchLog.create({
        data: {
            query,
            resultCount,
            responseTimeMs: responseTime,
            timestamp: new Date(),
        }
    });
};

// Popular queries analysis
const getPopularQueries = async () => {
    return await prisma.searchLog.groupBy({
        by: ['query'],
        _count: { query: true },
        orderBy: { _count: { query: 'desc' } },
        take: 10
    });
};
```

**This database strategy provides:**
1. **Performance**: Optimized for IR operations
2. **Scalability**: Can handle large document collections
3. **Flexibility**: Easy to add new features
4. **Analytics**: Track search patterns and performance

---

## 🎨 **Frontend Architecture & UX Design**

### **1. Component Architecture:**
```
app.vue (Main Layout)
├── SearchHeader.vue (Logo & Title)
├── SearchInput.vue (Query Input)
├── SearchResults.vue (Results Display)
├── UploadModal.vue (File Upload)
├── GlassSurface.vue (UI Component)
└── FaultyTerminal.vue (Background Effect)
```

### **2. State Management dengan Composables:**
```typescript
// useSearch.ts - Centralized search logic
const useSearch = () => {
    const documents = ref([]);
    const searchResults = ref([]);
    const isSearching = ref(false);
    
    const performSearch = async (query: string) => {
        // Search implementation
    };
    
    return { documents, searchResults, isSearching, performSearch };
};
```

### **3. Modern UI Design Philosophy:**

#### **Glassmorphism Design:**
```css
.glass-surface {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}
```
**Mengapa Glassmorphism?**
- **Modern aesthetic**: Trendy dan visually appealing
- **Depth perception**: Memberikan dimensi pada interface
- **Content focus**: Background blur tidak mengganggu readability
- **Brand differentiation**: Unique visual identity

#### **Responsive Design:**
- **Mobile-first**: Design dimulai dari mobile screen
- **Flexible grid**: Adaptasi otomatis untuk berbagai screen size
- **Touch-friendly**: Button size dan spacing untuk mobile interaction

---

## 🔍 **Search Algorithm Deep Dive**

### **1. Query Processing Pipeline:**
```javascript
const tokenizeQuery = (text: string): string[] => {
    return text
        .toLowerCase()
        .split(/\s+/)
        .filter((token: string) => token.length > 0 && /^[a-zA-Z]+$/.test(token));
};
```

### **2. Document Scoring Process:**
```
For each document:
1. Calculate TF for each query term
2. Calculate IDF for each query term  
3. Compute TF-IDF score
4. Create document vector
5. Calculate cosine similarity with query vector
6. Apply filename boosting
7. Combine scores with weighted formula
```

### **3. Result Ranking Strategy:**
```javascript
// Sort by combined score (descending)
searchResults.sort((a, b) => b.score - a.score);

// Limit results to top 20
const limitedResults = searchResults.slice(0, 20);
```

### **4. Debug Mode Implementation:**
```javascript
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
```
**Kegunaan Debug Mode:**
- **Algorithm transparency**: Memahami bagaimana score dihitung
- **Query optimization**: Melihat term mana yang paling berkontribusi
- **Performance analysis**: Mengidentifikasi bottleneck dalam scoring

---

## 📊 **Performance Optimization Strategies**

### **1. Upload Performance:**
- **Streaming upload**: Menggunakan formidable untuk handle large files
- **Single preprocessing**: Preprocess hanya dilakukan saat upload
- **Async processing**: Non-blocking file processing

### **2. Search Performance:**
- **Pre-computed vectors**: Vocabulary dibangun sekali per search session
- **Result limiting**: Maksimal 20 hasil untuk UI responsiveness  
- **Efficient algorithms**: O(n*m) complexity untuk n documents, m terms

### **3. Database Performance:**
- **Selective queries**: Hanya fetch field yang diperlukan
- **Indexed searches**: PostgreSQL indexing pada processed content
- **Connection pooling**: Prisma connection management

### **4. Frontend Performance:**
- **Lazy loading**: Component dan data dimuat sesuai kebutuhan
- **Debounced search**: Menghindari excessive API calls
- **Result caching**: Cache hasil search untuk query yang sama

---

## 🛠️ **Development Workflow & Tools**

### **1. DDEV Development Environment:**
```yaml
# .ddev/config.yaml
name: simple-search-engine
type: php
docroot: ""
php_version: "8.2"
database:
  type: postgres
  version: "15"
```

**Keunggulan DDEV:**
- **Isolated environment**: Tidak conflict dengan system dependencies
- **Team consistency**: Semua developer memiliki setup yang sama
- **Easy database management**: PostgreSQL setup dengan single command
- **SSL support**: HTTPS development environment

### **2. Type Safety Strategy:**
```typescript
// Strict TypeScript configuration
interface SearchResult {
    id: number;
    filename: string;
    content: string;
    content_raw: string;
    score: number;
    tfIdfDetails?: TFIDFDetails;
}
```

### **3. Code Quality Tools:**
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting consistency
- **Prisma**: Database schema validation
- **TypeScript**: Compile-time error detection

---

## 🧪 **Testing & Validation Strategy**

### **1. Algorithm Validation:**
- **Mathematical correctness**: TF-IDF formula sesuai academic literature
- **Edge case handling**: Zero division, empty queries, no results
- **Bilingual testing**: English dan Indonesian document processing

### **2. Performance Testing:**
- **Load testing**: Multiple simultaneous searches
- **Large document testing**: PDF files hingga beberapa MB
- **Query complexity**: Multi-term queries dengan various combinations

### **3. User Experience Testing:**
- **Mobile responsiveness**: Testing pada berbagai device sizes
- **Upload flow**: PDF dan TXT file upload validation
- **Search accuracy**: Relevance testing dengan known document sets

---

## 🔮 **Step 6: Advanced IR Techniques & Next Steps**

### **Current Implementation vs Advanced IR Systems**

#### **What We Built (Foundation Level):**
```javascript
// Our TF-IDF + Cosine Similarity implementation
const score = (tfIdfScore * 0.3) + (cosineSimilarity * 0.7);
```

#### **Next Level: BM25 Algorithm**
```javascript
// BM25: More sophisticated than TF-IDF
const calculateBM25 = (term, document, corpus, k1 = 1.2, b = 0.75) => {
    const tf = termFrequency(term, document);
    const idf = calculateIDF(term, corpus);
    const docLength = document.length;
    const avgDocLength = calculateAvgDocLength(corpus);
    
    const numerator = tf * (k1 + 1);
    const denominator = tf + k1 * (1 - b + b * (docLength / avgDocLength));
    
    return idf * (numerator / denominator);
};
```

**Why BM25 is Better:**
- **Saturation**: TF score doesn't increase linearly (diminishing returns)
- **Length normalization**: More sophisticated than simple cosine similarity
- **Tunable parameters**: k1, b can be optimized for specific domains

### **Advanced Semantic Search:**

#### **Problem with Keyword-Based Search:**
```javascript
// Query: "automobile"
// Document: "car vehicle transportation"
// TF-IDF Score: 0.0 (no exact match)
// But semantically, they're related!
```

#### **Solution: Word Embeddings**
```javascript
// Conceptual implementation (requires ML model)
const getWordEmbedding = async (word) => {
    // Returns 300-dimensional vector representing word meaning
    return await model.getWordVector(word);
};

const semanticSimilarity = (query, document) => {
    const queryEmbeddings = query.map(word => getWordEmbedding(word));
    const docEmbeddings = document.map(word => getWordEmbedding(word));
    
    // Calculate similarity in embedding space
    return cosineSimilarity(
        averageEmbeddings(queryEmbeddings),
        averageEmbeddings(docEmbeddings)
    );
};
```

### **Query Expansion Techniques:**

#### **Problem: User Query Limitation**
```javascript
// User query: "ML"
// Full term: "Machine Learning"
// Related terms: "artificial intelligence", "neural networks", "deep learning"
```

#### **Automatic Query Expansion:**
```javascript
const expandQuery = async (originalQuery) => {
    const synonyms = await getSynonyms(originalQuery);
    const relatedTerms = await getRelatedTerms(originalQuery);
    
    return {
        original: originalQuery,
        expanded: [...originalQuery, ...synonyms, ...relatedTerms],
        weights: {
            original: 1.0,
            synonyms: 0.8,
            related: 0.6
        }
    };
};

// Search with expanded query
const expandedSearch = async (query) => {
    const expanded = await expandQuery(tokenizeQuery(query));
    
    // Weight different term types differently
    let totalScore = 0;
    for (const [term, weight] of expanded.weighted) {
        const termScore = calculateTFIDF(term, document, corpus);
        totalScore += termScore * weight;
    }
    
    return totalScore;
};
```

### **Learning-to-Rank (Machine Learning Approach):**

#### **Concept: Learn from User Behavior**
```javascript
// Collect user interaction data
const collectFeedback = async (query, clickedResults, timeSpent) => {
    await prisma.searchFeedback.create({
        data: {
            query,
            clickedDocumentId: clickedResults[0].id,
            clickPosition: 0,  // Position in search results
            timeSpentMs: timeSpent,
            timestamp: new Date()
        }
    });
};

// Features for ML model
const extractFeatures = (query, document) => {
    return {
        tfIdfScore: calculateTFIDF(query, document),
        cosineScore: calculateCosineSimilarity(query, document),
        filenameMatch: calculateFilenameBoost(query, document.filename),
        documentLength: document.content.split(' ').length,
        documentAge: (Date.now() - document.createdAt) / (1000 * 60 * 60 * 24), // days
        queryDocumentOverlap: calculateTermOverlap(query, document)
    };
};
```

### **Performance Scaling Strategies:**

#### **1. Inverted Index (Like Google):**
```javascript
// Instead of searching through all documents
// Build index: term -> [document_ids]
const buildInvertedIndex = (corpus) => {
    const index = new Map();
    
    corpus.forEach((document, docId) => {
        document.forEach(term => {
            if (!index.has(term)) {
                index.set(term, new Set());
            }
            index.get(term).add(docId);
        });
    });
    
    return index;
};

// Fast search: only check documents containing query terms
const searchWithIndex = (query, index, documents) => {
    // Get candidate documents
    const candidateDocIds = new Set();
    query.forEach(term => {
        if (index.has(term)) {
            index.get(term).forEach(docId => candidateDocIds.add(docId));
        }
    });
    
    // Only score candidate documents (huge performance gain!)
    const results = [];
    candidateDocIds.forEach(docId => {
        const score = calculateScore(query, documents[docId]);
        results.push({ document: documents[docId], score });
    });
    
    return results.sort((a, b) => b.score - a.score);
};
```

#### **2. Elasticsearch Integration:**
```javascript
// For production systems: use dedicated search engine
const elasticsearchQuery = {
    query: {
        bool: {
            should: [
                {
                    match: {
                        content: {
                            query: userQuery,
                            boost: 1.0
                        }
                    }
                },
                {
                    match: {
                        filename: {
                            query: userQuery,
                            boost: 2.0  // Filename more important
                        }
                    }
                }
            ]
        }
    },
    highlight: {
        fields: {
            content: {}
        }
    }
};
```

### **Real-Time Search Improvements:**

#### **Search Suggestions:**
```javascript
const generateSuggestions = async (partialQuery) => {
    // Based on existing documents
    const suggestions = await prisma.$queryRaw`
        SELECT DISTINCT content 
        FROM documents 
        WHERE content ILIKE ${partialQuery + '%'}
        LIMIT 5
    `;
    
    // Based on popular queries
    const popularQueries = await getPopularQueriesStartingWith(partialQuery);
    
    return [...suggestions, ...popularQueries];
};
```

#### **Faceted Search:**
```javascript
const facetedSearch = async (query, filters = {}) => {
    let results = await performSearch(query);
    
    // Apply filters
    if (filters.fileType) {
        results = results.filter(doc => 
            doc.filename.endsWith(filters.fileType)
        );
    }
    
    if (filters.dateRange) {
        results = results.filter(doc => 
            doc.createdAt >= filters.dateRange.start &&
            doc.createdAt <= filters.dateRange.end
        );
    }
    
    // Generate facets for UI
    const facets = {
        fileTypes: countFileTypes(results),
        dateRanges: countDateRanges(results),
        documentSizes: countSizeRanges(results)
    };
    
    return { results, facets };
};
```

### **Production Considerations:**

#### **Caching Strategy:**
```javascript
const searchWithCache = async (query) => {
    const cacheKey = `search:${hash(query)}`;
    
    // Check cache first
    let results = await redis.get(cacheKey);
    if (results) {
        return JSON.parse(results);
    }
    
    // Perform search
    results = await performSearch(query);
    
    // Cache results (expire in 1 hour)
    await redis.setex(cacheKey, 3600, JSON.stringify(results));
    
    return results;
};
```

#### **Monitoring & Analytics:**
```javascript
const searchAnalytics = {
    // Track search performance
    recordSearchTime: async (query, timeMs) => {
        await prisma.searchMetrics.create({
            data: { query, responseTimeMs: timeMs, timestamp: new Date() }
        });
    },
    
    // Track result quality
    recordUserClick: async (query, clickedDocId, position) => {
        await prisma.clickMetrics.create({
            data: { query, documentId: clickedDocId, position }
        });
    },
    
    // Generate reports
    getSlowQueries: async () => {
        return await prisma.searchMetrics.findMany({
            where: { responseTimeMs: { gt: 1000 } },
            orderBy: { responseTimeMs: 'desc' }
        });
    }
};
```

**This covers the progression from basic IR to production-ready search systems:**
1. **Foundation**: TF-IDF + Cosine Similarity (what we built)
2. **Intermediate**: BM25, Query expansion, Inverted indexing
3. **Advanced**: Machine learning ranking, Semantic search
4. **Production**: Elasticsearch, Caching, Analytics, Monitoring

---

## 📋 **Technical Decisions Summary**

### **1. Architecture Decisions:**
| Aspect | Technology | Reasoning |
|--------|------------|-----------|
| Frontend | Nuxt 4 + Vue 3 | SSR, TypeScript, Developer Experience |
| Database | PostgreSQL + Prisma | Performance, Type Safety, Text Search |
| Styling | TailwindCSS | Utility-first, Customization, Performance |
| Algorithm | TF-IDF + Cosine | Proven accuracy, Mathematical foundation |
| Deployment | DDEV | Development consistency, Easy setup |

### **2. Performance Trade-offs:**
- **Preprocessing at upload** vs **Real-time processing**: Chose upload-time untuk search performance
- **Memory usage** vs **Speed**: Chose in-memory vector calculation untuk speed
- **Accuracy** vs **Performance**: Balanced dengan limited result set (20 items)

### **3. Scalability Considerations:**
- **Modular architecture**: Easy untuk upgrade algoritma
- **Database abstraction**: Prisma memudahkan database migration
- **API design**: RESTful design untuk future mobile app integration

---

## 🎬 **Demo Scenarios untuk Presentasi**

### **1. Upload Demo:**
1. **Upload PDF document** → Show preprocessing pipeline
2. **Upload TXT document** → Compare processing time
3. **Show database storage** → Raw vs Processed content

### **2. Search Demo:**
1. **Simple query** → "algorithm" → Show TF-IDF calculation
2. **Multi-term query** → "machine learning" → Show cosine similarity
3. **Filename matching** → Query matching document filename
4. **Debug mode** → Show detailed scoring breakdown

### **3. Algorithm Explanation:**
1. **TF-IDF visualization** → Mathematical formula explanation
2. **Vector space demonstration** → Document similarity visualization
3. **Scoring breakdown** → Show individual component contributions

### **4. Performance Demo:**
1. **Multiple document search** → Show ranking accuracy
2. **Response time measurement** → Performance metrics
3. **Edge cases** → Empty query, no results, special characters

---

## � **Key Takeaways: Coding Information Retrieval from Scratch**

### **What We Accomplished: Building IR System Step-by-Step**

#### **1. ✅ Problem-Solving Approach:**
- **Identified core IR problems**: Term weighting, document similarity, ranking
- **Solved with mathematical foundations**: TF-IDF for importance, Cosine for similarity
- **Implemented complete pipeline**: Preprocessing → Scoring → Ranking → Results

#### **2. ✅ Algorithmic Implementation:**
- **TF-IDF from scratch**: Understanding frequency vs rarity trade-offs
- **Cosine Similarity**: Solving document length bias with vector mathematics
- **Hybrid scoring**: Combining multiple signals for better relevance

#### **3. ✅ Engineering Best Practices:**
- **Preprocessing optimization**: Process once at upload, not at search time
- **Database design**: Dual storage strategy for performance
- **Performance considerations**: Efficient algorithms and data structures

### **Why This Approach Matters:**

#### **🧠 Deep Understanding vs Black Box:**
```javascript
// Black box approach (using existing library):
const results = searchEngine.search(query);  // Don't know how it works

// Our approach (understanding every step):
const queryTerms = tokenizeQuery(query);                    // Step 1: Preprocess
const tfIdfScores = calculateTFIDF(queryTerms, documents);  // Step 2: Weight terms
const similarities = calculateCosineSimilarity(vectors);    // Step 3: Measure similarity  
const rankedResults = rankByScore(similarities);           // Step 4: Rank results
```

#### **📊 Algorithm Decision Making:**
```
Question: Why TF-IDF?
Answer: Solves term frequency bias + document frequency bias

Question: Why Cosine Similarity?  
Answer: Solves document length bias + measures semantic similarity

Question: Why 70:30 weight ratio?
Answer: Cosine better for semantic relevance, TF-IDF better for exact matching
```

### **Technical Skills Demonstrated:**

#### **1. Information Retrieval Fundamentals:**
- ✅ Text preprocessing pipeline design
- ✅ Statistical term weighting (TF-IDF)
- ✅ Vector space model implementation
- ✅ Similarity measurement techniques
- ✅ Ranking algorithm development

#### **2. Software Engineering:**
- ✅ Algorithm implementation from mathematical formulas
- ✅ Performance optimization strategies
- ✅ Database schema design for IR systems
- ✅ Full-stack web application development
- ✅ Debug and testing strategies

#### **3. Problem-Solving Methodology:**
- ✅ Identify limitations of naive approaches
- ✅ Research academic solutions
- ✅ Implement algorithms step-by-step
- ✅ Test and validate with real data
- ✅ Optimize for production use

### **Industry Applications:**

#### **🏢 Enterprise Search Systems:**
```javascript
// Our foundation scales to enterprise level:
// - Employee document search
// - Knowledge base systems  
// - Legal document discovery
// - Research paper repositories
```

#### **🛒 E-commerce Product Search:**
```javascript
// Same principles apply to product search:
// - Product descriptions as documents
// - User queries for product features
// - Ranking by relevance + popularity
// - Faceted search and filters
```

#### **📰 Content Management Systems:**
```javascript
// News, blogs, media platforms:
// - Article content indexing
// - Tag-based categorization
// - Related content recommendations
// - Search result personalization
```

### **Next Level Learning Path:**

#### **Immediate Extensions (Can implement now):**
1. **Boolean operators**: AND, OR, NOT in queries
2. **Phrase search**: "exact phrase" matching
3. **Fuzzy search**: Typo tolerance
4. **Result highlighting**: Show matched terms
5. **Search analytics**: Query logging and analysis

#### **Advanced IR Techniques (Next projects):**
1. **BM25 algorithm**: More sophisticated than TF-IDF
2. **Query expansion**: Automatic synonym inclusion
3. **Machine learning ranking**: Learn from user behavior
4. **Semantic search**: Word embeddings and neural IR
5. **Real-time indexing**: Handle document updates efficiently

### **Code Portfolio Value:**

#### **🎯 Demonstrates Core CS Knowledge:**
- **Algorithms & Data Structures**: Efficient search and ranking
- **Mathematics**: Statistical methods and linear algebra
- **Software Architecture**: Scalable system design
- **Database Systems**: Optimized schema and queries
- **Performance Engineering**: Optimization strategies

#### **🚀 Production-Ready Features:**
- **Error handling**: Edge cases and validation
- **Scalability considerations**: Memory and time complexity
- **User experience**: Fast response times and relevant results
- **Maintainable code**: Clear structure and documentation
- **Testing approach**: Validation and debugging strategies

---

## 🎬 **Demo Script for Video Presentation**

### **Part 1: Problem Introduction (2-3 minutes)**
1. Show naive string search limitations
2. Explain why we need Information Retrieval
3. Introduce TF-IDF and Cosine Similarity concepts

### **Part 2: Coding TF-IDF (5-7 minutes)**
1. Live code TF calculation with examples
2. Live code IDF calculation with corpus
3. Combine to show TF-IDF scoring
4. Demonstrate why it solves term frequency problems

### **Part 3: Coding Cosine Similarity (5-7 minutes)**
1. Show document length bias problem
2. Build vector space model
3. Implement cosine similarity from scratch
4. Compare results with TF-IDF alone

### **Part 4: Complete System Demo (3-5 minutes)**
1. Upload documents and show preprocessing
2. Perform searches with debug mode
3. Show ranking and relevance scores
4. Demonstrate filename boosting

### **Part 5: Next Steps & Extensions (2-3 minutes)**  
1. Discuss BM25 and advanced algorithms
2. Show scalability considerations
3. Mention production enhancements

---

**🏆 Final Achievement: You've built a complete Information Retrieval system from mathematical foundations to working web application, understanding every component and decision along the way.**

---

*Project demonstrates deep understanding of IR fundamentals through hands-on implementation*  
*Perfect foundation for advanced search engine development and ML-based ranking systems*
