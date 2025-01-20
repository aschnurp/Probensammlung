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
from ..models.probenabholer import Probenabholer

router = APIRouter(
    prefix="/delete",
    tags=['delete']
)

#router for new serum entry
@router.delete("/serumproben", status_code=status.HTTP_200_OK)  # No content on successful delete
def delete_serumproben(delete_post: schemas.TableDataSerumproben, db: Session = Depends(get_db)):
    existing_item_query = db.query(Serumproben).filter(Serumproben.barcode_id == delete_post.barcode_id)
    existing_item = existing_item_query.first()
    if not existing_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Entry with barcode_id: {delete_post.barcode_id} not found.")
    existing_item_query.delete(synchronize_session=False)
    db.commit()
    return {"message": "Successfully deleted"} 

#router for new gewebe entry
@router.delete("/gewebeproben", status_code=status.HTTP_200_OK)  # No content on successful delete
def delete_gewebeproben(delete_post: schemas.TableDataGewebeproben, db: Session = Depends(get_db)):
    existing_item_query = db.query(Gewebeproben).filter(Gewebeproben.barcode_id == delete_post.barcode_id)
    existing_item = existing_item_query.first()
    if not existing_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Entry with barcode_id: {delete_post.barcode_id} not found.")
    existing_item_query.delete(synchronize_session=False)
    db.commit()
    return {"message": "Successfully deleted"} 

#router for new urin entry
@router.delete("/urinproben", status_code=status.HTTP_200_OK)  # No content on successful delete
def delete_urinproben(delete_post: schemas.TableDataUrinproben, db: Session = Depends(get_db)):
    existing_item_query = db.query(Urinproben).filter(Urinproben.barcode_id == delete_post.barcode_id)
    existing_item = existing_item_query.first()
    if not existing_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Entry with barcode_id: {delete_post.barcode_id} not found.")
    existing_item_query.delete(synchronize_session=False)
    db.commit()
    return {"message": "Successfully deleted"} 

#router for new paraffin entry
@router.delete("/paraffinproben", status_code=status.HTTP_200_OK)  # No content on successful delete
def delete_paraffinproben(delete_post: schemas.TableDataParaffinproben, db: Session = Depends(get_db)):
    existing_item_query = db.query(Paraffinproben).filter(Paraffinproben.id == delete_post.id)
    existing_item = existing_item_query.first()
    if not existing_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Entry with id: {delete_post.id} not found.")
    existing_item_query.delete(synchronize_session=False)
    db.commit()
    return {"message": "Successfully deleted"} 

#router for new patient entry
@router.delete("/patient", status_code=status.HTTP_200_OK)  # No content on successful delete
def delete_patient(delete_post: schemas.TableDatapatient, db: Session = Depends(get_db)):
    existing_item_query = db.query(Patient).filter(Patient.patient_Id_intern == delete_post.patient_Id_intern)
    existing_item = existing_item_query.first()
    if not existing_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Entry with patient id (intern): {delete_post.patient_Id_intern} not found.")
    existing_item_query.delete(synchronize_session=False)
    db.commit()
    return {"message": "Successfully deleted"} 

#router for new paraffin entry
@router.delete("/probenabholer", status_code=status.HTTP_200_OK)  # No content on successful delete
def delete_probenabholer(delete_post: schemas.TableDataProbenabholer, db: Session = Depends(get_db)):
    existing_item_query = db.query(Probenabholer).filter(Probenabholer.id == delete_post.id)
    existing_item = existing_item_query.first()
    if not existing_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Entry with id: {delete_post.id} not found.")
    existing_item_query.delete(synchronize_session=False)
    db.commit()
    return {"message": "Successfully deleted"} 
