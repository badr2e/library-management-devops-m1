import os
from google.cloud import firestore

# Check if we're in a testing environment
testing = os.environ.get('TESTING', 'False').lower() == 'true'

if testing:
    # Mock version for tests
    class MockCollection:
        def __init__(self, *args, **kwargs):
            self.docs = {}
            
        def document(self, doc_id=None):
            return MockDocument(self, doc_id)
            
        def stream(self):
            return []
            
        def where(self, *args, **kwargs):
            return self

    class MockDocument:
        def __init__(self, collection, doc_id):
            self.id = doc_id or "mock-id"
            self.collection = collection
            self.data = {}
            self.exists = True
            
        def get(self):
            return self
            
        def set(self, data):
            self.data = data
            return self
            
        def update(self, data):
            self.data.update(data)
            return self
            
        def delete(self):
            self.exists = False
            
        def to_dict(self):
            return self.data
    
    class MockFirestore:
        def collection(self, name):
            return MockCollection()
    
    db = MockFirestore()
else:
    # Real Firestore client for production
    db = firestore.Client()