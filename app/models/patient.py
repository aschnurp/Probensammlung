from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT, FLOAT, TEXT, DATE
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class Patient(Base):
    __tablename__ = "patient"
    sap_id = Column(Integer, primary_key = True, nullable = False)
    probennummer = Column(Integer)
    sap_fallnummer = Column(Integer)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    datum = Column(TEXT)
    geschlecht = Column(TEXT)
    alter = Column(Integer)
    op_diagnose = Column(TEXT)
    bemerkung = Column(TEXT)




