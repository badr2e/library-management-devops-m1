import json
import uuid

def test_get_books(client):
    response = client.get('/api/books')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)

def test_add_book(client):
    title = f"API Test Book {uuid.uuid4()}"
    book_data = {
        'title': title,
        'author': 'API Test Author',
        'isbn': '978-3-16-148410-0',
        'publication_year': 2023,
        'category': 'API Test',
        'description': 'This is a test book created via API'
    }
    
    response = client.post(
        '/api/books',
        data=json.dumps(book_data),
        content_type='application/json'
    )
    
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['title'] == title
    
    # Get the book ID for cleanup
    book_id = data.get('id')
    
    # Cleanup
    if book_id:
        client.delete(f'/api/books/{book_id}')

def test_get_book(client):
    # First create a book
    title = f"API Test Book for Get {uuid.uuid4()}"
    book_data = {
        'title': title,
        'author': 'API Test Author'
    }
    
    response = client.post(
        '/api/books',
        data=json.dumps(book_data),
        content_type='application/json'
    )
    
    assert response.status_code == 201
    book_id = json.loads(response.data).get('id')
    
    # Now get the book by ID
    response = client.get(f'/api/books/{book_id}')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['title'] == title
    
    # Cleanup
    client.delete(f'/api/books/{book_id}')

def test_update_book(client):
    # First create a book
    title = f"API Test Book for Update {uuid.uuid4()}"
    book_data = {
        'title': title,
        'author': 'API Test Author'
    }
    
    response = client.post(
        '/api/books',
        data=json.dumps(book_data),
        content_type='application/json'
    )
    
    assert response.status_code == 201
    book_id = json.loads(response.data).get('id')
    
    # Now update the book
    new_title = f"Updated API Test Book {uuid.uuid4()}"
    update_data = {
        'title': new_title,
        'is_available': False
    }
    
    response = client.put(
        f'/api/books/{book_id}',
        data=json.dumps(update_data),
        content_type='application/json'
    )
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['title'] == new_title
    assert data['is_available'] == False
    
    # Cleanup
    client.delete(f'/api/books/{book_id}')

def test_delete_book(client):
    # First create a book
    title = f"API Test Book for Delete {uuid.uuid4()}"
    book_data = {
        'title': title,
        'author': 'API Test Author'
    }
    
    response = client.post(
        '/api/books',
        data=json.dumps(book_data),
        content_type='application/json'
    )
    
    assert response.status_code == 201
    book_id = json.loads(response.data).get('id')
    
    # Now delete the book
    response = client.delete(f'/api/books/{book_id}')
    assert response.status_code == 200
    
    # Verify the book was deleted
    response = client.get(f'/api/books/{book_id}')
    assert response.status_code == 404