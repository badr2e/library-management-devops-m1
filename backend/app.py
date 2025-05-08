from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from routes.book_routes import book_bp
from routes.member_routes import member_bp
from routes.loan_routes import loan_bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Extensions
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(book_bp, url_prefix='/api/books')
    app.register_blueprint(member_bp, url_prefix='/api/members')
    app.register_blueprint(loan_bp, url_prefix='/api/loans')
    
    @app.route('/api/health')
    def health_check():
        return jsonify({"status": "ok"})
    
    @app.route('/api/stats')
    def get_stats():
        from models import db
        from models.book import COLLECTION_NAME as BOOK_COLLECTION
        from models.member import COLLECTION_NAME as MEMBER_COLLECTION
        from models.loan import COLLECTION_NAME as LOAN_COLLECTION
        
        total_books = len(list(db.collection(BOOK_COLLECTION).stream()))
        available_books = len(list(db.collection(BOOK_COLLECTION).where('is_available', '==', True).stream()))
        total_members = len(list(db.collection(MEMBER_COLLECTION).stream()))
        active_loans = len(list(db.collection(LOAN_COLLECTION).where('returned', '==', False).stream()))
        
        return jsonify({
            "totalBooks": total_books,
            "availableBooks": available_books,
            "totalMembers": total_members,
            "activeLoans": active_loans
        })
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)