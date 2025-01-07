# tests/test_new_data_router.py

import pytest
from fastapi import status
from app import schemas

# Test für das Erstellen eines neuen Serumproben-Eintrags
def test_create_serumproben(client, serum_data):
    response = client.post("/new_data/serum", json=serum_data)

    # Überprüft, ob der Eintrag erfolgreich erstellt wurde
    assert response.status_code == 201

    # Überprüft, ob die zurückgegebenen Daten korrekt sind
    created_serum = schemas.TableDataSerumproben(**response.json())
    assert created_serum.barcode_id == serum_data["barcode_id"]
    assert created_serum.patient_Id_intern == serum_data["patient_Id_intern"]
    assert created_serum.probenart == serum_data["probenart"]

# Test für das Erstellen eines doppelten Serumproben-Eintrags
def test_create_serumproben_duplicate(client):
    
    serum_data = {
        "barcode_id": "SER_DUPLICATE",
        "patient_Id_intern": "00000",
        "created_at": "2024-04-27 11:00:00",
        "probenart": "Serum",
        "boxnummer": 4,
        "boxzeile": 'A',
        "boxspalte": 6,
        "lagerraum": "B2",
        "anmerkungen": "Keine",
        "remarks": "Keine",
        "status": 1
    }

    # Erstes Erstellen des Eintrags
    response1 = client.post("/new_data/serum", json=serum_data)
    assert response1.status_code == 201

    # Versuch, den gleichen Eintrag erneut zu erstellen
    response2 = client.post("/new_data/serum", json=serum_data)
    assert response2.status_code == status.HTTP_403_FORBIDDEN
    assert response2.json()["detail"] == f"Entry with barcode_id: {serum_data['barcode_id']} already exists"

# Test für das Erstellen eines neuen Gewebeproben-Eintrags
def test_create_gewebeproben(client):
   
    gewebe_data = {
        "barcode_id": "GEW123456",
        "patient_Id_intern": "00000",
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
        "patient_Id_intern": "00000",
        "created_at": "2024-04-27 13:00:00",
        "probenart": "Gewebe",
        "lagerraum": "D4",
        "anmerkungen": "Keine",
        "status": 1
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
        "patient_Id_intern": "00000",
        "created_at": "2024-04-27 14:00:00",
        "probenart": "Urin",
        "boxnummer": 7,
        "boxzeile": 'A',
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
        "patient_Id_intern": "00000",
        "created_at": "2024-04-27 15:00:00",
        "probenart": "Urin",
        "boxnummer": 10,
        "boxzeile": 'A',
        "boxspalte": 12,
        "lagerraum": "F6",
        "anmerkungen": "Keine",
        "status": 1
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
        "patient_Id_intern": "00000",
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
def test_create_patient(client, patient_data):
    response = client.post("/new_data/patient", json=patient_data)

    assert response.status_code == 201

    created_patient = schemas.TableDatapatient(**response.json())
    assert created_patient.patient_Id_intern == patient_data["patient_Id_intern"]
    assert created_patient.geschlecht == patient_data["geschlecht"]

# Test für das Erstellen eines doppelten Patienteneintrags
def test_create_patient_duplicate(client, patient_data_double):

    response2 = client.post("/new_data/patient", json=patient_data_double)
    assert response2.status_code == status.HTTP_403_FORBIDDEN


# Test für das Erstellen eines Serumproben-Eintrags mit ungültigen Daten
def test_create_serumproben_invalid_data(client, serum_data_invlaid):

    response = client.post("/new_data/serum", json=serum_data_invlaid)
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY