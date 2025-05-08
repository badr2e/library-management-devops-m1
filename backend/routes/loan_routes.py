from flask import Blueprint, request, jsonify
from datetime import datetime
from services.loan_service import get_all_loans, get_loan_by_id, create_new_loan, return_book_loan
from services.book_service import get_book_by_id

loan_bp = Blueprint('loans', __name__)

@loan_bp.route('', methods=['GET'])
def get_loans():
    loans = get_all_loans()
    return jsonify([{**loan.to_dict(), 'id': loan.id} for loan in loans])

@loan_bp.route('/<loan_id>', methods=['GET'])
def get_loan(loan_id):
    loan = get_loan_by_id(loan_id)
    if not loan:
        return jsonify({"error": "Emprunt non trouvé"}), 404
    
    loan_dict = loan.to_dict()
    loan_dict['id'] = loan.id  # Add the ID to the response
    
    return jsonify(loan_dict)

@loan_bp.route('', methods=['POST'])
def add_loan():
    data = request.get_json()
    
    required_fields = ['book_id', 'member_id']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Le champ '{field}' est requis"}), 400
    
    # Vérifier si le livre est disponible
    book = get_book_by_id(data['book_id'])
    if not book:
        return jsonify({"error": "Livre non trouvé"}), 404
    
    if not book.is_available:
        return jsonify({"error": "Ce livre n'est pas disponible"}), 400
    
    loan = create_new_loan(
        book_id=data['book_id'],
        member_id=data['member_id'],
        loan_date=datetime.fromisoformat(data['loan_date']) if 'loan_date' in data else None,
        due_date=datetime.fromisoformat(data['due_date']) if 'due_date' in data else None
    )
    
    loan_dict = loan.to_dict()
    loan_dict['id'] = loan.id  # Add the ID to the response
    
    return jsonify(loan_dict), 201

@loan_bp.route('/<loan_id>/return', methods=['PUT'])
def return_loan(loan_id):
    loan = get_loan_by_id(loan_id)
    
    if not loan:
        return jsonify({"error": "Emprunt non trouvé"}), 404
    
    if loan.returned:
        return jsonify({"error": "Ce livre a déjà été retourné"}), 400
    
    updated_loan = return_book_loan(loan)
    
    loan_dict = updated_loan.to_dict()
    loan_dict['id'] = updated_loan.id  # Add the ID to the response
    
    return jsonify(loan_dict)