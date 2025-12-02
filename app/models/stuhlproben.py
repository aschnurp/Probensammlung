from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT, FLOAT, TEXT, DATE, VARCHAR
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
import sqlalchemy as sa

class Stuhlproben(Base):
    __tablename__ = "stuhlproben"
    id = Column(Integer, primary_key= True, nullable=False, autoincrement=True)
    timestamp = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    patient_Id_intern = Column(VARCHAR(200), ForeignKey("patient.patient_Id_intern")) 
    created_at = Column(TEXT)
    abholer = Column(TEXT)
    uhrzeit = Column(TEXT)
    probenart = Column(TEXT)
    lagerraum = Column(TEXT)
    differenzierungsmerkmal	= Column(TINYINT, ForeignKey("differenzierungsmerkmal_stuhl.id"), nullable=True)
    anmerkungen = Column(TEXT)
    status = Column(TINYINT, ForeignKey("status.id"))