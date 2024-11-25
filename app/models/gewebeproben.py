from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT, FLOAT, TEXT, DATE, VARCHAR
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class Gewebeproben(Base):
    __tablename__ = "gewebeproben"
    barcode_id = Column(VARCHAR(200), primary_key= True, nullable=False)
    timestamp = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    patient_Id_intern = Column(VARCHAR(200), ForeignKey("patient.patient_Id_intern")) 
    created_at = Column(TEXT)	
    probenart = Column(TEXT)
    abholer = Column(TEXT)
    uhrzeit = Column(TEXT)		
    boxnummer = Column(Integer) 
    boxzeile = Column(Integer) 
    boxspalte = Column(Integer) 	
    lagerraum = Column(TEXT)
    anmerkungen = Column(TEXT)
    remarks = Column(TEXT)
    size = Column(TEXT)
    status = Column(TINYINT, ForeignKey("status.id"))

