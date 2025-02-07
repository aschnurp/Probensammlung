from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT, FLOAT, TEXT, DATE, VARCHAR
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class Untergeordnete_probenart_serum(Base):
    __tablename__ = "untergeordnete_probenart_serum"
    id = Column(TINYINT, primary_key= True, nullable=False, autoincrement=True)
    untergeordnete_probenart_text = Column(TEXT)
