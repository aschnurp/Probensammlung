from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from .. import schemas
from ..database import get_db
from ..config import settings
import re



router = APIRouter(
    prefix="/custom-query",
    tags=['Custom Query']
)

ALLOWED_TABLE_NAMES = {"complication", "labour", "medication"}

@router.post("/")
def execute_custom_query(query: schemas.SQLQueryIn, db: Session = Depends(get_db)):
    try:
        # Extract the SQL query from the request body
        sql_query = query.query  # query should start with SELECT, no other method allowed
        
        # Ensure the query starts with SELECT
        if not sql_query.strip().upper().startswith("SELECT"):
            raise HTTPException(status_code=400, detail="Only SELECT queries are allowed.")
        
        # Extract table names from the query
        table_names = set(re.findall(r'\bFROM\s+(\w+)\b', sql_query, re.IGNORECASE))
        
        # Check if all table names are in the allowed list
        if not table_names.issubset(ALLOWED_TABLE_NAMES):
            raise HTTPException(status_code=400, detail="Query references unauthorized tables.")
        
        # Execute the provided SQL query
        result = db.execute(text(sql_query))
        
        # Fetch all rows from the query result
        rows = result.fetchall()
        
        # Extract column names from the result set
        columns = result.keys()
        
        # Format the results into a list of dictionaries
        formatted_result = [
            {column: value for column, value in zip(columns, row)}
            for row in rows
        ]
        
        return {"data": formatted_result}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error executing query: {str(e)}")