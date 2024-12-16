# app/tests/test_patient.py

import pytest
from fastapi import status
from app.schemas import TableDatapatient
from app.tests.utils import generate_patient_data

class TestPatient:
    @pytest.mark.parametrize(
        "patient_id, sap_id, geschlecht, alter, op_diagnose, op_geplant, bemerkung",
        [
            ("PAT_TEST_001", 1001, "männlich", 40, "Diagnose X", "OP Y", "Keine"),
            ("PAT_TEST_002", 1002, "weiblich", 35, "Diagnose Y", "OP Z", "Bemerkung"),
            ("PAT_TEST_003", 1003, "männlich", 50, "Diagnose Z", "OP A", "Keine"),
        ]
    )
    def test_create_patient_multiple(self, client, patient_id, sap_id, geschlecht, alter, op_diagnose, op_geplant, bemerkung):
        patient_data = generate_patient_data(
            patient_id=patient_id,
            sap_id=sap_id,
            geschlecht=geschlecht,
            alter=alter,
            op_diagnose=op_diagnose,
            op_geplant=op_geplant,
            bemerkung=bemerkung
        )
        response = client.post("/new_data/patient", json=patient_data)
        assert response.status_code == status.HTTP_201_CREATED
        created_patient = TableDatapatient(**response.json())
        assert created_patient.patient_Id_intern == patient_data["patient_Id_intern"]
        assert created_patient.sap_id == patient_data["sap_id"]
        assert created_patient.geschlecht == patient_data["geschlecht"]
        assert created_patient.alter == patient_data["alter"]
        assert created_patient.op_diagnose == patient_data["op_diagnose"]
        assert created_patient.op_geplant == patient_data["op_geplant"]
        assert created_patient.bemerkung == patient_data["bemerkung"]

    def test_create_patient_duplicate(self, client):
        patient_id = "PAT_DUPLICATE"
        patient_data = generate_patient_data(patient_id=patient_id, sap_id=2002)
        response1 = client.post("/new_data/patient", json=patient_data)
        assert response1.status_code == status.HTTP_201_CREATED

        response2 = client.post("/new_data/patient", json=patient_data)
        assert response2.status_code == status.HTTP_403_FORBIDDEN
        assert response2.json()["detail"] == f"entery with barcode_id: {patient_id} already exists"

    def test_create_patient_missing_fields(self, client):
        # Missing 'patient_Id_intern'
        patient_data = {
            "sap_id": 3003,
            "created_at": "2024-05-01 10:00:00",
            "geschlecht": "weiblich",
            "alter": 30,
            "op_diagnose": "Diagnose A",
            "op_geplant": "OP B",
            "bemerkung": "Keine"
        }
        response = client.post("/new_data/patient", json=patient_data)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        assert any("patient_Id_intern" in str(error["loc"]) for error in response.json()["detail"])

    def test_create_patient_invalid_data_types(self, client):
        # Invalid 'sap_id' and 'alter' types
        patient_data = generate_patient_data(
            patient_id="PAT_INVALID_TYPE",
            sap_id="invalid_sap_id",
            alter="thirty"
        )
        response = client.post("/new_data/patient", json=patient_data)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        assert any("sap_id" in str(error["loc"]) for error in response.json()["detail"])
        assert any("alter" in str(error["loc"]) for error in response.json()["detail"])

    def test_create_patient_exceeding_field_limits(self, client):
        # Assuming 'patient_Id_intern' has a maximum length of 200 characters
        patient_data = generate_patient_data(
            patient_id="P" * 201,
            sap_id=4004
        )
        response = client.post("/new_data/patient", json=patient_data)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        assert any("patient_Id_intern" in str(error["loc"]) for error in response.json()["detail"])

    def test_create_patient_sql_injection(self, client):
        # Attempt SQL injection via 'patient_Id_intern'
        patient_data = generate_patient_data(
            patient_id="PAT'; DROP TABLE patient;--",
            sap_id=5005
        )
        response = client.post("/new_data/patient", json=patient_data)
        # The response should not execute the injection; depends on ORM security
        assert response.status_code in [status.HTTP_201_CREATED, status.HTTP_400_BAD_REQUEST, status.HTTP_422_UNPROCESSABLE_ENTITY]

    def test_update_patient(self, client):
        patient_id = "PAT_UPDATE_001"
        patient_data = generate_patient_data(patient_id=patient_id, sap_id=6006)
        client.post("/new_data/patient", json=patient_data)

        # Update patient details
        updated_patient_data = generate_patient_data(
            patient_id=patient_id,
            sap_id=6006,
            geschlecht="weiblich",
            alter=35,
            op_diagnose="Updated Diagnose",
            op_geplant="Updated OP",
            bemerkung="Updated Remark",
            created_at="2024-05-01 18:00:00"
        )
        response = client.put("/update/patient", json=updated_patient_data)
        assert response.status_code == status.HTTP_201_CREATED
        updated_item = response.json()
        assert updated_item["geschlecht"] == "weiblich"
        assert updated_item["alter"] == 35
        assert updated_item["op_diagnose"] == "Updated Diagnose"
        assert updated_item["op_geplant"] == "Updated OP"
        assert updated_item["bemerkung"] == "Updated Remark"

    def test_delete_patient(self, client):
        patient_id = "PAT_DELETE_001"
        patient_data = generate_patient_data(patient_id=patient_id, sap_id=7007)
        client.post("/new_data/patient", json=patient_data)

        # Delete patient entry
        delete_data = {"patient_Id_intern": patient_id}
        response = client.request("DELETE", "/delete/patient", json=delete_data)
        assert response.status_code == status.HTTP_200_OK
        assert response.json()["message"] == "Successfully deleted"

        # Confirm deletion
        res = client.get("/table/data?table_name=patient")
        assert res.status_code == status.HTTP_200_OK
        data = res.json()
        assert not any(p["patient_Id_intern"] == patient_id for p in data)
