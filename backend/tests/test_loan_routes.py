import json
import uuid
from datetime import datetime, timedelta

def test_get_loans(client):
    response = client.get('/api/loans')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)

def test_add_loan(client):
    # First create a book and a member
    book_data = {
        'title': f"Test Book {uuid.uuid4()}",
        'author': 'Test Author'
    }
    book_response = client.post(
        '/api/books',
        data=json.dumps(book_data),
        content_type='application/json'
    )
    assert book_response.status_code == 201
    book_id = json.loads(book_response.data).get('id')
    
    member_data = {
        'first_name': 'Test',
        'last_name': 'User',
        'email': f'test{uuid.uuid4()}@example.com'
    }
    member_response = client.post(
        '/api/members',
        data=json.dumps(member_data),
        content_type='application/json'
    )
    assert member_response.status_code == 201
    member_id = json.loads(member_response.data).get('id')
    
    # Create a loan
    today = datetime.utcnow().date().isoformat()
    due_date = (datetime.utcnow() + timedelta(days=14)).date().isoformat()
    loan_data = {
        'book_id': book_id,
        'member_id': member_id,
        'loan_date': today,
        'due_date': due_date
    }
    
    response = client.post(
        '/api/loans',
        data=json.dumps(loan_data),
        content_type='application/json'
    )
    
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['book_id'] == book_id
    assert data['member_id'] == member_id
    
    # Cleanup
    loan_id = data.get('id')
    client.put(f'/api/loans/{loan_id}/return')
    client.delete(f'/api/books/{book_id}')
    client.delete(f'/api/members/{member_id}')

def test_return_loan(client):
    # Créer un livre, un membre et un prêt
    book_data = {'title': f"Test Book {uuid.uuid4()}", 'author': 'Test Author'}
    book_response = client.post('/api/books', data=json.dumps(book_data), content_type='application/json')
    book_id = json.loads(book_response.data).get('id')
    
    member_data = {'first_name': 'Test', 'last_name': 'User', 'email': f'test{uuid.uuid4()}@example.com'}
    member_response = client.post('/api/members', data=json.dumps(member_data), content_type='application/json')
    member_id = json.loads(member_response.data).get('id')
    
    loan_data = {
        'book_id': book_id,
        'member_id': member_id,
    }
    
    loan_response = client.post('/api/loans', data=json.dumps(loan_data), content_type='application/json')
    loan_id = json.loads(loan_response.data).get('id')
    
    # Tester le retour du livre
    return_response = client.put(f'/api/loans/{loan_id}/return')
    assert return_response.status_code == 200
    return_data = json.loads(return_response.data)
    assert return_data['returned'] == True
    assert 'return_date' in return_data
    
    # Vérifier que le livre est à nouveau disponible
    book_response = client.get(f'/api/books/{book_id}')
    book_data = json.loads(book_response.data)
    assert book_data['is_available'] == True
    
    # Cleanup
    client.delete(f'/api/books/{book_id}')
    client.delete(f'/api/members/{member_id}')