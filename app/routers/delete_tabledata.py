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

