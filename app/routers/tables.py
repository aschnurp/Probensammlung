from .. import schemas
from fastapi import status, HTTPException, Depends, APIRouter
from .. database import get_db, Base
from sqlalchemy.orm import Session
from sqlalchemy import Table, MetaData
from ..database import engine
from pydantic import ValidationError
import logging
from typing import List, Dict
from sqlalchemy.exc import SQLAlchemyError
from ..config import settings

router = APIRouter(
    prefix= "/table",
    tags= ['Table']
)

#requestable tables
ALLOWED_TABLE_NAMES = {"patient", "serumproben", "gewebeproben", "urinproben"}

#get table content dynamicly
@router.get("/data", response_model=None)
def get_table_data(
    table_name: str,
    db: Session = Depends(get_db)
):
    logging.info(f"Received table_name: {table_name}")

    if table_name not in ALLOWED_TABLE_NAMES:
        raise HTTPException(status_code=400, detail=f"Table '{table_name}' is not allowed.")

    try:
        # Initialize metadata and reflect the table structure
        metadata = MetaData()
        table = Table(table_name, metadata, autoload_with=db.get_bind())

        # Build and execute the select statement
        stmt = table.select().limit(10000)
        results = db.execute(stmt).fetchall()

        # Extract column names and convert rows to dictionaries
        columns = table.columns.keys()
        data = [{column: getattr(row, column) for column in columns} for row in results]

        return data

    except SQLAlchemyError as e:
        # Handle SQLAlchemy specific errors
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        # Handle general errors
        raise HTTPException(status_code=400, detail=f"Error fetching data from table '{table_name}': {str(e)}")
    

# Helper function to convert SQLAlchemy results to dictionaries
def row_to_dict(row):
    return dict(row)

#@router.post("/filter") --implement filter?

@router.put("/data")



#get all table names
@router.get("/name")
def get_table_names():
    try:
        metadata = MetaData()
        metadata.reflect(bind=engine)
        table_names = metadata.tables.keys()
        
        return {"tables": list(table_names)}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error fetching table names: {str(e)}")