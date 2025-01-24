from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT, FLOAT, TEXT, DATE, VARCHAR
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class Urinproben(Base):
    __tablename__ = "urinproben"
    barcode_id = Column(VARCHAR(200), primary_key= True, nullable=False)
    timestamp = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    patient_Id_intern = Column(VARCHAR(200), ForeignKey("patient.patient_Id_intern"))  
    created_at = Column(TEXT)	
    uebergeordete_probenart	= Column(TINYINT, ForeignKey("uebergeordete_probenart.id"), nullable=True)
    probenart = Column(TEXT)
    untergeordete_probenart	= Column(TINYINT, ForeignKey("untergeordete_probenart_urin.id"), nullable=True)	
    boxnummer = Column(Integer) 
    boxzeile = Column(TEXT) 
    boxspalte = Column(Integer) 	
    lagerraum = Column(TEXT)
    anmerkungen = Column(TEXT)
    status = Column(TINYINT, ForeignKey("status.id"))
