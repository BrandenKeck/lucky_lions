import time
from app import db
from app.models.timestampmixin import TimestampMixin

# Create a Dummy Table
class Transaction(db.Model, TimestampMixin):
    """Data Model for a ML Model Collection"""
    __tablename__ = 'collections'

    # Create Dummy Data
    id = db.Column(db.Integer, primary_key=True)
    info = db.Column(db.String, nullable=False)

    # Print Dummy Item
    def __repr__(self):
        return f"<Transaction {self.info}>"
