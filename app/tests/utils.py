# app/tests/utils.py

from typing import Any, Dict

def generate_serum_data(barcode_id: str, patient_id: str = "00000", status: int = 1, created_at: str = "2024-05-01 10:05:00", boxnummer: int = 1, size: str = "20ml") -> Dict[str, Any]:
    return {
        "barcode_id": barcode_id,
        "patient_Id_intern": patient_id,
        "created_at": created_at,
        "probenart": "Serum",
        "boxnummer": boxnummer,
        "boxzeile": "A",
        "boxspalte": 1,
        "lagerraum": "A1",
        "anmerkungen": "Initial entry",
        "remarks": "Test remarks",
        "size": size,
        "status": status
    }

def generate_gewebe_data(
    barcode_id: str,
    patient_id: str = "00000",
    status: int = 1,
    boxnummer: int = None,
    remarks: str = None,
    lagerraum: str = None,
    **kwargs
):
    return {
        "barcode_id": barcode_id,
        "patient_Id_intern": patient_id,
        "created_at": "2024-05-01 12:00:00",
        "probenart": "Gewebe",
        "abholer": "Dr. Muster",
        "uhrzeit": "14:00",
        "boxnummer": boxnummer,
        "boxzeile": "B",
        "boxspalte": 2,
        "lagerraum": lagerraum,
        "anmerkungen": "Keine",
        "remarks": remarks,
        "status": status,
    }


def generate_urin_data(barcode_id: str, patient_id: str = "00000", status: int = 1, created_at: str = "2024-05-01 14:00:00", boxnummer: int = 3) -> Dict[str, Any]:
    return {
        "barcode_id": barcode_id,
        "patient_Id_intern": patient_id,
        "created_at": created_at,
        "probenart": "Urin",
        "boxnummer": boxnummer,
        "boxzeile": "C",
        "boxspalte": 3,
        "lagerraum": "E5",
        "anmerkungen": "Keine",
        "status": status
    }

def generate_paraffin_data(patient_id: str = "00000", status: int = 1, created_at: str = "2024-05-01 16:00:00") -> Dict[str, Any]:
    return {
        "patient_Id_intern": patient_id,
        "probenart": "Paraffin",
        "lagerraum": "G7",
        "anmerkungen": "Keine",
        "created_at": created_at,
        "status": status
    }

def generate_patient_data(patient_id: str, sap_id: int, geschlecht: str = "männlich",
                          alter: int = 30, op_diagnose: str = "Diagnose",
                          op_geplant: str = "OP Plan", bemerkung: str = "Keine",
                          created_at: str = "2024-05-01 10:00:00") -> Dict[str, Any]:
    return {
        "sap_id": sap_id,
        "patient_Id_intern": patient_id,
        "created_at": created_at,
        "geschlecht": geschlecht,
        "alter": alter,
        "op_diagnose": op_diagnose,
        "op_geplant": op_geplant,
        "bemerkung": bemerkung
    }
