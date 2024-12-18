import pytest
from fastapi import status
from app.schemas import TableDataSerumproben
from app.tests.utils import generate_serum_data

class TestSerumProben:
    @pytest.mark.parametrize(
        "barcode_id, patient_id, proben_status",
        [
            ("SER_TEST_001", "00000", 1),
            ("SER_TEST_002", "00000", 2),
            ("SER_TEST_003", "00000", 3),
        ]
    )
    def test_create_serumproben_multiple(self, client, barcode_id, patient_id, proben_status):
        serum_data = generate_serum_data(barcode_id=barcode_id, patient_id=patient_id, status=proben_status)
        response = client.post("/new_data/serum", json=serum_data)
        assert response.status_code == status.HTTP_201_CREATED
        created_serum = TableDataSerumproben(**response.json())
        assert created_serum.barcode_id == serum_data["barcode_id"]
        assert created_serum.patient_Id_intern == serum_data["patient_Id_intern"]
        assert created_serum.status == serum_data["status"]

    def test_create_serumproben_duplicate(self, client):
        barcode_id = "SER_DUPLICATE"
        serum_data = generate_serum_data(barcode_id=barcode_id)
        response1 = client.post("/new_data/serum", json=serum_data)
        assert response1.status_code == status.HTTP_201_CREATED

        response2 = client.post("/new_data/serum", json=serum_data)
        assert response2.status_code == status.HTTP_403_FORBIDDEN
        assert response2.json()["detail"] == f"Entry with barcode_id: {barcode_id} already exists"

    def test_create_serumproben_missing_fields(self, client):
        serum_data = {
            "patient_Id_intern": "PAT_MISSING_001",
            "created_at": "2024-05-01 10:05:00",
            "probenart": "Serum",
            "status": 1
        }
        response = client.post("/new_data/serum", json=serum_data)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        # Ensure barcode_id is missing
        assert any("barcode_id" in str(error["loc"]) for error in response.json()["detail"])

    def test_create_serumproben_invalid_data_types(self, client):
        serum_data = generate_serum_data(barcode_id=12345, status="active")  # invalid types
        response = client.post("/new_data/serum", json=serum_data)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

   
    def test_update_serumproben(self, client):
        barcode_id = "SER_UPDATE_001"
        serum_data = generate_serum_data(barcode_id=barcode_id)
        client.post("/new_data/serum", json=serum_data)

        # Ausschleusen -> status:2
        response = client.patch(f"/ausschleusen/serum/{barcode_id}")
        assert response.status_code == status.HTTP_200_OK
        updated_item = response.json()
        assert updated_item["status"] == 2

        # Wiedereinschleusen -> status:3
        response = client.patch(f"/wiedereingeschleusen/serum/{barcode_id}")
        assert response.status_code == status.HTTP_200_OK
        updated_item = response.json()
        assert updated_item["status"] == 3

        # Update serum details
        updated_serum_data = generate_serum_data(barcode_id=barcode_id, boxnummer=5, status=3)
        response = client.put("/update/serumproben", json=updated_serum_data)
        assert response.status_code == status.HTTP_201_CREATED
        updated_item = response.json()
        assert updated_item["boxnummer"] == 5

    def test_delete_serumproben(self, client):
        barcode_id = "SER_DELETE_001"
        serum_data = generate_serum_data(barcode_id=barcode_id)
        client.post("/new_data/serum", json=serum_data)

        delete_data = {
            "barcode_id": barcode_id,
            "patient_Id_intern": serum_data["patient_Id_intern"],
            "probenart": serum_data["probenart"]
        }
        response = client.request("DELETE", "/delete/serumproben", json=delete_data)
        assert response.status_code == status.HTTP_200_OK
        assert response.json()["message"] == "Successfully deleted"

        # Confirm deletion
        res = client.get("/table/data?table_name=serumproben")
        assert res.status_code == status.HTTP_200_OK
        data = res.json()
        assert not any(item["barcode_id"] == barcode_id for item in data)
