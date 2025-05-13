from datetime import datetime

from models import db

from models.member import COLLECTION_NAME
from models.member import Member


def get_all_members():
    members = []
    for doc in db.collection(COLLECTION_NAME).stream():
        member = Member.from_dict(doc.to_dict(), doc.id)
        members.append(member)
    return members


def get_member_by_id(member_id):
    doc = db.collection(COLLECTION_NAME).document(member_id).get()
    if doc.exists:
        return Member.from_dict(doc.to_dict(), doc.id)
    return None


def create_new_member(first_name, last_name, email, phone=None, address=None, 
                      id_card_number=None):
    member = Member(
        first_name=first_name,
        last_name=last_name,
        email=email,
        phone=phone,
        address=address,
        id_card_number=id_card_number,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    doc_ref = db.collection(COLLECTION_NAME).document()
    doc_ref.set(member.to_dict())
    member.id = doc_ref.id

    return member


def update_existing_member(member, first_name=None, last_name=None, email=None,
                           phone=None, address=None, id_card_number=None):
    if first_name:
        member.first_name = first_name
    if last_name:
        member.last_name = last_name
    if email:
        member.email = email
    if phone:
        member.phone = phone
    if address:
        member.address = address
    if id_card_number:
        member.id_card_number = id_card_number

    member.updated_at = datetime.utcnow()

    doc_ref = db.collection(COLLECTION_NAME).document(member.id)
    doc_ref.update(member.to_dict())

    return member


def delete_existing_member(member):
    db.collection(COLLECTION_NAME).document(member.id).delete()
