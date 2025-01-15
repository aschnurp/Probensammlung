from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT, FLOAT, TEXT, DATE, VARCHAR
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class Probenabholer(Base):
    __tablename__ = "probenabholer"
    id = Column(TINYINT, primary_key= True, nullable=False, autoincrement=True)
    name = Column(TEXT)

