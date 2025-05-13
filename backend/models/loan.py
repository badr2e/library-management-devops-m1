from datetime import datetime
from datetime import timedelta

COLLECTION_NAME = 'loans'


class Loan:
    def __init__(self, id=None, book_id=None, member_id=None, loan_date=None,
                 due_date=None, return_date=None, returned=False):

        self.id = id
        self.book_id = book_id
        self.member_id = member_id
        self.loan_date = loan_date or datetime.utcnow()
        self.due_date = due_date or (self.loan_date + timedelta(days=14))
        self.return_date = return_date
        self.returned = returned

    @staticmethod
    def from_dict(source, id=None):
        loan = Loan(
            id=id,
            book_id=source.get('book_id'),
            member_id=source.get('member_id'),
            loan_date=source.get('loan_date'),
            due_date=source.get('due_date'),
            return_date=source.get('return_date'),
            returned=source.get('returned', False)
        )

        if 'loan_date' in source and isinstance(source['loan_date'], str):
            loan.loan_date = datetime.fromisoformat(source['loan_date'])

        if 'due_date' in source and isinstance(source['due_date'], str):
            loan.due_date = datetime.fromisoformat(source['due_date'])

        if 'return_date' in source and isinstance(source['return_date'], str):
            loan.return_date = datetime.fromisoformat(source['return_date'])

        return loan

    def to_dict(self):
        loan_dict = {
            'book_id': self.book_id,
            'member_id': self.member_id,
            'loan_date': (
                self.loan_date.isoformat()
                if isinstance(self.loan_date, datetime)
                else self.loan_date
            ),
            'due_date': (
                self.due_date.isoformat()
                if isinstance(self.due_date, datetime)
                else self.due_date
            ),
            'returned': self.returned,
        }

        if self.return_date:
            loan_dict['return_date'] = (
                self.return_date.isoformat()
                if isinstance(self.return_date, datetime)
                else self.return_date
            )

        loan_dict['is_overdue'] = (
            datetime.utcnow() > self.due_date if not self.returned else False
        )

        return loan_dict
