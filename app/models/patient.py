from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT, FLOAT, TEXT, DATE, VARCHAR
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class Patient(Base):
    __tablename__ = "patient"
    sap_id = Column(Integer, nullable=True)
    timestamp = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    patient_Id_intern = Column(VARCHAR(200), primary_key = True, nullable = False)
    created_at = Column(TEXT, nullable=True)	
    geschlecht = Column(TEXT, nullable=True)
    alter = Column(Integer, nullable=True)
    op_diagnose = Column(TEXT, nullable=True)
    bemerkung = Column(TEXT, nullable=True)

