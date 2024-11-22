from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT, FLOAT, TEXT, DATE, VARCHAR
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class Paraffinproben(Base):
    __tablename__ = "paraffinproben"
    id = Column(Integer, primary_key= True, nullable=False, autoincrement=True)
    timestamp = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    patient_Id_intern = Column(VARCHAR(200), ForeignKey("patient.patient_Id_intern")) 
    created_at = Column(TEXT)	
    probenart = Column(TEXT)
    lagerraum = Column(TEXT) 	
    anmerkungen = Column(TEXT)

