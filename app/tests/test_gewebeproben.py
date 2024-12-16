# app/tests/test_gewebeproben.py

import pytest
from fastapi import status
from app.schemas import TableDataGewebeproben
from app.tests.utils import generate_gewebe_data

class TestGewebeProben:
    @pytest.mark.parametrize(
        "barcode_id, patient_id, proben_status",
        [
            ("GEW_TEST_001", "00000", 1),
            ("GEW_TEST_002", "00000", 2),
            ("GEW_TEST_003", "00000", 3),
        ]
    )
    def test_create_gewebeproben_multiple(self, client, barcode_id, patient_id, proben_status):
        gewebe_data = generate_gewebe_data(barcode_id=barcode_id, patient_id=patient_id, status=proben_status)
        response = client.post("/new_data/gewebe", json=gewebe_data)
        assert response.status_code == status.HTTP_201_CREATED
        created_gewebe = TableDataGewebeproben(**response.json())
        assert created_gewebe.barcode_id == gewebe_data["barcode_id"]
        assert created_gewebe.patient_Id_intern == gewebe_data["patient_Id_intern"]
        assert created_gewebe.probenart == gewebe_data["probenart"]
        assert created_gewebe.status == gewebe_data["status"]

    def test_create_gewebeproben_duplicate(self, client):
        barcode_id = "GEW_DUPLICATE"
        gewebe_data = generate_gewebe_data(barcode_id=barcode_id)
        response1 = client.post("/new_data/gewebe", json=gewebe_data)
        assert response1.status_code == status.HTTP_201_CREATED

        response2 = client.post("/new_data/gewebe", json=gewebe_data)
        assert response2.status_code == status.HTTP_403_FORBIDDEN
        assert response2.json()["detail"] == f"Entry with barcode_id: {barcode_id} already exists"

    def test_create_gewebeproben_missing_fields(self, client):
        # Missing 'barcode_id'
        gewebe_data = {
            "patient_Id_intern": "PAT_MISSING_001",
            "created_at": "2024-05-01 12:00:00",
            "probenart": "Gewebe",
            "lagerraum": "C3",
            "anmerkungen": "Keine",
            "remarks": "Remark",
            "abholer": "Dr. Muster",
            "uhrzeit": "14:00",
            "status": 1
        }
        response = client.post("/new_data/gewebe", json=gewebe_data)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        assert any("barcode_id" in str(error["loc"]) for error in response.json()["detail"])

    def test_create_gewebeproben_invalid_data_types(self, client):
        # Invalid 'barcode_id' type and 'status' type
        gewebe_data = generate_gewebe_data(barcode_id=12345, patient_id="PAT_INVALID_TYPE", status="active")
        response = client.post("/new_data/gewebe", json=gewebe_data)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        assert any("barcode_id" in str(error["loc"]) for error in response.json()["detail"])
        assert any("status" in str(error["loc"]) for error in response.json()["detail"])

    

    def test_create_gewebeproben_sql_injection(self, client):
        # Attempt SQL injection via barcode_id
        gewebe_data = generate_gewebe_data(barcode_id="GEW'; DROP TABLE gewebeproben;--")
        response = client.post("/new_data/gewebe", json=gewebe_data)
        # The response should not execute the injection; depends on ORM security
        assert response.status_code in [status.HTTP_201_CREATED, status.HTTP_400_BAD_REQUEST, status.HTTP_422_UNPROCESSABLE_ENTITY]

    def test_update_gewebeproben(self, client):
        barcode_id = "GEW_UPDATE_001"
        gewebe_data = generate_gewebe_data(barcode_id=barcode_id)
        client.post("/new_data/gewebe", json=gewebe_data)

        # Ausschleusen -> status:2
        response = client.patch(f"/ausschleusen/gewebe/{barcode_id}")
        assert response.status_code == status.HTTP_200_OK
        updated_item = response.json()
        assert updated_item["status"] == 2

        # Wiedereinschleusen -> status:3
        response = client.patch(f"/wiedereingeschleusen/gewebe/{barcode_id}")
        assert response.status_code == status.HTTP_200_OK
        updated_item = response.json()
        assert updated_item["status"] == 3

        # Update gewebe details
        updated_gewebe_data = generate_gewebe_data(
            barcode_id=barcode_id,
            boxnummer=5,
            remarks="Updated Remark",
            status=3,
            lagerraum="B3"
        )
        response = client.put("/update/gewebeproben", json=updated_gewebe_data)
        assert response.status_code == status.HTTP_201_CREATED
        updated_item = response.json()
        assert updated_item["boxnummer"] == 5
        assert updated_item["remarks"] == "Updated Remark"
        assert updated_item["lagerraum"] == "B3"

    def test_delete_gewebeproben(self, client):
        barcode_id = "GEW_DELETE_001"
        gewebe_data = generate_gewebe_data(barcode_id=barcode_id)
        client.post("/new_data/gewebe", json=gewebe_data)

        # Delete gewebe entry
        delete_data = {
            "barcode_id": barcode_id,
            "patient_Id_intern": gewebe_data["patient_Id_intern"],
            "probenart": gewebe_data["probenart"]
        }
        response = client.request("DELETE", "/delete/gewebeproben", json=delete_data)
        assert response.status_code == status.HTTP_200_OK
        assert response.json()["message"] == "Successfully deleted"

        # Confirm deletion
        res = client.get("/table/data?table_name=gewebeproben")
        assert res.status_code == status.HTTP_200_OK
        data = res.json()
        assert not any(item["barcode_id"] == barcode_id for item in data)
