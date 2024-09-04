from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas
from ..database import get_db, Base
from .. import schemas
from fastapi import status, HTTPException, Depends, APIRouter
from ..database import get_db
from sqlalchemy.orm import Session
from ..models.patient import Patient


router = APIRouter(
    prefix="/number",
    tags=['Number']
)

#Get number of all patient_ids
@router.get("/patients", status_code=status.HTTP_201_CREATED)
def get_patients(db: Session = Depends(get_db)):
    item = db.query(Patient).all()
    if item == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"no item in this list")
    return item
