from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT, FLOAT, TEXT, DATE
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class Gewebeproben(Base):
    __tablename__ = "gewebeproben"
    probennummer = Column(Integer, primary_key= True, nullable=False)
    sap_id = Column(Integer, ForeignKey("patient.sap_id"))
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))	
    probenart = Column(TEXT)	
    barcode_ID = Column(Integer) 	
    boxnummer = Column(Integer) 
    boxzeile = Column(Integer) 
    boxspalte = Column(Integer) 	
    lagerraum = Column(TEXT) 	
    probe_erhalten_zeit	 = Column(TEXT)
    probengröße = Column(TEXT)	
    bearbeiter_in = Column(TEXT)	
    anmerkungen_probennahme  = Column(TEXT)	
    anmerkungen_prbenaufbereitung  = Column(TEXT)


