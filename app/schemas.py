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


class TableDataGewebeproben(BaseModel):
    patient_Id_intern: str
    probenart: str	
    barcode_id: str 	
    lagerraum: str

class TableDataUrinproben(BaseModel):
    patient_Id_intern: str
    probenart: str	
    barcode_id: str 	
    lagerraum: str

class TableDataParaffinproben(BaseModel):
    patient_Id_intern: str
    probenart: str			
    lagerraum: str	

class TableDatapatient(BaseModel):
    patient_Id_intern: str
    geschlecht: str
    alter: int
    op_diagnose: str
