from fastapi import APIRouter, Depends, HTTPException
from .. import schemas
from ..database import get_db, Base
from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from ..models.serumproben import Serumproben
from ..models.gewebeproben import Gewebeproben
from ..models.urinproben import Urinproben
from ..models.galleproben import Galleproben
from ..models.edtaplasmaproben import Edtaplasmaproben
from ..models.stuhlproben import Stuhlproben

router = APIRouter(
    prefix="/ausschleusen",
    tags=['ausschleusen']
)

#router for new serum entry
@router.patch("/serum/{barcode_id}", status_code=status.HTTP_200_OK,response_model=schemas.TableDataSerumproben)
def patch_serumproben(barcode_id: str, db: Session = Depends(get_db)):
    # Suche nach dem bestehenden Eintrag
    item_query = db.query(Serumproben).filter(Serumproben.barcode_id == barcode_id)
    existing_item = item_query.first()

    #test ob item existiert
    if not existing_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Eintrag mit barcode_id: {barcode_id} existiert nicht.",
        )
    # Aktualisieren des Eintrags mit dem Standardwert 2 für status
    try:
        item_query.update({"status": 2}, synchronize_session=False)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Fehler beim Aktualisieren: {str(e)}",
        )
    return item_query.first()


#router for new serum entry
@router.patch("/gewebe/{barcode_id}", status_code=status.HTTP_200_OK,response_model=schemas.TableDataSerumproben)
def patch_gewebeproben(barcode_id: str, db: Session = Depends(get_db)):
    # Suche nach dem bestehenden Eintrag
    item_query = db.query(Gewebeproben).filter(Gewebeproben.barcode_id == barcode_id)
    existing_item = item_query.first()

    #test ob item existiert
    if not existing_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Eintrag mit barcode_id: {barcode_id} existiert nicht.",
        )
    
    # Aktualisieren des Eintrags mit dem Standardwert 2 für status
    try:
        item_query.update({"status": 2}, synchronize_session=False)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Fehler beim Aktualisieren: {str(e)}",
        )
    return item_query.first()


#router for new serum entry
@router.patch("/urin/{barcode_id}", status_code=status.HTTP_200_OK,response_model=schemas.TableDataSerumproben)
def patch_urinproben(barcode_id: str, db: Session = Depends(get_db)):
    # Suche nach dem bestehenden Eintrag
    item_query = db.query(Urinproben).filter(Urinproben.barcode_id == barcode_id)
    existing_item = item_query.first()

    #test ob item existiert
    if not existing_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Eintrag mit barcode_id: {barcode_id} existiert nicht.",
        )
    # Aktualisieren des Eintrags mit dem Standardwert 2 für status
    try:
        item_query.update({"status": 2}, synchronize_session=False)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Fehler beim Aktualisieren: {str(e)}",
        )
    return item_query.first()

#router for new galle entry
@router.patch("/galle/{barcode_id}", status_code=status.HTTP_200_OK,response_model=schemas.TableDataGalleproben)
def patch_galleproben(barcode_id: str, db: Session = Depends(get_db)):
    # Suche nach dem bestehenden Eintrag
    item_query = db.query(Galleproben).filter(Galleproben.barcode_id == barcode_id)
    existing_item = item_query.first()

    #test ob item existiert
    if not existing_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Eintrag mit barcode_id: {barcode_id} existiert nicht.",
        )
    # Aktualisieren des Eintrags mit dem Standardwert 2 für status
    try:
        item_query.update({"status": 2}, synchronize_session=False)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Fehler beim Aktualisieren: {str(e)}",
        )
    return item_query.first()

#router for new stuhlproben entry
@router.patch("/stuhl/{barcode_id}", status_code=status.HTTP_200_OK,response_model=schemas.TableDataStuhlproben)
def patch_stuhlproben(barcode_id: str, db: Session = Depends(get_db)):
    # Suche nach dem bestehenden Eintrag
    item_query = db.query(Stuhlproben).filter(Stuhlproben.barcode_id == barcode_id)
    existing_item = item_query.first()

    #test ob item existiert
    if not existing_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Eintrag mit barcode_id: {barcode_id} existiert nicht.",
        )
    # Aktualisieren des Eintrags mit dem Standardwert 2 für status
    try:
        item_query.update({"status": 2}, synchronize_session=False)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Fehler beim Aktualisieren: {str(e)}",
        )
    return item_query.first()

#router for new edtaplasmaproben entry
@router.patch("/edtaplasma/{barcode_id}", status_code=status.HTTP_200_OK,response_model=schemas.TableDataEdtaplasmaproben)
def patch_edtaplasmaproben(barcode_id: str, db: Session = Depends(get_db)):
    # Suche nach dem bestehenden Eintrag
    item_query = db.query(Edtaplasmaproben).filter(Edtaplasmaproben.barcode_id == barcode_id)
    existing_item = item_query.first()

    #test ob item existiert
    if not existing_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Eintrag mit barcode_id: {barcode_id} existiert nicht.",
        )
    # Aktualisieren des Eintrags mit dem Standardwert 2 für status
    try:
        item_query.update({"status": 2}, synchronize_session=False)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Fehler beim Aktualisieren: {str(e)}",
        )
    return item_query.first()