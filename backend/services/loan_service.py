from datetime import datetime, timedelta
from models import db
from models.loan import Loan, COLLECTION_NAME
from models.book import COLLECTION_NAME as BOOK_COLLECTION

def get_all_loans():
    loans = []
    for doc in db.collection(COLLECTION_NAME).stream():
        loan = Loan.from_dict(doc.to_dict(), doc.id)
        loans.append(loan)
    return loans

def get_loan_by_id(loan_id):
    doc = db.collection(COLLECTION_NAME).document(loan_id).get()
    if doc.exists:
        return Loan.from_dict(doc.to_dict(), doc.id)
    return None

def create_new_loan(book_id, member_id, loan_date=None, due_date=None):
    if not loan_date:
        loan_date = datetime.utcnow()
    
    if not due_date:
        due_date = loan_date + timedelta(days=14)
    
    loan = Loan(
        book_id=book_id,
        member_id=member_id,
        loan_date=loan_date,
        due_date=due_date,
        returned=False
    )
    
    doc_ref = db.collection(COLLECTION_NAME).document()
    doc_ref.set(loan.to_dict())
    loan.id = doc_ref.id
    
    # Update book availability
    book_ref = db.collection(BOOK_COLLECTION).document(book_id)
    book_ref.update({'is_available': False})
    
    return loan

def return_book_loan(loan):
    loan.returned = True
    loan.return_date = datetime.utcnow()
    
    doc_ref = db.collection(COLLECTION_NAME).document(loan.id)
    doc_ref.update({
        'returned': True,
        'return_date': loan.return_date.isoformat()
    })
    
    # Update book availability
    book_ref = db.collection(BOOK_COLLECTION).document(loan.book_id)
    book_ref.update({'is_available': True})
    
    return loan