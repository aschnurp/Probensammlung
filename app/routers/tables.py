#standard import
from .. import schemas
import csv
import io
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
from fastapi.responses import StreamingResponse

# Import the LastBoxInfo schema
from ..schemas import LastBoxInfo


import logging
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    LongTable,
    TableStyle,
)


router = APIRouter(
    prefix= "/table",
    tags= ['Table']
)

#TODO allowed names als enviroment variables implementieren
#requestable tables
ALLOWED_TABLE_NAMES = {"patient", "ltx_fragebogen","serumproben", "gewebeproben", "urinproben", "paraffinproben", "probenabholer", "vorlaeufigeproben", "probeninformation", "probeninformation_ltx" ,"stuhlproben", "galleproben", "edtaplasmaproben"}

def fetch_table_data(table_name: str, db: Session):
    """Liest eine erlaubte Tabelle aus der Datenbank aus."""

    if table_name not in ALLOWED_TABLE_NAMES:
        raise HTTPException(
            status_code=400,
            detail=f"Table '{table_name}' is not allowed.",
        )

    metadata = MetaData()
    table = Table(
        table_name,
        metadata,
        autoload_with=db.get_bind(),
    )

    columns = list(table.columns.keys())
    stmt = table.select().limit(100000)
    results = db.execute(stmt).fetchall()

    data = [
        {column: row._mapping[column] for column in columns}
        for row in results
    ]

    return columns, data


@router.get("/data", response_model=None)
def get_table_data(
    table_name: str,
    db: Session = Depends(get_db),
):
    try:
        _, data = fetch_table_data(table_name, db)
        return data

    except HTTPException:
        raise
    except SQLAlchemyError:
        logging.exception("Database error")
        raise HTTPException(
            status_code=500,
            detail="Database error while fetching table data.",
        )


@router.get("/export")
def export_table(
    table_name: str,
    format: str = "csv",
    db: Session = Depends(get_db),
):
    if format not in ("csv", "pdf"):
        raise HTTPException(
            status_code=400,
            detail="Supported formats are CSV and PDF.",
        )

    try:
        columns, data = fetch_table_data(table_name, db)

        # ================= CSV EXPORT =================
        if format == "csv":
            output = io.StringIO(newline="")
            output.write("\ufeff")

            writer = csv.DictWriter(
                output,
                fieldnames=columns,
                delimiter=";",
            )
            writer.writeheader()
            writer.writerows(data)

            content = output.getvalue().encode("utf-8")

            return StreamingResponse(
                iter([content]),
                media_type="text/csv; charset=utf-8",
                headers={
                    "Content-Disposition":
                        f'attachment; filename="{table_name}.csv"'
                },
            )

        # ================= PDF EXPORT =================
        pdf_buffer = io.BytesIO()

        doc = SimpleDocTemplate(
            pdf_buffer,
            pagesize=landscape(A4),
            rightMargin=12 * mm,
            leftMargin=12 * mm,
            topMargin=15 * mm,
            bottomMargin=15 * mm,
            title=f"Export: {table_name}",
        )

        styles = getSampleStyleSheet()

        title_style = styles["Title"]

        cell_style = ParagraphStyle(
            "TableCell",
            parent=styles["BodyText"],
            fontSize=7,
            leading=9,
            wordWrap="CJK",
        )

        story = [
            Paragraph(
                f"Tabellenexport: {escape(str(table_name))}",
                title_style,
            ),
            Spacer(1, 8 * mm),
        ]

        # Tabellenkopf
        table_data = [
            [
                Paragraph(
                    f"<b>{escape(str(column))}</b>",
                    cell_style,
                )
                for column in columns
            ]
        ]

        # Tabellenzeilen
        for row in data:
            table_data.append([
                Paragraph(
                    escape(
                        "" if row.get(column) is None
                        else str(row.get(column))
                    ),
                    cell_style,
                )
                for column in columns
            ])

        # Verfügbare Seitenbreite gleichmäßig aufteilen
        page_width = landscape(A4)[0]
        available_width = (
            page_width - doc.leftMargin - doc.rightMargin
        )

        column_count = max(len(columns), 1)
        column_widths = [
            available_width / column_count
        ] * column_count

        table = LongTable(
            table_data,
            colWidths=column_widths,
            repeatRows=1,
            hAlign="LEFT",
        )

        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#fcd9a4"),), #colour of header
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white), #text colour
            (
                "GRID",
                (0, 0),
                (-1, -1),
                0.35,
                colors.HexColor("#B8C4CE"),
            ),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 4),
            ("RIGHTPADDING", (0, 0), (-1, -1), 4),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            (
                "ROWBACKGROUNDS",
                (0, 1),
                (-1, -1),
                [
                    colors.white,
                    colors.HexColor("#F2F6FA"),
                ],
            ),
        ]))

        story.append(table)
        doc.build(story)

        pdf_buffer.seek(0)

        return StreamingResponse(
            pdf_buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition":
                    f'attachment; filename="{table_name}.pdf"'
            },
        )

    except HTTPException:
        raise

    except SQLAlchemyError:
        logging.exception("Database error during export")
        raise HTTPException(
            status_code=500,
            detail="Database error during export.",
        )
"""
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
        stmt = table.select().limit(100000)
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

@router.put("/data")
"""


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

    - **table_name**: Must be one of "gewebeproben", "serumproben", "urinproben", "galleproben", "stuhlproben", "edtaplasmaproben"
    """

    #TODO allowed names als enviroment variables implementieren
    # Define allowed tables for this endpoint
    ALLOWED_LAST_BOX_INFO_TABLES = {"gewebeproben", "serumproben", "urinproben", "galleproben", "stuhlproben", "edtaplasmaproben"}

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
