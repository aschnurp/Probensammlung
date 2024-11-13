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
    sap_id: int
    created_at: str	
    probenart: str	
    barcode_id: str 	
    boxnummer: int 
    boxzeile: int 
    boxspalte: int 	
    lagerraum: str	
    anmerkungen: str

class TableDataGewebeproben(BaseModel):
    patient_Id_intern: str
    sap_id: int
    created_at: int
    probenart: str
    barcode_ID: str
    boxnummer: int
    boxzeile: int
    boxspalte: int
    lagerraum: str
    anmerkungen: str

class TableDataUrinproben(BaseModel):
    patient_Id_intern: str
    sap_id: int
    created_at: str
    probenart: str
    barcode_id: str
    boxnummer: int
    boxzeile: int
    boxspalte: int
    lagerraum: str
    anmerkungen: str

class TableDataParaffinproben(BaseModel):
    patient_Id_intern: str
    sap_id: int
    created_at: str	
    probenart: str	
    barcode_id: str 		
    lagerraum: str	
    anmerkungen: str
