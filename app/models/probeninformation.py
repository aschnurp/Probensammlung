from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT, FLOAT, TEXT, DATE, VARCHAR
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class Probeninformation(Base):
    __tablename__ = "probeninformation"
    id = Column(TINYINT, primary_key= True, nullable=False, autoincrement=True)
    probeninformation_text = Column(TEXT)
    probenart = Column(TEXT)
