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
from ..models.paraffinproben import Paraffinproben

router = APIRouter(
    prefix="/new_data",
    tags=['new_data']
)

#router for new serum entry
@router.post("/serum", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDataSerumproben)
def create_serumproben(post: schemas.TableDataSerumproben, db: Session = Depends(get_db)):
    new_item = Serumproben(**post.dict())
    existing_item = db.query(Serumproben).filter(Serumproben.barcode_id == post.barcode_id).first()
    if existing_item:
        raise HTTPException(status_code= status.HTTP_403_FORBIDDEN, detail= f"entery with patient_id: {post.barcode_id} already exists") 
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


#router for new gewebe entry
@router.post("/gewebe", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDataGewebeproben)
def create_gewebeproben(post: schemas.TableDataGewebeproben, db: Session = Depends(get_db)):
    new_item = Gewebeproben(**post.dict())
    existing_item = db.query(Gewebeproben).filter(Gewebeproben.barcode_id == post.barcode_id).first()
    if existing_item:
        raise HTTPException(status_code= status.HTTP_403_FORBIDDEN, detail= f"entery with patient_id: {post.barcode_id} already exists") 
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


#router for new urin entry
@router.post("/urin", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDataUrinproben)
def create_urinproben(post: schemas.TableDataUrinproben, db: Session = Depends(get_db)):
    new_item = Urinproben(**post.dict())
    existing_item = db.query(Urinproben).filter(Urinproben.barcode_id == post.barcode_id).first()
    if existing_item:
        raise HTTPException(status_code= status.HTTP_403_FORBIDDEN, detail= f"entery with patient_id: {post.barcode_id} already exists") 
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


#router for new paraffin entry
@router.post("/paraffin", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDataParaffinproben)
def create_paraffinproben(post: schemas.TableDataParaffinproben, db: Session = Depends(get_db)):
    new_item = Paraffinproben(**post.dict())
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


#router for new urin entry
@router.post("/patient", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDatapatient)
def create_patient(post: schemas.TableDatapatient, db: Session = Depends(get_db)):
    new_item = Patient(**post.dict())
    existing_item = db.query(Patient).filter(Patient.patient_Id_intern == post.patient_Id_intern).first()
    if existing_item:
        raise HTTPException(status_code= status.HTTP_403_FORBIDDEN, detail= f"entery with patient_id: {post.patient_Id_intern} already exists") 
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item