from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT, FLOAT, TEXT, DATE, VARCHAR
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
import sqlalchemy as sa

class Edtaplasmaproben(Base):
    __tablename__ = "edtaplasmaproben"
    barcode_id = Column(VARCHAR(200), primary_key= True, nullable=False)
    timestamp = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))	
    patient_Id_intern = Column(VARCHAR(200), ForeignKey("patient.patient_Id_intern"))
    created_at = Column(TEXT)
    abholer = Column(TEXT)
    uhrzeit = Column(TEXT)			
    probenart = Column(TEXT)
    probeninformation_ltx = Column(Integer, ForeignKey("probeninformation_ltx.id"), nullable=True)
    differenzierungsmerkmal	= Column(TINYINT, ForeignKey("differenzierungsmerkmal_serum.id"), nullable=True)
    boxnummer = Column(Integer) 
    boxzeile = Column(TEXT) 
    boxspalte = Column(Integer) 	
    lagerraum = Column(TEXT)
    anmerkungen = Column(TEXT)
    anzahl_statuswechsel = Column(Integer, server_default="0")
    status = Column(TINYINT, ForeignKey("status.id"))