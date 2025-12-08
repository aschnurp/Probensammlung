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
from ..models.edtaplasmaproben import Edtaplasmaproben

router = APIRouter(
    prefix="/samples",
    tags=['Samples']
)

#serum entries per patient
@router.get("/serumentries/{patient_Id_intern}", status_code=status.HTTP_200_OK)
def get_patient_entries_serum(patient_Id_intern: str, db: Session = Depends(get_db)):
    samples = (
        db.query(Serumproben)
        .filter(Serumproben.patient_Id_intern == patient_Id_intern)
        .filter(Serumproben.probeninformation != None)
        .all()
    )
    return samples

