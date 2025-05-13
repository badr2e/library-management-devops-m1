import json
import uuid


def test_get_members(client):
    response = client.get('/api/members')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)


def test_add_member(client):
    email = f"test{uuid.uuid4()}@example.com"
    member_data = {
        'first_name': 'Test',
        'last_name': 'User',
        'email': email,
        'phone': '+33123456789',
        'address': '123 Test Street',
        'id_card_number': 'ID12345'
    }

    response = client.post(
        '/api/members',
        data=json.dumps(member_data),
        content_type='application/json'
    )

    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['email'] == email

    # Get the member ID for cleanup
    member_id = data.get('id')

    # Cleanup
    if member_id:
        client.delete(f'/api/members/{member_id}')


def test_update_member(client):
    # Créer un membre
    email = f"test{uuid.uuid4()}@example.com"
    member_data = {
        'first_name': 'Old',
        'last_name': 'Name',
        'email': email
    }

    response = client.post(
        '/api/members',
        data=json.dumps(member_data),
        content_type='application/json'
    )
    member_id = json.loads(response.data).get('id')

    # Mettre à jour le membre
    update_data = {
        'first_name': 'New',
        'last_name': 'Updated',
        'phone': '+33987654321'
    }

    response = client.put(
        f'/api/members/{member_id}',
        data=json.dumps(update_data),
        content_type='application/json'
    )

    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['first_name'] == 'New'
    assert data['last_name'] == 'Updated'
    assert data['phone'] == '+33987654321'

    # Cleanup
    client.delete(f'/api/members/{member_id}')


def test_delete_member(client):
    # Créer un membre
    email = f"testdelete{uuid.uuid4()}@example.com"
    member_data = {
        'first_name': 'Delete',
        'last_name': 'Test',
        'email': email
    }

    response = client.post(
        '/api/members',
        data=json.dumps(member_data),
        content_type='application/json'
    )
    member_id = json.loads(response.data).get('id')

    # Supprimer le membre
    response = client.delete(f'/api/members/{member_id}')
    assert response.status_code == 200

    # Vérifier que le membre n'existe plus
    response = client.get(f'/api/members/{member_id}')
    assert response.status_code == 404
