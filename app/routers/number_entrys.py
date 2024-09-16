from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas
from ..database import get_db, Base
from .. import schemas
from fastapi import status, HTTPException, Depends, APIRouter
from ..database import get_db
from sqlalchemy.orm import Session
from ..models.patient import Patient
from ..models.serumproben import Serumproben
from ..models.gewebeproben import Gewebeproben
from ..models.urinproben import Urinproben


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