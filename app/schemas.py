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

class ResetForegetPassword(BaseModel):
    access_token: str
    new_password: str
    confirm_password: str

class SuccessMessage(BaseModel):
    success: bool
    status_code: int
    message: str

class ForgetPasswordRequest(BaseModel):
    email: str
        
class UserLogin(BaseModel):
    email : EmailStr
    password : str

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime
    class Config:
        orm_mode = True

class ComplicationBase(BaseModel):
    Komplikationsloser_Verlauf: bool | None = 0
    Leberinsuffizienz: bool | None = 0
    Harnverhalt: bool | None = 0
    Ileus: bool | None = 0
    Galleleckage: bool | None = 0
    Cholangitis: bool | None = 0
    Reintubation: bool | None = 0
    Pneumonie: bool | None = 0
    Thrombose: bool | None = 0
    Embolie: bool | None = 0
    Nachblutung: bool | None = 0
    Pleuraerguss: bool | None = 0
    Platzbauch: bool | None = 0
    Leberabszess: bool | None = 0
    intraabdomineller_Abszess: bool | None = 0
    Biliom: bool | None = 0
    Dekubitus: bool | None = 0
    Sekundäre_Wundheilung: bool | None = 0
    Multiorganversagen: bool | None = 0
    Anastomoseninsuffizienz: bool | None = 0
    Andere_Komplikation_en: bool | None = 0
    Thoraxdrainage_bei_Erguss: bool | None = 0
    Endoskopie: bool | None = 0
    ERCP: bool | None = 0
    Hämodialyse: bool | None = 0
    MARS: bool | None = 0
    interventionelle_Drainage: bool | None = 0
    ReOperation: bool | None = 0
    Nierninsuffizienz: bool | None = 0
    Wiederaufnahme: bool | None = 0
    anderes_Komplikationsmanagement: bool | None = 0
    Rückverlegung_ITS: bool | None = 0
    Rückverlegung_ITS1: bool | None = 0
    Akutes_Koronarsyndrom: bool | None = 0
    Sepsis: bool | None = 0
    SIRS: bool | None = 0
    Kreislaufinstabilität: bool | None = 0
    Reanimation: bool | None = 0
    respiratorische_Insuffizienz: bool | None = 0
    Hohlorganperforation: bool | None = 0
    Darmpassagestörung: bool | None = 0
    Aszites_postoperativ: bool | None = 0
    Pankreatitis_postoperativ: bool | None = 0
    Harnwegsinfektion_postoperativ: bool | None = 0
    Delir: bool | None = 0
    Cholecystitis: bool | None = 0
    Pankreasfistel: bool | None = 0
    Innere_Hernie: bool | None = 0
    Pleuraempyem: bool | None = 0
    Dauer_des_stationären_Aufenthaltes: Optional[float] = None 
    Dauer_IMC: Optional[float] = None
    Dauer_Intensivstation: Optional[float] = None
    Beatmungsstunden: Optional[float] = None
    NIV_Beatmungsstunden: Optional[float] = None
    Dekubitus_Grad: Optional[int] = None
    Insuffizienz_welcher_Anastomose: Optional[str]= None 
    Andere_Komplikation_1: Optional[str] = None 
    Andere_Komplikation_2: Optional[str] = None 
    Andere_Komplikation_3: Optional[str] = None 
    Andere_Komplikation_4: Optional[str] = None 
    Andere_Komplikation_5: Optional[str] = None 
    Andere_Komplikation_6: Optional[str] = None 
    SAPS_Score_Durchschnitt: Optional[float] = None 
    Drainagenkomplikation: bool | None = 0 
    Drain_Komplikation: bool | None = 0
    Endoskopie_Freitext: Optional[str] = None 
    Hämodialysedauer_h: Optional[float] = None
    MARS_Dauer_in_h: Optional[float] = None
    Clavien_Dindo: Optional[int] = None
    Datum_der_Wiederaufnahme: Optional[str] = None 
    anderes_Komplikationsmanagement_Text: Optional[str] = None
    Gesamtdauer_der_Reanimation_in_Minuten: Optional[float] = None
    Welches_Organ_ist_perforiert: Optional[str] =  None
    Form_des_Delirs: Optional[str] = None

class ComplicationCreate(ComplicationBase):
    patient_id: int 

class ComplicationOut(ComplicationBase):
    patient_id: int 
    created_at: datetime
    
    class Config:
        orm_mode = True

class ComplicationUpdate(ComplicationBase):
    pass    


class MedicationsBase(BaseModel):
    ASS: bool = 0
    Plavix: bool = 0
    Anti_Xa: bool = 0
    Falithrom_Marcumar: bool = 0
    NSAR: bool = 0
    Steroide: bool = 0
    Steroide_Tagesdosis: Optional[float] = None
    Antidepressiva: bool = 0
    Antihypertensiva: bool = 0
    Anzahl_der_Antihypertensiva: Optional[int] = None
    Thyreostatika: bool = 0
    Schilddrüsenhormone: bool = 0
    Protonenpumpeninhibitoren: bool = 0
    Urikostatika: bool = 0
    orale_Antidiabetika: bool = 0
    Insulin: bool = 0
    Insulin_Tagesdosis: Optional[int] = None
    inhalative_Bronchodilatatoren: bool = 0
    weitere_Medikation: bool = 0
    weitere_Medikation_1_Text: Optional[str] = None
    Statine: bool = 0
    Diuretika: bool = 0
    weitere_Medikation_2: bool = 0
    weitere_Medikation_2_Text: Optional[str] = None
    weitere_Medikation_3: bool = 0
    weitere_Medikation_3_Text: Optional[str] = None
    weitere_Medikation_4: bool = 0
    weitere_Medikation_4_Text: Optional[str] = None
    weitere_Medikation_5: bool = 0
    weitere_Medikation_5_Text: Optional[str] = None  

class MedicationCreate(MedicationsBase):
    patient_id: int

class MedicationOut(MedicationsBase):
    patient_id: int
    created_at: datetime

    class Config:
        orm_mode = True

class MedicationUpdate(MedicationsBase):
    pass

class UserLogin(BaseModel):
    email : EmailStr
    password : str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[str] | None = None
