import pytest
from app import create_app
from config import Config

class TestConfig(Config):
    TESTING = True
    # Use a different project/collection for tests if needed

@pytest.fixture
def app():
    app = create_app(TestConfig)
    yield app

@pytest.fixture
def client(app):
    return app.test_client()