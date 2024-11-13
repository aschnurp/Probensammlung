from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT, FLOAT, TEXT, DATE, VARCHAR
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class Paraffinproben(Base):
    __tablename__ = "paraffinproben"
    barcode_id = Column(VARCHAR(200), primary_key= True, nullable=False)
    patient_ID_intern = Column(VARCHAR(200), ForeignKey("patient.patient_ID_intern")) 
    sap_id = Column(Integer)
    created_at = Column(TEXT)	
    probenart = Column(TEXT)
    lagerraum = Column(TEXT) 	
    anmerkungen = Column(TEXT)

