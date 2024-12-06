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

router = APIRouter(
    prefix="/update",
    tags=['update']
)

#router for new serum entry
@router.put("/serum", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDataSerumproben)
def update_serumproben(updated_post: schemas.TableDataSerumproben, db: Session = Depends(get_db)):
    existing_item_query = db.query(Serumproben).filter(Serumproben.patient_Id_intern == updated_post.barcode_id)
    existing_item = existing_item_query.first()
    if existing_item == None:
        raise HTTPException(status_code= status.HTTP_403_FORBIDDEN, detail= f"entery with barcode_id: {updated_post.barcode_id} does not exist") 
    existing_item_query.update(updated_post.dict(), synchronize_session = False)
    db.commit()
    return existing_item_query.first()

#router for new gewebe entry
@router.put("/gewebe", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDataGewebeproben)
def update_gewebeproben(updated_post: schemas.TableDataGewebeproben, db: Session = Depends(get_db)):
    existing_item_query = db.query(Gewebeproben).filter(Gewebeproben.patient_Id_intern == updated_post.barcode_id)
    existing_item = existing_item_query.first()
    if existing_item == None:
        raise HTTPException(status_code= status.HTTP_403_FORBIDDEN, detail= f"entery with barcode_id: {updated_post.barcode_id} does not exist") 
    existing_item_query.update(updated_post.dict(), synchronize_session = False)
    db.commit()
    return existing_item_query.first()

#router for new urin entry
@router.put("/urin", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDataUrinproben)
def update_urinproben(updated_post: schemas.TableDataUrinproben, db: Session = Depends(get_db)):
    existing_item_query = db.query(Urinproben).filter(Urinproben.patient_Id_intern == updated_post.barcode_id)
    existing_item = existing_item_query.first()
    if existing_item == None:
        raise HTTPException(status_code= status.HTTP_403_FORBIDDEN, detail= f"entery with barcode_id: {updated_post.barcode_id} does not exist") 
    existing_item_query.update(updated_post.dict(), synchronize_session = False)
    db.commit()
    return existing_item_query.first()

#router for new paraffin entry
@router.put("/paraffin", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDataParaffinproben)
def update_paraffinproben(updated_post: schemas.TableDataParaffinproben, db: Session = Depends(get_db)):
    existing_item_query = db.query(Paraffinproben).filter(Paraffinproben.patient_Id_intern == updated_post.id)
    existing_item = existing_item_query.first()
    if existing_item == None:
        raise HTTPException(status_code= status.HTTP_403_FORBIDDEN, detail= f"entery with barcode_id: {updated_post.id} does not exist") 
    existing_item_query.update(updated_post.dict(), synchronize_session = False)
    db.commit()
    return existing_item_query.first()


#router for new gewebe entry
@router.put("/patient", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDatapatient)
def update_patient(updated_post: schemas.TableDatapatient, db: Session = Depends(get_db)):
    existing_item_query = db.query(Patient).filter(Patient.patient_Id_intern == updated_post.patient_Id_intern)
    existing_item = existing_item_query.first()
    if existing_item == None:
        raise HTTPException(status_code= status.HTTP_403_FORBIDDEN, detail= f"entery with patient_Id_intern: {updated_post.patient_Id_intern} does not exist") 
    existing_item_query.update(updated_post.dict(), synchronize_session = False)
    db.commit()
    return existing_item_query.first()






