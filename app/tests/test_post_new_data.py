# tests/test_new_data_router.py

import pytest
from fastapi import status
from app import schemas

# Test für das Erstellen eines neuen Serumproben-Eintrags
def test_create_serumproben(client):
   
    serum_data = {
        "barcode_id": "SER123456",
        "patient_Id_intern": "00000",
        "created_at": "2024-04-27 10:00:00",
        "probenart": "Serum",
        "boxnummer": 1,
        "boxzeile": 2,
        "boxspalte": 3,
        "lagerraum": "A1",
        "anmerkungen": "Keine",
        "remarks": "Keine",
        "size": "50ml",
        "status": 1
    }

    response = client.post("/new_data/serum", json=serum_data)

    # Überprüft, ob der Eintrag erfolgreich erstellt wurde
    assert response.status_code == status.HTTP_201_CREATED

    # Überprüft, ob die zurückgegebenen Daten korrekt sind
    created_serum = schemas.TableDataSerumproben(**response.json())
    assert created_serum.barcode_id == serum_data["barcode_id"]
    assert created_serum.patient_Id_intern == serum_data["patient_Id_intern"]
    assert created_serum.probenart == serum_data["probenart"]








# Test für das Erstellen eines doppelten Serumproben-Eintrags
def test_create_serumproben_duplicate(client):
    
    serum_data = {
        "barcode_id": "SER_DUPLICATE",
        "patient_Id_intern": "PAT_DUPLICATE",
        "created_at": "2024-04-27 11:00:00",
        "probenart": "Serum",
        "boxnummer": 4,
        "boxzeile": 5,
        "boxspalte": 6,
        "lagerraum": "B2",
        "anmerkungen": "Keine",
        "remarks": "Keine",
        "size": "100ml",
        "status": 2
    }

    # Erstes Erstellen des Eintrags
    response1 = client.post("/new_data/serum", json=serum_data)
    assert response1.status_code == status.HTTP_201_CREATED

    # Versuch, den gleichen Eintrag erneut zu erstellen
    response2 = client.post("/new_data/serum", json=serum_data)
    assert response2.status_code == status.HTTP_403_FORBIDDEN
    assert response2.json()["detail"] == f"Entry with barcode_id: {serum_data['barcode_id']} already exists"







# Test für das Erstellen eines neuen Gewebeproben-Eintrags
def test_create_gewebeproben(client):
   
    gewebe_data = {
        "barcode_id": "GEW123456",
        "patient_Id_intern": "PAT123456",
        "created_at": "2024-04-27 12:00:00",
        "probenart": "Gewebe",
        "lagerraum": "C3",
        "anmerkungen": "Keine",
        "status": 1
    }

    response = client.post("/new_data/gewebe", json=gewebe_data)
    assert response.status_code == status.HTTP_201_CREATED

    created_gewebe = schemas.TableDataGewebeproben(**response.json())
    assert created_gewebe.barcode_id == gewebe_data["barcode_id"]
    assert created_gewebe.probenart == gewebe_data["probenart"]








# Test für das Erstellen eines doppelten Gewebeproben-Eintrags
def test_create_gewebeproben_duplicate(client):
    
    gewebe_data = {
        "barcode_id": "GEW_DUPLICATE",
        "patient_Id_intern": "PAT_DUPLICATE",
        "created_at": "2024-04-27 13:00:00",
        "probenart": "Gewebe",
        "lagerraum": "D4",
        "anmerkungen": "Keine",
        "status": 2
    }

    # Erstes Erstellen des Eintrags
    response1 = client.post("/new_data/gewebe", json=gewebe_data)
    assert response1.status_code == status.HTTP_201_CREATED

    # Versuch, den gleichen Eintrag erneut zu erstellen
    response2 = client.post("/new_data/gewebe", json=gewebe_data)
    assert response2.status_code == status.HTTP_403_FORBIDDEN
    assert response2.json()["detail"] == f"Entry with barcode_id: {gewebe_data['barcode_id']} already exists"








# Test für das Erstellen eines neuen Urinproben-Eintrags
def test_create_urinproben(client):
   
    urin_data = {
        "barcode_id": "URIN123456",
        "patient_Id_intern": "PAT123456",
        "created_at": "2024-04-27 14:00:00",
        "probenart": "Urin",
        "boxnummer": 7,
        "boxzeile": 8,
        "boxspalte": 9,
        "lagerraum": "E5",
        "anmerkungen": "Keine",
        "status": 1
    }

    response = client.post("/new_data/urin", json=urin_data)
    assert response.status_code == status.HTTP_201_CREATED

    created_urin = schemas.TableDataUrinproben(**response.json())
    assert created_urin.barcode_id == urin_data["barcode_id"]
    assert created_urin.probenart == urin_data["probenart"]








# Test für das Erstellen eines doppelten Urinproben-Eintrags
def test_create_urinproben_duplicate(client):
   
    urin_data = {
        "barcode_id": "URIN_DUPLICATE",
        "patient_Id_intern": "PAT_DUPLICATE",
        "created_at": "2024-04-27 15:00:00",
        "probenart": "Urin",
        "boxnummer": 10,
        "boxzeile": 11,
        "boxspalte": 12,
        "lagerraum": "F6",
        "anmerkungen": "Keine",
        "status": 2
    }

    # Erstes Erstellen des Eintrags
    response1 = client.post("/new_data/urin", json=urin_data)
    assert response1.status_code == status.HTTP_201_CREATED

    # Versuch, den gleichen Eintrag erneut zu erstellen
    response2 = client.post("/new_data/urin", json=urin_data)
    assert response2.status_code == status.HTTP_403_FORBIDDEN
    assert response2.json()["detail"] == f"entry with barcode_id: {urin_data['barcode_id']} already exists"








# Test für das Erstellen eines neuen Paraffinproben-Eintrags
def test_create_paraffinproben(client):
    
    paraffin_data = {
        "patient_Id_intern": "PAT123456",
        "probenart": "Paraffin",
        "lagerraum": "G7",
        "anmerkungen": "Keine",
        "status": 1
    }

    response = client.post("/new_data/paraffin", json=paraffin_data)
    assert response.status_code == status.HTTP_201_CREATED

    created_paraffin = schemas.TableDataParaffinproben(**response.json())
    assert created_paraffin.patient_Id_intern == paraffin_data["patient_Id_intern"]
    assert created_paraffin.probenart == paraffin_data["probenart"]







# Test für das Erstellen eines neuen Patienteneintrags
def test_create_patient(client):

    patient_data = {
        "sap_id": 123456,
        "patient_Id_intern": "PAT123456",
        "created_at": "2024-04-27 16:00:00",
        "geschlecht": "männlich",
        "alter": 45,
        "op_diagnose": "Diagnose X",
        "op_gepant": "Gephant Y",
        "bemerkung": "Keine"
    }

    response = client.post("/new_data/patient", json=patient_data)
    assert response.status_code == status.HTTP_201_CREATED

    created_patient = schemas.TableDatapatient(**response.json())
    assert created_patient.patient_Id_intern == patient_data["patient_Id_intern"]
    assert created_patient.geschlecht == patient_data["geschlecht"]










# Test für das Erstellen eines doppelten Patienteneintrags
def test_create_patient_duplicate(client):

    patient_data = {
        "sap_id": 654321,
        "patient_Id_intern": "PAT_DUPLICATE",
        "created_at": "2024-04-27 17:00:00",
        "geschlecht": "weiblich",
        "alter": 30,
        "op_diagnose": "Diagnose Y",
        "op_gepant": "Gephant Z",
        "bemerkung": "Keine"
    }

    # Erstes Erstellen des Eintrags
    response1 = client.post("/new_data/patient", json=patient_data)
    assert response1.status_code == status.HTTP_201_CREATED

    # Versuch, den gleichen Eintrag erneut zu erstellen
    response2 = client.post("/new_data/patient", json=patient_data)
    assert response2.status_code == status.HTTP_403_FORBIDDEN
    assert response2.json()["detail"] == f"entery with barcode_id: {patient_data['patient_Id_intern']} already exists"










# Test für das Erstellen eines Serumproben-Eintrags mit ungültigen Daten
def test_create_serumproben_invalid_data(client):
   
    serum_data = {
        "barcode_id": "",  # Leeres Barcode-ID
        "patient_Id_intern": "PAT_INVALID",
        "created_at": "invalid_date",  # Ungültiges Datumsformat
        "probenart": "Serum",
        "boxnummer": -1,  # Ungültige Boxnummer
        "boxzeile": 2,
        "boxspalte": 3,
        "lagerraum": "A1",
        "anmerkungen": "Keine",
        "remarks": "Keine",
        "size": "50ml",
        "status": 1
    }

    response = client.post("/new_data/serum", json=serum_data)

    # Überprüft, ob die Anfrage aufgrund ungültiger Daten abgelehnt wurde
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    # Optional: Überprüfen Sie die spezifischen Fehlermeldungen
    assert "barcode_id" in response.json()["detail"][0]["loc"]
    assert "created_at" in response.json()["detail"][1]["loc"]
    assert "boxnummer" in response.json()["detail"][2]["loc"]
