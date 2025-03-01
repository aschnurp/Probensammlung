# app/tests/test_paraffinproben.py

import pytest
from fastapi import status
from app.schemas import TableDataParaffinproben
from app.tests.utils import generate_paraffin_data

class TestParaffinProben:
    def test_create_paraffinproben_multiple(self, client):
        paraffin_data_1 = generate_paraffin_data(patient_id="00000", status=1)
        paraffin_data_2 = generate_paraffin_data(patient_id="00000", status=2)
        paraffin_data_3 = generate_paraffin_data(patient_id="00000", status=3)
        
        for data in [paraffin_data_1, paraffin_data_2, paraffin_data_3]:
            response = client.post("/new_data/paraffin", json=data)
            assert response.status_code == status.HTTP_201_CREATED
            created_paraffin = TableDataParaffinproben(**response.json())
            assert created_paraffin.patient_Id_intern == data["patient_Id_intern"]
            assert created_paraffin.probenart == data["probenart"]
            assert created_paraffin.status == data["status"]

    def test_create_paraffinproben_missing_fields(self, client):
        # Missing 'patient_Id_intern'
        paraffin_data = {
            "probenart": "Paraffin",
            "lagerraum": "G7",
            "anmerkungen": "Keine",
            "created_at": "2024-05-01 16:00:00",
            "status": 1
        }
        response = client.post("/new_data/paraffin", json=paraffin_data)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        assert any("patient_Id_intern" in str(error["loc"]) for error in response.json()["detail"])

    def test_create_paraffinproben_invalid_data_types(self, client):
        # Invalid 'status' type
        paraffin_data = generate_paraffin_data(patient_id=12345, status="active")
        response = client.post("/new_data/paraffin", json=paraffin_data)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        assert any("patient_Id_intern" in str(error["loc"]) for error in response.json()["detail"])
        assert any("status" in str(error["loc"]) for error in response.json()["detail"])
    
    def test_update_paraffinproben(self, client):
        # First, create a paraffinproben entry
        paraffin_data = generate_paraffin_data(patient_id="00000", status=1)
        response = client.post("/new_data/paraffin", json=paraffin_data)
        assert response.status_code == status.HTTP_201_CREATED
        created_paraffin = TableDataParaffinproben(**response.json())
        paraffin_id = created_paraffin.id

        # Update paraffin details
        updated_paraffin_data = {
            "id": paraffin_id,
            "patient_Id_intern": "00000",
            "probenart": "Paraffin",
            "lagerraum": "H8",
            "anmerkungen": "Updated Paraffin",
            "created_at": "2024-05-01 17:00:00",
            "status": 3
        }
        response = client.put("/update/paraffinproben", json=updated_paraffin_data)
        assert response.status_code == status.HTTP_201_CREATED
        updated_item = response.json()
        assert updated_item["lagerraum"] == "H8"
        assert updated_item["anmerkungen"] == "Updated Paraffin"
        assert updated_item["status"] == 3

    def test_delete_paraffinproben(self, client):
    # First, create a paraffinproben entry
     paraffin_data = generate_paraffin_data(patient_id="00000", status=1)
     response = client.post("/new_data/paraffin", json=paraffin_data)
     assert response.status_code == status.HTTP_201_CREATED
     created_paraffin = TableDataParaffinproben(**response.json())
     paraffin_id = created_paraffin.id
    
     # Delete paraffin entry
     delete_data = {
        "id": paraffin_id,
        "patient_Id_intern": created_paraffin.patient_Id_intern,
        "probenart": created_paraffin.probenart,
        "lagerraum": created_paraffin.lagerraum,
        "anmerkungen": created_paraffin.anmerkungen,
        "created_at": created_paraffin.created_at,
        "status": created_paraffin.status,
     }
     response = client.request("DELETE", "/delete/paraffinproben", json=delete_data)
     assert response.status_code == status.HTTP_200_OK
     assert response.json()["message"] == "Successfully deleted"
    
     # Confirm deletion
     res = client.get("/table/data?table_name=paraffinproben")
     assert res.status_code == status.HTTP_200_OK
     data = res.json()
     assert not any(item["id"] == paraffin_id for item in data)