from datetime import datetime
from models import db
from models.book import Book, COLLECTION_NAME

def get_all_books():
    books = []
    for doc in db.collection(COLLECTION_NAME).stream():
        book = Book.from_dict(doc.to_dict(), doc.id)
        books.append(book)
    return books

def get_book_by_id(book_id):
    doc = db.collection(COLLECTION_NAME).document(book_id).get()
    if doc.exists:
        return Book.from_dict(doc.to_dict(), doc.id)
    return None

def create_new_book(title, author, isbn=None, publication_year=None, category=None, description=None):
    book = Book(
        title=title,
        author=author,
        isbn=isbn,
        publication_year=publication_year,
        category=category,
        description=description,
        is_available=True,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    doc_ref = db.collection(COLLECTION_NAME).document()
    doc_ref.set(book.to_dict())
    book.id = doc_ref.id
    
    return book

def update_existing_book(book, title=None, author=None, isbn=None, publication_year=None, category=None, description=None, is_available=None):
    if title:
        book.title = title
    if author:
        book.author = author
    if isbn:
        book.isbn = isbn
    if publication_year:
        book.publication_year = publication_year
    if category:
        book.category = category
    if description:
        book.description = description
    if is_available is not None:
        book.is_available = is_available
    
    book.updated_at = datetime.utcnow()
    
    doc_ref = db.collection(COLLECTION_NAME).document(book.id)
    doc_ref.update(book.to_dict())
    
    return book

def delete_existing_book(book):
    db.collection(COLLECTION_NAME).document(book.id).delete()