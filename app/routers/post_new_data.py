from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas
from fastapi import status, HTTPException, Depends, APIRouter
from ..database import get_db
from sqlalchemy.orm import Session
from ..models.patient import Patient
from ..models.serumproben import Serumproben
from ..models.gewebeproben import Gewebeproben
from ..models.urinproben import Urinproben
from ..models.paraffinproben import Paraffinproben
from ..models.probenabholer import Probenabholer
from ..models.vorlaeufige_proben import VorlaeufigeProben
from ..models.stuhlproben import Stuhlproben
from ..models.galleproben import Galleproben
from ..models.ltx_fragebogen import Ltx_fragebogen
from ..models.edtaplasmaproben import Edtaplasmaproben
from datetime import datetime


router = APIRouter(
    prefix="/new_data",
    tags=['new_data']
)

#router for new serum entry
# Example POST method for Serumproben
@router.post("/serum", status_code=status.HTTP_201_CREATED, response_model=schemas.TableDataSerumproben)
def create_serumproben(post: schemas.TableDataSerumproben, db: Session = Depends(get_db)):
    post_data = post.dict()
    
    # Ensure created_at is always stored as a string
    if isinstance(post_data.get("created_at"), datetime):
        post_data["created_at"] = post_data["created_at"].strftime('%Y-%m-%d %H:%M:%S')

    new_item = Serumproben(**post_data)
    existing_item = db.query(Serumproben).filter(Serumproben.barcode_id == post.barcode_id).first()
    if existing_item:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Entry with barcode_id: {post.barcode_id} already exists")

    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    # Convert datetime fields to strings before returning
    if isinstance(new_item.created_at, datetime):
        new_item.created_at = new_item.created_at.strftime('%Y-%m-%d %H:%M:%S')

    return new_item


#router for new gewebe entry
@router.post("/gewebe", status_code=status.HTTP_201_CREATED, response_model=schemas.TableDataGewebeproben)
def create_gewebeproben(post: schemas.TableDataGewebeproben, db: Session = Depends(get_db)):
    new_item = Gewebeproben(**post.dict())
    
    existing_item = db.query(Gewebeproben).filter(Gewebeproben.barcode_id == post.barcode_id).first()
    if existing_item:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Entry with barcode_id: {post.barcode_id} already exists") 

    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    # Convert created_at to string if it's a datetime object
    if isinstance(new_item.created_at, datetime):
        new_item.created_at = new_item.created_at.strftime('%Y-%m-%d %H:%M:%S')

    return new_item

# Router for new urin entry
@router.post("/urin", status_code=status.HTTP_201_CREATED, response_model=schemas.TableDataUrinproben)
def create_urinproben(post: schemas.TableDataUrinproben, db: Session = Depends(get_db)):
    post_data = post.dict()

    # Ensure created_at is always stored as a string
    if isinstance(post_data.get("created_at"), datetime):
        post_data["created_at"] = post_data["created_at"].strftime('%Y-%m-%d %H:%M:%S')

    new_item = Urinproben(**post_data)

    # Check if an entry with the same barcode_id already exists
    existing_item = db.query(Urinproben).filter(Urinproben.barcode_id == post.barcode_id).first()
    if existing_item:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"entry with barcode_id: {post.barcode_id} already exists")

    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    # Convert datetime fields to strings before returning
    if isinstance(new_item.created_at, datetime):
        new_item.created_at = new_item.created_at.strftime('%Y-%m-%d %H:%M:%S')

    return new_item


#router for new paraffin entry
@router.post("/paraffin", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDataParaffinproben)
def create_paraffinproben(post: schemas.TableDataParaffinproben, db: Session = Depends(get_db)):
    new_item = Paraffinproben(**post.dict())

    # Prüfen, ob die Probe bereits existiert
    existing_item = db.query(Paraffinproben).filter(Paraffinproben.id == post.id).first()
    if existing_item:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Entry with barcode_id: {post.id} already exists")

    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


#router for new patient entry
@router.post("/patient", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDatapatient)
def create_patient(post: schemas.TableDatapatient, db: Session = Depends(get_db)):
    new_item = Patient(**post.dict())

    existing_item = db.query(Patient).filter(Patient.patient_Id_intern == post.patient_Id_intern).first()
    if existing_item:
        raise HTTPException(status_code= status.HTTP_403_FORBIDDEN, detail= f"entery with barcode_id: {post.patient_Id_intern} already exists") 
    
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

#router for new probenabholer entry
@router.post("/probenabholer", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDataProbenabholer)
def create_probenabholer(post: schemas.TableDataProbenabholer, db: Session = Depends(get_db)):
    new_item = Probenabholer(**post.dict())
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


#router for new vorlaeufige_proben.py entry
@router.post("/vorlaeufige_proben", status_code=status.HTTP_201_CREATED, response_model=schemas.TableVorlaeufigeProben)
def create_vorlaeufigeproben(post: schemas.TableVorlaeufigeProben, db: Session = Depends(get_db)):
    post_data = post.dict()

    # Prüfen, ob der Patient existiert
    existing_patient = db.query(Patient).filter(Patient.patient_Id_intern == post.patient_Id_intern).first()
    
    if not existing_patient:
        # Neuen Patienten anlegen
        new_patient = Patient(patient_Id_intern=post.patient_Id_intern)  
        db.add(new_patient)
        db.commit()
        db.refresh(new_patient)
        print(f"Patient mit ID {post.patient_Id_intern} wurde erstellt.")

    # Prüfen, ob die Probe bereits existiert
    existing_item = db.query(VorlaeufigeProben).filter(VorlaeufigeProben.barcode_id == post.barcode_id).first()
    if existing_item:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Entry with barcode_id: {post.barcode_id} already exists")

    # Neue Probe hinzufügen
    new_item = VorlaeufigeProben(**post_data)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    return new_item

#router for new stuhl entry
@router.post("/stuhl", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDataStuhlproben)
def create_stuhlproben(post: schemas.TableDataStuhlproben, db: Session = Depends(get_db)):
    new_item = Stuhlproben(**post.dict())

        # Prüfen, ob die Probe bereits existiert
    existing_item = db.query(Stuhlproben).filter(Stuhlproben.barcode_id == post.barcode_id).first()
    if existing_item:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Entry with barcode_id: {post.barcode_id} already exists")
    
    # Neue Probe hinzufügen
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


#router for new galle entry
@router.post("/galle", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDataGalleproben)
def create_galleproben(post: schemas.TableDataGalleproben, db: Session = Depends(get_db)):
    new_item = Galleproben(**post.dict())

        # Prüfen, ob die Probe bereits existiert
    existing_item = db.query(Galleproben).filter(Galleproben.barcode_id == post.barcode_id).first()
    if existing_item:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Entry with barcode_id: {post.barcode_id} already exists")
    
    # Neue Probe hinzufügen
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


#router for new edtaplasma entry
@router.post("/edtaplasma", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDataEdtaplasmaproben)
def create_galleproben(post: schemas.TableDataEdtaplasmaproben, db: Session = Depends(get_db)):
    new_item = Edtaplasmaproben(**post.dict())

        # Prüfen, ob die Probe bereits existiert
    existing_item = db.query(Edtaplasmaproben).filter(Edtaplasmaproben.barcode_id == post.barcode_id).first()
    if existing_item:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Entry with barcode_id: {post.barcode_id} already exists")
    
    # Neue Probe hinzufügen
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


#router for new ltx-fragebogen entry
@router.post("/ltx_fragebogen", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDataLtx_fragebogen)
def create_ltxfragebogen(post: schemas.TableDataLtx_fragebogen, db: Session = Depends(get_db)):
    new_item = Ltx_fragebogen(**post.dict())
    
    # Neue Probe hinzufügen
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item