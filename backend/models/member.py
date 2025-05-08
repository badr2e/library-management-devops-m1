from datetime import datetime
from . import db

COLLECTION_NAME = 'members'

class Member:
    def __init__(self, id=None, first_name=None, last_name=None, email=None, phone=None, address=None, id_card_number=None, created_at=None, updated_at=None):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone = phone
        self.address = address
        self.id_card_number = id_card_number
        self.created_at = created_at or datetime.utcnow()
        self.updated_at = updated_at or datetime.utcnow()
    
    @staticmethod
    def from_dict(source, id=None):
        member = Member(
            id=id,
            first_name=source.get('first_name'),
            last_name=source.get('last_name'),
            email=source.get('email'),
            phone=source.get('phone'),
            address=source.get('address'),
            id_card_number=source.get('id_card_number'),
            created_at=source.get('created_at'),
            updated_at=source.get('updated_at')
        )
        
        if 'created_at' in source and isinstance(source['created_at'], str):
            member.created_at = datetime.fromisoformat(source['created_at'])
        
        if 'updated_at' in source and isinstance(source['updated_at'], str):
            member.updated_at = datetime.fromisoformat(source['updated_at'])
            
        return member
    
    def to_dict(self):
        return {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'phone': self.phone,
            'address': self.address,
            'id_card_number': self.id_card_number,
            'created_at': self.created_at.isoformat() if isinstance(self.created_at, datetime) else self.created_at,
            'updated_at': self.updated_at.isoformat() if isinstance(self.updated_at, datetime) else self.updated_at
        }