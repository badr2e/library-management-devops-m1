import pytest
import uuid

from services.book_service import create_new_book
from services.book_service import delete_existing_book
from services.book_service import get_book_by_id
from services.book_service import update_existing_book


@pytest.fixture
def sample_book():
    book = create_new_book(
        title=f"Test Book {uuid.uuid4()}",
        author="Test Author",
        isbn="978-3-16-148410-0",
        publication_year=2023,
        category="Test",
        description="This is a test book"
    )
    yield book
    # Clean up
    if get_book_by_id(book.id):
        delete_existing_book(book)


def test_create_book():
    title = f"Test Book {uuid.uuid4()}"
    book = create_new_book(
        title=title,
        author="Test Author",
        isbn="978-3-16-148410-0",
        publication_year=2023,
        category="Test",
        description="This is a test book"
    )

    assert book.id is not None
    assert book.title == title
    assert book.author == "Test Author"
    assert book.isbn == "978-3-16-148410-0"
    assert book.publication_year == 2023
    assert book.category == "Test"
    assert book.description == "This is a test book"
    assert book.is_available == True

    # Clean up
    delete_existing_book(book)


def test_get_book_by_id(sample_book):
    retrieved_book = get_book_by_id(sample_book.id)

    assert retrieved_book is not None
    assert retrieved_book.id == sample_book.id
    assert retrieved_book.title == sample_book.title
    assert retrieved_book.author == sample_book.author


def test_update_book(sample_book):
    new_title = f"Updated Book {uuid.uuid4()}"
    updated_book = update_existing_book(
        book=sample_book,
        title=new_title,
        is_available=False
    )

    assert updated_book.title == new_title
    assert updated_book.is_available == False

    # Verify the update persisted
    retrieved_book = get_book_by_id(sample_book.id)
    assert retrieved_book.title == new_title
    assert retrieved_book.is_available == False


def test_delete_book():
    book = create_new_book(
        title=f"Book to Delete {uuid.uuid4()}",
        author="Delete Author"
    )

    book_id = book.id
    delete_existing_book(book)

    # Verify the book was deleted
    retrieved_book = get_book_by_id(book_id)
    assert retrieved_book is None
