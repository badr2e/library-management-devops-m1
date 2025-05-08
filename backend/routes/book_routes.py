from flask import Blueprint, request, jsonify
from services.book_service import get_all_books, get_book_by_id, create_new_book, update_existing_book, delete_existing_book

book_bp = Blueprint('books', __name__)

@book_bp.route('', methods=['GET'])
def get_books():
    books = get_all_books()
    return jsonify([{**book.to_dict(), 'id': book.id} for book in books])

@book_bp.route('/<book_id>', methods=['GET'])
def get_book(book_id):
    book = get_book_by_id(book_id)
    if not book:
        return jsonify({"error": "Livre non trouvé"}), 404
    
    book_dict = book.to_dict()
    book_dict['id'] = book.id  # Add the ID to the response
    
    return jsonify(book_dict)

@book_bp.route('', methods=['POST'])
def add_book():
    data = request.get_json()
    
    required_fields = ['title', 'author']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Le champ '{field}' est requis"}), 400
    
    book = create_new_book(
        title=data['title'],
        author=data['author'],
        isbn=data.get('isbn'),
        publication_year=data.get('publication_year'),
        category=data.get('category'),
        description=data.get('description')
    )
    
    book_dict = book.to_dict()
    book_dict['id'] = book.id  # Add the ID to the response
    
    return jsonify(book_dict), 201

@book_bp.route('/<book_id>', methods=['PUT'])
def update_book(book_id):
    data = request.get_json()
    book = get_book_by_id(book_id)
    
    if not book:
        return jsonify({"error": "Livre non trouvé"}), 404
    
    updated_book = update_existing_book(
        book=book,
        title=data.get('title'),
        author=data.get('author'),
        isbn=data.get('isbn'),
        publication_year=data.get('publication_year'),
        category=data.get('category'),
        description=data.get('description'),
        is_available=data.get('is_available')
    )
    
    book_dict = updated_book.to_dict()
    book_dict['id'] = updated_book.id  # Add the ID to the response
    
    return jsonify(book_dict)

@book_bp.route('/<book_id>', methods=['DELETE'])
def remove_book(book_id):
    book = get_book_by_id(book_id)
    
    if not book:
        return jsonify({"error": "Livre non trouvé"}), 404
    
    delete_existing_book(book)
    return jsonify({"message": "Livre supprimé avec succès"})