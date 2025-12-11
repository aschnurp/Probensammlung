from fastapi import APIRouter, Depends, HTTPException
from .. import schemas
from ..database import get_db, Base
from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import asc
from ..models.patient import Patient
from ..models.serumproben import Serumproben
from ..models.gewebeproben import Gewebeproben
from ..models.urinproben import Urinproben
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
        .order_by(Serumproben.probeninformation.asc())
        .all()
    )
    result = [
        {
            "patient_Id_intern": s.patient_Id_intern,
            "probeninformation": s.probeninformation
        }
        for s in samples
    ]

    return result

#gewebe entries per patient
@router.get("/gewebeentries/{patient_Id_intern}", status_code=status.HTTP_200_OK)
def get_patient_entries_gewebe(patient_Id_intern: str, db: Session = Depends(get_db)):
    samples = (
        db.query(Gewebeproben)
        .filter(Gewebeproben.patient_Id_intern == patient_Id_intern)
        .filter(Gewebeproben.probeninformation != None)
        .order_by(Gewebeproben.probeninformation.asc())
        .all()
    )
    result = [
        {
            "patient_Id_intern": s.patient_Id_intern,
            "probeninformation": s.probeninformation
        }
        for s in samples
    ]

    return result

#urin entries per patient
@router.get("/urinentries/{patient_Id_intern}", status_code=status.HTTP_200_OK)
def get_patient_entries_urin(patient_Id_intern: str, db: Session = Depends(get_db)):
    samples = (
        db.query(Urinproben)
        .filter(Urinproben.patient_Id_intern == patient_Id_intern)
        .filter(Urinproben.probeninformation != None)
        .order_by(Urinproben.probeninformation.asc())
        .all()
    )
    result = [
        {
            "patient_Id_intern": s.patient_Id_intern,
            "probeninformation": s.probeninformation
        }
        for s in samples
    ]

    return result


#galle entries per patient
@router.get("/galleentries/{patient_Id_intern}", status_code=status.HTTP_200_OK)
def get_patient_entries_galle(patient_Id_intern: str, db: Session = Depends(get_db)):
    samples = (
        db.query(Galleproben)
        .filter(Galleproben.patient_Id_intern == patient_Id_intern)
        .filter(Galleproben.probeninformation_ltx != None)
        .order_by(Galleproben.probeninformation_ltx.asc())
        .all()
    )
    result = [
        {
            "patient_Id_intern": s.patient_Id_intern,
            "probeninformation": s.probeninformation_ltx
        }
        for s in samples
    ]

    return result


#galle entries per patient
@router.get("/stuhlentries/{patient_Id_intern}", status_code=status.HTTP_200_OK)
def get_patient_entries_stuhl(patient_Id_intern: str, db: Session = Depends(get_db)):
    samples = (
        db.query(Stuhlproben)
        .filter(Stuhlproben.patient_Id_intern == patient_Id_intern)
        .filter(Stuhlproben.probeninformation_ltx != None)
        .order_by(Stuhlproben.probeninformation_ltx.asc())
        .all()
    )
    result = [
        {
            "patient_Id_intern": s.patient_Id_intern,
            "probeninformation": s.probeninformation_ltx
        }
        for s in samples
    ]

    return result


#edta entries per patient
@router.get("/edtaentries/{patient_Id_intern}", status_code=status.HTTP_200_OK)
def get_patient_entries_edta(patient_Id_intern: str, db: Session = Depends(get_db)):
    samples = (
        db.query(Edtaplasmaproben)
        .filter(Edtaplasmaproben.patient_Id_intern == patient_Id_intern)
        .filter(Edtaplasmaproben.probeninformation_ltx != None)
        .order_by(Edtaplasmaproben.probeninformation_ltx.asc())
        .all()
    )
    result = [
        {
            "patient_Id_intern": s.patient_Id_intern,
            "probeninformation": s.probeninformation_ltx
        }
        for s in samples
    ]

    return result