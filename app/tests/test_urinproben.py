# app/tests/test_urinproben.py

import pytest
from fastapi import status
from app.schemas import TableDataUrinproben
from app.tests.utils import generate_urin_data

class TestUrinProben:
    @pytest.mark.parametrize(
        "barcode_id, patient_id, proben_status",
        [
            ("URIN_TEST_001", "00000", 1),
            ("URIN_TEST_002", "00000", 2),
            ("URIN_TEST_003", "00000", 3),
        ]
    )
    def test_create_urinproben_multiple(self, client, barcode_id, patient_id, proben_status):
        urin_data = generate_urin_data(barcode_id=barcode_id, patient_id=patient_id, status=proben_status)
        response = client.post("/new_data/urin", json=urin_data)
        assert response.status_code == status.HTTP_201_CREATED
        created_urin = TableDataUrinproben(**response.json())
        assert created_urin.barcode_id == urin_data["barcode_id"]
        assert created_urin.patient_Id_intern == urin_data["patient_Id_intern"]
        assert created_urin.probenart == urin_data["probenart"]
        assert created_urin.status == urin_data["status"]

    def test_create_urinproben_duplicate(self, client):
        barcode_id = "URIN_DUPLICATE"
        urin_data = generate_urin_data(barcode_id=barcode_id)
        response1 = client.post("/new_data/urin", json=urin_data)
        assert response1.status_code == status.HTTP_201_CREATED

        response2 = client.post("/new_data/urin", json=urin_data)
        assert response2.status_code == status.HTTP_403_FORBIDDEN
        assert response2.json()["detail"] == f"entry with barcode_id: {barcode_id} already exists"

    def test_create_urinproben_missing_fields(self, client):
        # Missing 'barcode_id'
        urin_data = {
            "patient_Id_intern": "PAT_MISSING_002",
            "created_at": "2024-05-01 14:00:00",
            "probenart": "Urin",
            "lagerraum": "E5",
            "anmerkungen": "Keine",
            "status": 1
        }
        response = client.post("/new_data/urin", json=urin_data)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        assert any("barcode_id" in str(error["loc"]) for error in response.json()["detail"])

    def test_create_urinproben_invalid_data_types(self, client):
        # Invalid 'barcode_id' type and 'status' type
        urin_data = generate_urin_data(barcode_id=12345, patient_id="PAT_INVALID_TYPE", status="active")
        response = client.post("/new_data/urin", json=urin_data)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        assert any("barcode_id" in str(error["loc"]) for error in response.json()["detail"])
        assert any("status" in str(error["loc"]) for error in response.json()["detail"])

  

    def test_create_urinproben_sql_injection(self, client):
        # Attempt SQL injection via barcode_id
        urin_data = generate_urin_data(barcode_id="URIN'; DROP TABLE urinproben;--")
        response = client.post("/new_data/urin", json=urin_data)
        # The response should not execute the injection; depends on ORM security
        assert response.status_code in [status.HTTP_201_CREATED, status.HTTP_400_BAD_REQUEST, status.HTTP_422_UNPROCESSABLE_ENTITY]

    def test_update_urinproben(self, client):
        barcode_id = "URIN_UPDATE_001"
        urin_data = generate_urin_data(barcode_id=barcode_id)
        client.post("/new_data/urin", json=urin_data)

        # Ausschleusen -> status:2
        response = client.patch(f"/ausschleusen/urin/{barcode_id}")
        assert response.status_code == status.HTTP_200_OK
        updated_item = response.json()
        assert updated_item["status"] == 2

        # Wiedereinschleusen -> status:3
        response = client.patch(f"/wiedereingeschleusen/urin/{barcode_id}")
        assert response.status_code == status.HTTP_200_OK
        updated_item = response.json()
        assert updated_item["status"] == 3

        # Update urin details
        updated_urin_data = generate_urin_data(
            barcode_id=barcode_id,
            boxnummer=5,
            status=3,
            created_at="2024-05-01 15:00:00"
        )
        response = client.put("/update/urinproben", json=updated_urin_data)
        assert response.status_code == status.HTTP_201_CREATED
        updated_item = response.json()
        assert updated_item["boxnummer"] == 5
        assert updated_item["status"] == 3

    def test_delete_urinproben(self, client):
        barcode_id = "URIN_DELETE_001"
        urin_data = generate_urin_data(barcode_id=barcode_id)
        client.post("/new_data/urin", json=urin_data)

        # Delete urin entry
        delete_data = {
            "barcode_id": barcode_id,
            "patient_Id_intern": urin_data["patient_Id_intern"],
            "probenart": urin_data["probenart"]
        }
        response = client.request("DELETE", "/delete/urinproben", json=delete_data)
        assert response.status_code == status.HTTP_200_OK
        assert response.json()["message"] == "Successfully deleted"

        # Confirm deletion
        res = client.get("/table/data?table_name=urinproben")
        assert res.status_code == status.HTTP_200_OK
        data = res.json()
        assert not any(item["barcode_id"] == barcode_id for item in data)
