from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT, FLOAT, TEXT, DATE
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class Paraffinproben(Base):
    __tablename__ = "paraffinproben"
    barcode_id = Column(TEXT, primary_key= True, nullable=False)
    patient_ID_intern = Column(TEXT)
    sap_id = Column(Integer)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))	
    probenart = Column(TEXT)
    lagerraum = Column(TEXT) 	
    probe_erhalten_zeit	 = Column(TEXT)
    probengröße = Column(TEXT)	
    bearbeiter_in = Column(TEXT)	
    anmerkungen_probennahme  = Column(TEXT)	
    anmerkungen_prbenaufbereitung  = Column(TEXT)