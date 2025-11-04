# How to use Open Vector with Qdrant

## Parameters 
### These are subject to change as more vector DBs are added. The values need to be made vector db agnostic and describe their purpose clearly
- `collectionName`: This is the collection within your database
- `vectorSize`: Dimensionality of the vector stored in the collection
- `distanceMetric`: Distance metric used in search queries on the collection
- `vectors`: Vector data stored in the collection
  - `id`: Unique id for the vector
  - `vector`: Vector of `vectorSize`
  - `metaData`: Optional object containing metadata related to the vector
- `queryVector`: Vector of `vectorSize` used to search in a collection
- `topK`: Top K search results. Currently limited to 1000

## Collections
### Create Collection
```
const openVector = new openVectorSdk({ 
    provider: 'qdrant',
    config: {
        host: 'localhost',
        port: 6333,
    } 
});
const response = await openVector.createCollection({
    collectionName: 'test_collection_main',
    vectorSize: 5,
    distanceMetric: 'Cosine',
});
```

### Get Collections [Multiple]
```
const openVector = new openVectorSdk({ 
    provider: 'qdrant',
    config: {
        host: 'localhost',
        port: 6333,
    } 
});
const response = await openVector.getCollections();
```

### Get Collection [Single]
```
const openVector = new openVectorSdk({ 
    provider: 'qdrant',
    config: {
        host: 'localhost',
        port: 6333,
    } 
});
const response = await openVector.getCollection({
    collectionName: 'test_collection_main'
});
```

### Delete Collection
```
const openVector = new openVectorSdk({ 
    provider: 'qdrant',
    config: {
        host: 'localhost',
        port: 6333,
    } 
});
const response = await openVector.deleteCollection({
    collectionName: 'test_collection_main'
});
```

## Vectors
### Upsert Vectors
```
const openVector = new openVectorSdk({ 
    provider: 'qdrant',
    config: {
        host: 'localhost',
        port: 6333,
    } 
});

const vectorsToAdd = [
    { 
        id: 1, 
        vector: [0.1, 0.2, 0.3, 0.4, 0.5],
        metaData: { category: 'A' }
    },
    { 
        id: 2, 
        vector: [0.5, 0.4, 0.3, 0.2, 0.1],
        metaData: { category: 'B' }
    },
    { 
        id: '7cb5f18b-9d51-4bab-9dc7-a76a1203ead6', 
        vector: [0.5, 0.4, 0.3, 0.2, 0.1],
        metaData: { category: 'B' }
    },
];

const response = await openVector.upsertVector({
    collectionName: 'test_collection_main',
    vectors: vectorsToAdd,
});
```

### Delete Vectors
```
const openVector = new openVectorSdk({ 
    provider: 'qdrant',
    config: {
        host: 'localhost',
        port: 6333,
    } 
});

const vectorIdsToDelete = [1, 2];

const response = await openVector.deleteVectors({
    collectionName: 'test_collection_main',
    ids: vectorIdsToDelete,
});
```

### Search Vectors
```
const openVector = new openVectorSdk({ 
    provider: 'qdrant',
    config: {
        host: 'localhost',
        port: 6333,
    } 
});

const queryVector = [0.1, 0.2, 0.3, 0.4, 0.5];

const response = await openVector.search({
    collectionName: 'test_collection_main',
    queryVector: queryVector,
    topK: 3,
});
```
