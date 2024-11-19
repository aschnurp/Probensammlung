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

class TableDataSerumprobenIN(BaseModel):
    patient_Id_intern: str
    probenart: str	
    barcode_id: str 	
    lagerraum: str	

class TableDataSerumprobenOUT(BaseModel):
    patient_Id_intern: str
    probenart: str	
    barcode_id: str 	
    lagerraum: str
    boxnummer: int
    boxzeile: int
    boxspalte: int
    anmerkungen: str


class TableDataGewebeprobenIN(BaseModel):
    patient_Id_intern: str
    probenart: str	
    barcode_id: str 	
    lagerraum: str

class TableDataGewebeprobenOUT(BaseModel):
    patient_Id_intern: str
    probenart: str	
    barcode_id: str 	
    lagerraum: str
    created_at: str
    abholer: str
    uhrzeit: str
    boxnummer: int
    boxzeile: int
    boxspalte: int
    anmerkungen: str
    remarks: str
    size: str

class TableDataUrinprobenIN(BaseModel):
    patient_Id_intern: str
    probenart: str	
    barcode_id: str 	
    lagerraum: str

class TableDataUrinprobenOUT(BaseModel):
    patient_Id_intern: str
    probenart: str	
    barcode_id: str 	
    lagerraum: str
    created_at: str
    boxnummer: int
    boxzeile: int
    boxspalte: int
    anmerkungen: str

class TableDataParaffinprobenIN(BaseModel):
    patient_Id_intern: str
    probenart: str			
    lagerraum: str	


class TableDataParaffinprobenOUT(BaseModel):
    patient_Id_intern: str
    created_at: str
    probenart: str			
    lagerraum: str
    anmerkungen: str	

class TableDatapatientIN(BaseModel):
    patient_Id_intern: str
    geschlecht: str
    alter: int
    op_diagnose: str

class TableDatapatientOUT(BaseModel):
    patient_Id_intern: str
    geschlecht: str
    alter: int
    op_diagnose: str
    sap_id: int
    created_at: str
    bemerkung: str


