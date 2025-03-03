from .. import schemas
from fastapi import status, HTTPException, Depends, APIRouter
from .. database import get_db, Base
from sqlalchemy.orm import Session
from sqlalchemy import Table, MetaData, desc
from ..database import engine
from pydantic import ValidationError
import logging
from typing import List, Dict
from sqlalchemy.exc import SQLAlchemyError
from ..config import settings
# Import the LastBoxInfo schema
from ..schemas import LastBoxInfo

router = APIRouter(
    prefix= "/table",
    tags= ['Table']
)

#requestable tables
ALLOWED_TABLE_NAMES = {"patient", "serumproben", "gewebeproben", "urinproben", "paraffinproben", "probenabholer", "vorlaeufigeproben", "probeninformation"}

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
    


# app/routers/tables.py

@router.get("/last_box_info", response_model=LastBoxInfo)
def get_last_box_info(
    table_name: str,
    db: Session = Depends(get_db)
):
    """
    Retrieve the boxnummer, boxzeile, and boxspalte from the last entry of the specified table.

    - **table_name**: Must be one of "gewebeproben", "serumproben", "urinproben".
    """

    # Define allowed tables for this endpoint
    ALLOWED_LAST_BOX_INFO_TABLES = {"gewebeproben", "serumproben", "urinproben"}

    if table_name not in ALLOWED_LAST_BOX_INFO_TABLES:
        raise HTTPException(
            status_code=400,
            detail=f"Table '{table_name}' is not allowed for this operation. Allowed tables: {ALLOWED_LAST_BOX_INFO_TABLES}"
        )

    try:
        # Initialize metadata and reflect the table structure
        metadata = MetaData()
        table = Table(table_name, metadata, autoload_with=db.get_bind())

        # Build the select statement to get the last entry based on timestamp
        stmt = table.select().order_by(desc(table.c.timestamp)).limit(1)
        result = db.execute(stmt).fetchone()

        if not result:
            raise HTTPException(
                status_code=404,
                detail=f"No entries found in table '{table_name}'."
            )

        # Extract the desired columns
        box_info = {
            "boxnummer": result.boxnummer,
            "boxzeile": result.boxzeile,
            "boxspalte": result.boxspalte
        }

        return box_info

    except SQLAlchemyError as e:
        logging.error(f"Database error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )
    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail=f"Unexpected error: {str(e)}"
        )
