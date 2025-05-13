import os
from google.cloud import firestore

# Check if we're in a testing environment
testing = os.environ.get('TESTING', 'False').lower() == 'true'

if testing:
    # Improved mock for tests
    class MockDB:
        """Global store for our mock database"""
        collections = {}

    class MockCollection:
        def __init__(self, name):
            self.name = name
            # Initialize collection if it doesn't exist
            if name not in MockDB.collections:
                MockDB.collections[name] = {}

        def document(self, doc_id=None):
            if doc_id is None:
                # Generate a random ID like Firestore would
                import uuid
                doc_id = str(uuid.uuid4())
            return MockDocument(self.name, doc_id)

        def stream(self):
            # Return all documents in the collection
            return [
                MockDocument(self.name, doc_id, data)
                for doc_id, data in MockDB.collections[self.name].items()
            ]

        def where(self, field, op, value):
            # Simple filter implementation
            results = []
            for doc_id, data in MockDB.collections[self.name].items():
                if field in data:
                    if op == '==' and data[field] == value:
                        results.append(MockDocument(self.name, doc_id, data))

            # Return a new collection-like object with filtered results
            mock_filtered = MockCollection(self.name)
            mock_filtered.stream = lambda: results
            return mock_filtered

    class MockDocument:
        def __init__(self, collection_name, doc_id, data=None):
            self.collection_name = collection_name
            self.id = doc_id
            self.exists = doc_id in MockDB.collections.get(collection_name, {})

        def get(self):
            # Setup for the document after get()
            self.exists = self.id in MockDB.collections.get(
                self.collection_name, {}
            )
            return self

        def set(self, data):
            # Ensure collection exists
            if self.collection_name not in MockDB.collections:
                MockDB.collections[self.collection_name] = {}

            # Store data
            MockDB.collections[self.collection_name][self.id] = data.copy()
            self.exists = True
            return self

        def update(self, data):
            # Ensure document exists
            if (
                self.collection_name not in MockDB.collections
                or self.id not in MockDB.collections[self.collection_name]
            ):
                return self

            # Update data
            MockDB.collections[self.collection_name][self.id].update(data)
            return self

        def delete(self):
            # Remove document if it exists
            if (
                self.collection_name in MockDB.collections
                and self.id in MockDB.collections[self.collection_name]
            ):

                del MockDB.collections[self.collection_name][self.id]
                self.exists = False

        def to_dict(self):
            # Return stored data or empty dict
            if (
                self.collection_name in MockDB.collections
                and self.id in MockDB.collections[self.collection_name]
            ):

                return MockDB.collections[self.collection_name][self.id].copy()
            return {}

    class MockFirestore:
        def collection(self, name):
            return MockCollection(name)

    db = MockFirestore()
else:
    # Real Firestore client for production
    db = firestore.Client()
