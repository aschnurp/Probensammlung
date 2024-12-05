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

class SerumprobenBase(BaseModel):
    patient_Id_intern: str
    probenart: str	
    barcode_id: str  	
    lagerraum: Optional[str] = 1029
    boxnummer: Optional[int] = None
    boxzeile: Optional[int] = None
    boxspalte: Optional[int] = None
    anmerkungen: Optional[str] = None
    created_at: Optional[str] = None

class TableDataSerumproben(SerumprobenBase):
    status: Optional[int] = 1

class GewebeprobenBase(BaseModel):
    patient_Id_intern: str
    probenart: str	
    barcode_id: str 	
    lagerraum: Optional[str] = 1029
    abholer: Optional[str] = None
    uhrzeit: Optional[str] = None
    boxnummer: Optional[int] = None
    boxzeile: Optional[int] = None
    boxspalte: Optional[int] = None
    anmerkungen: Optional[str] = None
    remarks: Optional[str] = None
    size: Optional[str] = None
    created_at: Optional[str] = None

class TableDataGewebeproben(GewebeprobenBase):
    status: Optional[int] = 1

class UrinprobenBase(BaseModel):
    patient_Id_intern: str
    probenart: str	
    barcode_id: str 	
    lagerraum: Optional[str] = 1029
    boxnummer: Optional[int] = None
    boxzeile: Optional[int] = None
    boxspalte: Optional[int] = None
    anmerkungen: Optional[str] = None
    created_at: Optional[str] = None

class TableDataUrinproben(UrinprobenBase):
    status: Optional[int] = 1

class TableDataParaffinproben(BaseModel):
    id: Optional[int] = None
    patient_Id_intern: str
    probenart: str			
    lagerraum: Optional[str] = 1012
    anmerkungen: Optional[str] = None
    created_at: Optional[str] = None

class TableDataParaffinproben(TableDataParaffinproben):
    status: Optional[int] = 1

class TableDatapatient(BaseModel):
    patient_Id_intern: str
    geschlecht: Optional[str] = None
    alter: Optional[int] = None
    op_diagnose: Optional[str] = None
    op_geplant: Optional[str] = None
    sap_id: Optional[int] = None
    bemerkung: Optional[str] = None
    created_at: Optional[str] = None

class LastBoxInfo(BaseModel):
    boxnummer: int
    boxzeile: int
    boxspalte: int

    class Config:
        from_attributes = True