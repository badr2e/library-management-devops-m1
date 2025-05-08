from flask import Blueprint, request, jsonify
from services.member_service import get_all_members, get_member_by_id, create_new_member, update_existing_member, delete_existing_member

member_bp = Blueprint('members', __name__)

@member_bp.route('', methods=['GET'])
def get_members():
    members = get_all_members()
    return jsonify([{**member.to_dict(), 'id': member.id} for member in members])

@member_bp.route('/<member_id>', methods=['GET'])
def get_member(member_id):
    member = get_member_by_id(member_id)
    if not member:
        return jsonify({"error": "Membre non trouvé"}), 404
    
    member_dict = member.to_dict()
    member_dict['id'] = member.id  # Add the ID to the response
    
    return jsonify(member_dict)

@member_bp.route('', methods=['POST'])
def add_member():
    data = request.get_json()
    
    required_fields = ['first_name', 'last_name', 'email']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Le champ '{field}' est requis"}), 400
    
    member = create_new_member(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        phone=data.get('phone'),
        address=data.get('address'),
        id_card_number=data.get('id_card_number')
    )
    
    member_dict = member.to_dict()
    member_dict['id'] = member.id  # Add the ID to the response
    
    return jsonify(member_dict), 201

@member_bp.route('/<member_id>', methods=['PUT'])
def update_member(member_id):
    data = request.get_json()
    member = get_member_by_id(member_id)
    
    if not member:
        return jsonify({"error": "Membre non trouvé"}), 404
    
    updated_member = update_existing_member(
        member=member,
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        email=data.get('email'),
        phone=data.get('phone'),
        address=data.get('address'),
        id_card_number=data.get('id_card_number')
    )
    
    member_dict = updated_member.to_dict()
    member_dict['id'] = updated_member.id  # Add the ID to the response
    
    return jsonify(member_dict)

@member_bp.route('/<member_id>', methods=['DELETE'])
def remove_member(member_id):
    member = get_member_by_id(member_id)
    
    if not member:
        return jsonify({"error": "Membre non trouvé"}), 404
    
    delete_existing_member(member)
    return jsonify({"message": "Membre supprimé avec succès"})