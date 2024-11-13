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
    probenart: str
    barcode_id: str
    boxnummer: int
    boxzeile: int
    boxspalte: int
    lagerraum: str
    anmerkungen: str

class TableDataUrinproben(BaseModel):
    patient_Id_intern: str
    sap_id: int
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
    probenart: str			
    lagerraum: str	
    anmerkungen: str

class TableDatapatient(BaseModel):
    sap_id: int
    patient_Id_intern: str
    datum: str
    geschlecht: str
    alter: int
    op_diagnose: str
    bemerkung: str
