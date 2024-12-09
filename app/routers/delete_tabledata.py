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
    prefix="/delete",
    tags=['delete']
)

#router for new serum entry
@router.delete("/serum", status_code=status.HTTP_201_CREATED, response_model= schemas.TableDataSerumproben)
def delete_serumproben(delete_post: schemas.TableDataSerumproben, db: Session = Depends(get_db)):
    existing_item_query = db.query(Serumproben).filter(Serumproben.patient_Id_intern == delete_post.barcode_id)
    existing_item = existing_item_query.first()
    if existing_item == None:
        raise HTTPException(status_code= status.HTTP_403_FORBIDDEN, detail= f"entery with barcode_id: {delete_post.barcode_id} does not exist") 
    existing_item_query.delete(delete_post.dict(), synchronize_session = False)
    db.commit()
    return existing_item_query.first()
