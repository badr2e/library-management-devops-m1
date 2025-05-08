import pytest
from unittest.mock import MagicMock, patch
import sys
import os

# Patch firestore client
@pytest.fixture(autouse=True)
def mock_firestore_client():
    with patch('models.__init__.firestore.Client') as mock_client:
        mock_db = MagicMock()
        mock_client.return_value = mock_db
        yield mock_db

# Maintenant importer l'app après le mock
@pytest.fixture
def app():
    from app import create_app
    from config import Config
    
    class TestConfig(Config):
        TESTING = True
        
    app = create_app(TestConfig)
    yield app

@pytest.fixture
def client(app):
    return app.test_client()