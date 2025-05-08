import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-key-change-in-production'
    PROJECT_ID = os.environ.get('PROJECT_ID') or 'library-management-dev'