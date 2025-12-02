from fastapi import APIRouter, Depends, HTTPException
from .. import schemas
from ..database import get_db, Base
from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from ..models.patient import Patient
from ..models.serumproben import Serumproben
from ..models.gewebeproben import Gewebeproben
from ..models.urinproben import Urinproben
from ..models.paraffinproben import Paraffinproben
from ..models.stuhlproben import Stuhlproben
from ..models.galleproben import Galleproben

router = APIRouter(
    prefix="/number",
    tags=['Number']
)

#Get number of all patient_ids
@router.get("/patients", status_code=status.HTTP_201_CREATED)
def get_patients(db: Session = Depends(get_db)):
    item = db.query(Patient).count()
    if item == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"no item in this list")
    return item

#number of serum entries per patient
@router.get("/patient/serumentries", status_code=status.HTTP_200_OK)
def get_patient_entries_serum(patient_Id_intern: str, db: Session = Depends(get_db)):
    count_entries = (
        db.query(Serumproben)
        .filter(Serumproben.patient_Id_intern == patient_Id_intern)
        .count()
    )
    if count_entries == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No entries found for patient_Id_intern {patient_Id_intern}"
        )
    return {"count": count_entries}

#number of gewebe entries per patient
@router.get("/patient/gewebeentries", status_code=status.HTTP_200_OK)
def get_patient_entries_serum(patient_Id_intern: str, db: Session = Depends(get_db)):
    count_entries = (
        db.query(Gewebeproben)
        .filter(Gewebeproben.patient_Id_intern == patient_Id_intern)
        .count()
    )
    if count_entries == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No entries found for patient_Id_intern {patient_Id_intern}"
        )
    return {"count": count_entries}

#number of paraffin entries per patient
@router.get("/patient/paraffinentries", status_code=status.HTTP_200_OK)
def get_patient_entries_serum(patient_Id_intern: str, db: Session = Depends(get_db)):
    count_entries = (
        db.query(Paraffinproben)
        .filter(Paraffinproben.patient_Id_intern == patient_Id_intern)
        .count()
    )
    if count_entries == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No entries found for patient_Id_intern {patient_Id_intern}"
        )
    return {"count": count_entries}

#number of urin entries per patient
@router.get("/patient/urinentries", status_code=status.HTTP_200_OK)
def get_patient_entries_serum(patient_Id_intern: str, db: Session = Depends(get_db)):
    count_entries = (
        db.query(Urinproben)
        .filter(Urinproben.patient_Id_intern == patient_Id_intern)
        .count()
    )
    if count_entries == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No entries found for patient_Id_intern {patient_Id_intern}"
        )
    return {"count": count_entries}

#number of stuhlproben entries per patient
@router.get("/patient/stuhlentries", status_code=status.HTTP_200_OK)
def get_patient_entries_stuhl(patient_Id_intern: str, db: Session = Depends(get_db)):
    count_entries = (
        db.query(Stuhlproben)
        .filter(Stuhlproben.patient_Id_intern == patient_Id_intern)
        .count()
    )
    if count_entries == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No entries found for patient_Id_intern {patient_Id_intern}"
        )
    return {"count": count_entries}

#number of galleproben entries per patient
@router.get("/patient/galleentries", status_code=status.HTTP_200_OK)
def get_patient_entries_galle(patient_Id_intern: str, db: Session = Depends(get_db)):
    count_entries = (
        db.query(Galleproben)
        .filter(Galleproben.patient_Id_intern == patient_Id_intern)
        .count()
    )
    if count_entries == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No entries found for patient_Id_intern {patient_Id_intern}"
        )
    return {"count": count_entries}


#Get number of all serumproben
@router.get("/serumproben", status_code=status.HTTP_201_CREATED)
def get_serumproben(db: Session = Depends(get_db)):
    item = db.query(Serumproben).count()
    if item == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"no item in this list")
    return item

#Get number of all gewebeproben
@router.get("/gewebeproben", status_code=status.HTTP_201_CREATED)
def get_gewebeproben(db: Session = Depends(get_db)):
    item = db.query(Gewebeproben).count()
    if item == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"no item in this list")
    return item

#Get number of all urinproben
@router.get("/urinproben", status_code=status.HTTP_201_CREATED)
def get_urinproben(db: Session = Depends(get_db)):
    item = db.query(Urinproben).count()
    if item == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"no item in this list")
    return item

#Get number of all paraffinproben
@router.get("/paraffinproben", status_code=status.HTTP_201_CREATED)
def get_paraffinproben(db: Session = Depends(get_db)):
    item = db.query(Paraffinproben).count()
    if item == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"no item in this list")
    return item

#Get number of all stuhlproben
@router.get("/stuhlproben", status_code=status.HTTP_201_CREATED)
def get_stuhlproben(db: Session = Depends(get_db)):
    item = db.query(Stuhlproben).count()
    if item == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"no item in this list")
    return item

#Get number of all galleproben
@router.get("/galleproben", status_code=status.HTTP_201_CREATED)
def get_stuhlproben(db: Session = Depends(get_db)):
    item = db.query(Galleproben).count()
    if item == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"no item in this list")
    return item
