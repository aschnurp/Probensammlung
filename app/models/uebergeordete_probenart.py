from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT, FLOAT, TEXT, DATE, VARCHAR
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class Uebergeordete_probenart(Base):
    __tablename__ = "uebergeordete_probenart"
    id = Column(TINYINT, primary_key= True, nullable=False, autoincrement=True)
    uebergeordete_probenart_text = Column(TEXT)
