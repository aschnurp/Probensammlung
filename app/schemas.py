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
    boxzeile: Optional[str] = None
    boxspalte: Optional[int] = None
    anmerkungen: Optional[str] = None
    created_at: Optional[str] = None
    abholer: Optional[str] = None
    uhrzeit: Optional[str] = None
    probeninformation: Optional[int] = None
    differenzierungsmerkmal: Optional[int] = None
    anzahl_statuswechsel: Optional[int] = 0

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
    boxzeile: Optional[str] = None
    boxspalte: Optional[int] = None
    anmerkungen: Optional[str] = None
    remarks: Optional[str] = None
    created_at: Optional[str] = None
    probeninformation: Optional[int] = None
    differenzierungsmerkmal: Optional[int] = None
    anzahl_statuswechsel: Optional[int] = 0      

class TableDataGewebeproben(GewebeprobenBase):
    status: Optional[int] = 1

class TableDataProbenabholer(BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None

class UrinprobenBase(BaseModel):
    patient_Id_intern: str
    probenart: str	
    barcode_id: str 	
    lagerraum: Optional[str] = 1029
    boxnummer: Optional[int] = None
    boxzeile: Optional[str] = None
    boxspalte: Optional[int] = None
    anmerkungen: Optional[str] = None
    created_at: Optional[str] = None
    abholer: Optional[str] = None
    uhrzeit: Optional[str] = None
    probeninformation: Optional[int] = None
    differenzierungsmerkmal: Optional[int] = None
    anzahl_statuswechsel: Optional[int] = 0

class TableDataUrinproben(UrinprobenBase):
    status: Optional[int] = 1

class TableDataParaffinproben(BaseModel):
    id: Optional[int] = None
    patient_Id_intern: str
    probenart: str			
    lagerraum: Optional[str] = 1012
    anmerkungen: Optional[str] = None
    created_at: Optional[str] = None
    uebergeordnete_probenart: Optional[int] = None 
    untergeordnete_probenart: Optional[int] = None
    abholer: Optional[str] = None
    uhrzeit: Optional[str] = None

class TableDataParaffinproben(TableDataParaffinproben):
    status: Optional[int] = 1

class TableDatapatient(BaseModel):
    patient_Id_intern: str
    geschlecht: Optional[str] = None
    alter: Optional[int] = None
    op_diagnose: Optional[str] = None
    op_geplant: Optional[str] = None
    sap_id: Optional[int] = None
    sap_fallnummer: Optional[int] = None
    bemerkung: Optional[str] = None
    created_at: Optional[str] = None

class TableVorlaeufigeProben(BaseModel):
    barcode_id: str 
    patient_Id_intern: Optional[str] = None 
    probeninformation: Optional[int] = None
    probeninformation_ltx: Optional[int] = None

class Stuhlproben(BaseModel):
    barcode_id: str
    patient_Id_intern: str
    probenart: str			
    anmerkungen: Optional[str] = None
    created_at: Optional[str] = None
    differenzierungsmerkmal: Optional[int] = None
    abholer: Optional[str] = None
    lagerraum: Optional[str] = None	
    boxnummer: Optional[int] = None
    boxzeile: Optional[str] = None
    boxspalte: Optional[int] = None
    uhrzeit: Optional[str] = None
    probeninformation_ltx: Optional[int] = None
    anzahl_statuswechsel: Optional[int] = 0

class TableDataStuhlproben(Stuhlproben): 
    status: Optional[int] = 1

class GalleprobenBase(BaseModel):
    patient_Id_intern: str
    probenart: str	
    barcode_id: str 	
    lagerraum: Optional[str] = 1029
    boxnummer: Optional[int] = None
    boxzeile: Optional[str] = None
    boxspalte: Optional[int] = None
    anmerkungen: Optional[str] = None
    created_at: Optional[str] = None
    abholer: Optional[str] = None
    uhrzeit: Optional[str] = None
    probeninformation_ltx: Optional[int] = None
    anzahl_statuswechsel: Optional[int] = 0

class TableDataGalleproben(GalleprobenBase):
    status: Optional[int] = 1

class EdtaplasmaprobenBase(BaseModel):
    patient_Id_intern: str
    probenart: str	
    barcode_id: str 	
    lagerraum: Optional[str] = 1029
    boxnummer: Optional[int] = None
    boxzeile: Optional[str] = None
    boxspalte: Optional[int] = None
    anmerkungen: Optional[str] = None
    created_at: Optional[str] = None
    differenzierungsmerkmal: Optional[int] = None
    abholer: Optional[str] = None
    uhrzeit: Optional[str] = None
    probeninformation_ltx: Optional[int] = None
    anzahl_statuswechsel: Optional[int] = 0

class TableDataEdtaplasmaproben(EdtaplasmaprobenBase):
    status: Optional[int] = 1

class TableDataLtx_fragebogen(BaseModel):
    patient_Id_intern: str
    geschlecht: Optional[str] = None
    alter: Optional[int] = None
    gewicht: Optional[int] = None
    groesse: Optional[int] = None
    beruf: Optional[str] = None
    kinder_anzahl: Optional[int] = None
    krankenversicherung: Optional[str] = None
    epices_score: Optional[int] = None
    bewegung: Optional[str] = None
    rotes_fleisch: Optional[int] = None
    rotes_fleisch_anz: Optional[int] = None
    gefluegel: Optional[int] = None
    gefluegel_anz: Optional[int] = None
    verarbeitetes_fleisch: Optional[int] = None
    verarbeitetes_fleisch_anz: Optional[int] = None
    fisch_meeresfruechte: Optional[int] = None
    fisch_meeresfruechte_anz: Optional[int] = None
    eier: Optional[int] = None
    eier_anz: Optional[int] = None
    fruechte_gemuese: Optional[int] = None
    fruechte_gemuese_anz: Optional[int] = None
    staerkehaltige_lebensmittel: Optional[int] = None
    staerkehaltige_lebensmittel_anz: Optional[int] = None
    vollwertkost: Optional[int] = None
    vollwertkost_anz: Optional[int] = None
    huelsenfruechte: Optional[int] = None
    huelsenfruechte_anz: Optional[int] = None
    joghurt: Optional[int] = None
    joghurt_anz: Optional[int] = None
    kaese: Optional[int] = None
    kaese_anz: Optional[int] = None
    milch: Optional[int] = None
    milch_anz: Optional[int] = None
    fruehstueckscerealien: Optional[int] = None
    fruehstueckscerealien_anz: Optional[int] = None
    fettfreie_zuckerhaltige_produkte: Optional[int] = None
    fettfreie_zuckerhaltige_produkte_anz: Optional[int] = None
    fetthaltige_zuckerhaltige_produkte: Optional[int] = None
    fetthaltige_zuckerhaltige_produkte_anz: Optional[int] = None
    fettige_salzige_produkte: Optional[int] = None
    fettige_salzige_produkte_anz: Optional[int] = None
    fette: Optional[int] = None
    fette_anz: Optional[int] = None
    zuckerhaltige_getraenke: Optional[int] = None
    zuckerhaltige_getraenke_anz: Optional[int] = None
    wein: Optional[int] = None
    wein_anz: Optional[int] = None
    bier: Optional[int] = None
    bier_anz: Optional[int] = None
    aperitifs_digestifs: Optional[int] = None
    aperitifs_digestifs_anz: Optional[int] = None
    nierenfunktion: Optional[str] = None
    diabetes: Optional[str] = None
    immunsuppression_immunkompetent: Optional[bool] = None
    immunsuppression_HIV_AIDS: Optional[bool] = None
    immunsuppression_solider_krebs: Optional[bool] = None
    immunsuppression_maligne_heamatopathie: Optional[bool] = None
    immunsuppression_organ_knochenmarkstransplantation: Optional[bool] = None
    immunsuppression_neutropenie: Optional[bool] = None
    immunsuppression_angeborene_immunschwaeche: Optional[bool] = None
    immunsuppression_immunsuppessive_therapie: Optional[bool] = None
    multiresistenz_infektion: Optional[str] = None
    antibiotische_behandlung: Optional[str] = None
    antibiotische_therapie_1_name: Optional[str] = None
    antibiotische_therapie_1_zeitraum: Optional[str] = None
    antibiotische_therapie_1_grund: Optional[str] = None
    antibiotische_therapie_2_name: Optional[str] = None
    antibiotische_therapie_2_zeitraum: Optional[str] = None
    antibiotische_therapie_2_grund: Optional[str] = None
    antibiotische_therapie_3_name: Optional[str] = None
    antibiotische_therapie_3_zeitraum: Optional[str] = None
    antibiotische_therapie_3_grund: Optional[str] = None
    langzeit_norfloxacin_prophylaxe: Optional[str] = None
    hospitalisation_vergangenes_jahr: Optional[str] = None
    geburtsort_ausserhalb_deutschlands: Optional[str] = None
    geburtsort_ausserhalb_deutschlands_ort: Optional[str] = None
    auslandsreise_letzte_drei_monate: Optional[str] = None
    auslandsreise_letzte_drei_monate_ort: Optional[str] = None
    auslandsreise_antibiotika: Optional[str] = None
    auslandsreise_durchfall: Optional[str] = None
    auslandsreise_krankenhaus: Optional[str] = None

class LastBoxInfo(BaseModel):
    boxnummer: int
    boxzeile: str
    boxspalte: int

    class Config:
        from_attributes = True