from datetime import datetime

COLLECTION_NAME = 'books'


class Book:
    def __init__(self, id=None, title=None, author=None, isbn=None,
                 publication_year=None, category=None, description=None,
                 is_available=True, created_at=None, updated_at=None):

        self.id = id
        self.title = title
        self.author = author
        self.isbn = isbn
        self.publication_year = publication_year
        self.category = category
        self.description = description
        self.is_available = is_available
        self.created_at = created_at or datetime.utcnow()
        self.updated_at = updated_at or datetime.utcnow()

    @staticmethod
    def from_dict(source, id=None):
        book = Book(
            id=id,
            title=source.get('title'),
            author=source.get('author'),
            isbn=source.get('isbn'),
            publication_year=source.get('publication_year'),
            category=source.get('category'),
            description=source.get('description'),
            is_available=source.get('is_available', True),
            created_at=source.get('created_at'),
            updated_at=source.get('updated_at')
        )

        if 'created_at' in source and isinstance(source['created_at'], str):
            book.created_at = datetime.fromisoformat(source['created_at'])

        if 'updated_at' in source and isinstance(source['updated_at'], str):
            book.updated_at = datetime.fromisoformat(source['updated_at'])

        return book

    def to_dict(self):
        return {
            'title': self.title,
            'author': self.author,
            'isbn': self.isbn,
            'publication_year': self.publication_year,
            'category': self.category,
            'description': self.description,
            'is_available': self.is_available,
            'created_at': (
                self.created_at.isoformat()
                if isinstance(self.created_at, datetime)
                else self.created_at
            ),
            'updated_at': (
                self.updated_at.isoformat()
                if isinstance(self.updated_at, datetime)
                else self.updated_at)
        }
