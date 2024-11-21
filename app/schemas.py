from pydantic import BaseModel, EmailStr, Extra, Field
from datetime import datetime
from typing import Optional


class TableFilterRequest(BaseModel):
    table_name: str
    column_name: str
    value: str

class SQLQueryIn(BaseModel):
    query: str

class TableDataIn(BaseModel):
    table_name: str

class TableDataIDIn(BaseModel):
    table_name: str

class TableDataSerumproben(BaseModel):
    patient_Id_intern: str
    probenart: str	
    barcode_id: str  	
    lagerraum: Optional[str] = None
    boxnummer: Optional[int] = None
    boxzeile: Optional[int] = None
    boxspalte: Optional[int] = None
    anmerkungen: Optional[str] = None

class TableDataGewebeproben(BaseModel):
    patient_Id_intern: str
    probenart: str	
    barcode_id: str 	
    lagerraum: Optional[str] = None
    abholer: Optional[str] = None
    uhrzeit: Optional[str] = None
    boxnummer: Optional[int] = None
    boxzeile: Optional[int] = None
    boxspalte: Optional[int] = None
    anmerkungen: Optional[str] = None
    remarks: Optional[str] = None
    size: Optional[str] = None

class TableDataUrinproben(BaseModel):
    patient_Id_intern: str
    probenart: str	
    barcode_id: str 	
    lagerraum: Optional[str] = None
    boxnummer: Optional[int] = None
    boxzeile: Optional[int] = None
    boxspalte: Optional[int] = None
    anmerkungen: Optional[str] = None

class TableDataParaffinproben(BaseModel):
    id: Optional[int] = None
    patient_Id_intern: str
    probenart: str			
    lagerraum: Optional[str] = None
    anmerkungen: Optional[str] = None	

class TableDatapatient(BaseModel):
    patient_Id_intern: str
    geschlecht: Optional[str] = None
    alter: Optional[int] = None
    op_diagnose: Optional[str] = None
    sap_id: Optional[int] = None
    bemerkung: Optional[str] = None


