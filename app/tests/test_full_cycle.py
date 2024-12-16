# app/tests/test_full_cycle.py

import pytest
from fastapi import status
from app.tests.utils import (
    generate_serum_data,
    generate_gewebe_data,
    generate_urin_data,
    generate_paraffin_data,
    generate_patient_data
)

class TestFullCycle:
    def test_full_process(self, client):
        # 1. Create a new patient
        patient_data = generate_patient_data(
            patient_id="PAT_FULLCYCLE",
            sap_id=9999,
            geschlecht="männlich",
            alter=50,
            op_diagnose="Full cycle test",
            op_geplant="Test OP",
            bemerkung="Cycle remark",
            created_at="2024-05-01 10:00:00"
        )
        res = client.post("/new_data/patient", json=patient_data)
        assert res.status_code == status.HTTP_201_CREATED, f"Patient creation failed: {res.status_code}, {res.json()}"

        # 2. Create multiple Proben
        proben = {
            "serum": generate_serum_data(barcode_id="SER_FULLCYCLE_001", patient_id="PAT_FULLCYCLE"),
            "gewebe": generate_gewebe_data(barcode_id="GEW_FULLCYCLE_001", patient_id="PAT_FULLCYCLE"),
            "urin": generate_urin_data(barcode_id="URIN_FULLCYCLE_001", patient_id="PAT_FULLCYCLE"),
            "paraffin": generate_paraffin_data(patient_id="PAT_FULLCYCLE")
        }

        for proben_type, data in proben.items():
            res = client.post(f"/new_data/{proben_type}", json=data)
            if res.status_code != status.HTTP_201_CREATED:
                print(f"Failed to create {proben_type}proben: {res.status_code}, {res.json()}")
            assert res.status_code == status.HTTP_201_CREATED, f"Creation failed for {proben_type}proben: {res.status_code}, {res.json()}"
            if proben_type == "paraffin":
                created_paraffin = res.json()
                proben["paraffin"]["id"] = created_paraffin["id"]

        # 3. Verify insertion for each Proben type
        for proben_type, data in proben.items():
            table_name = f"{proben_type}proben"
            if proben_type == "paraffin":
                table_name = "paraffinproben"
            res = client.get(f"/table/data?table_name={table_name}")
            if res.status_code != status.HTTP_200_OK:
                print(f"Failed to retrieve {proben_type}proben: {res.status_code}, {res.json()}")
            assert res.status_code == status.HTTP_200_OK, f"Retrieval failed for {proben_type}proben: {res.status_code}, {res.json()}"
            table_data = res.json()

            if proben_type != "paraffin":
                assert any(item["barcode_id"] == data["barcode_id"] for item in table_data), f"{proben_type}proben with barcode_id {data['barcode_id']} not found."
            else:
                # For paraffin, ensure the entry exists by id
                assert any(item["id"] == data["id"] for item in table_data), f"paraffinproben with id {data['id']} not found."

        # 4. Update status for serum, gewebe, urin (paraffin doesn't have a barcode_id)
        for proben_type, data in proben.items():
            if proben_type != "paraffin":
                barcode_id = data["barcode_id"]
                # Ausschleusen
                res = client.patch(f"/ausschleusen/{proben_type}/{barcode_id}")
                if res.status_code != status.HTTP_200_OK:
                    print(f"Failed to ausschleusen {proben_type}proben: {res.status_code}, {res.json()}")
                assert res.status_code == status.HTTP_200_OK, f"Ausschleusen failed for {proben_type}proben: {res.status_code}, {res.json()}"
                updated_item = res.json()
                assert updated_item["status"] == 2, f"Expected status 2 after ausschleusen, got {updated_item['status']}."

                # Wiedereinschleusen
                res = client.patch(f"/wiedereingeschleusen/{proben_type}/{barcode_id}")
                if res.status_code != status.HTTP_200_OK:
                    print(f"Failed to wiedereinschleusen {proben_type}proben: {res.status_code}, {res.json()}")
                assert res.status_code == status.HTTP_200_OK, f"Wiedereinschleusen failed for {proben_type}proben: {res.status_code}, {res.json()}"
                updated_item = res.json()
                assert updated_item["status"] == 3, f"Expected status 3 after wiedereinschleusen, got {updated_item['status']}."

        # 5. Update details
        # For paraffinproben, use the actual id
        updated_proben = {
            "serum": {
                "barcode_id": "SER_FULLCYCLE_001",
                "patient_Id_intern": "PAT_FULLCYCLE",
                "created_at": "2024-05-01 11:00:00",
                "probenart": "Serum",
                "boxnummer": 2,
                "boxzeile": "B",
                "boxspalte": 2,
                "lagerraum": "A2",
                "anmerkungen": "Updated entry",
                "remarks": "Updated remarks",
                "size": "30ml",
                "status": 3
            },
            "gewebe": {
                "barcode_id": "GEW_FULLCYCLE_001",
                "patient_Id_intern": "PAT_FULLCYCLE",
                "created_at": "2024-05-01 12:00:00",
                "probenart": "Gewebe",
                "abholer": "Dr. Muster",
                "uhrzeit": "15:00",
                "boxnummer": 3,
                "boxzeile": "C",
                "boxspalte": 3,
                "lagerraum": "B3",
                "anmerkungen": "Updated Gewebe",
                "remarks": "Updated remarks",
                "status": 3
            },
            "urin": {
                "barcode_id": "URIN_FULLCYCLE_001",
                "patient_Id_intern": "PAT_FULLCYCLE",
                "created_at": "2024-05-01 14:00:00",
                "probenart": "Urin",
                "boxnummer": 4,
                "boxzeile": "D",
                "boxspalte": 4,
                "lagerraum": "F6",
                "anmerkungen": "Updated Urin",
                "status": 3
            },
            "paraffin": {
                "id": proben["paraffin"]["id"],  # Use captured id
                "patient_Id_intern": "PAT_FULLCYCLE",
                "probenart": "Paraffin",
                "lagerraum": "H8",
                "anmerkungen": "Updated Paraffin",
                "created_at": "2024-05-01 17:00:00",
                "status": 3
            }
        }

        for proben_type, updated_data in updated_proben.items():
            res = client.put(f"/update/{proben_type}proben", json=updated_data)
            if res.status_code != status.HTTP_201_CREATED:
                print(f"Failed to update {proben_type}proben: {res.status_code}, {res.json()}")
            assert res.status_code == status.HTTP_201_CREATED, f"Update failed for {proben_type}proben: {res.status_code}, {res.json()}"
            updated_item = res.json()
            assert updated_item["status"] == 3, f"Expected status 3 after update, got {updated_item['status']}."
            if proben_type == "paraffin":
                assert updated_item["lagerraum"] == "H8", f"Expected lagerraum 'H8', got {updated_item['lagerraum']}."

        # 6. Check counts
        for proben_type in proben.keys():
            res = client.get(f"/number/{proben_type}proben")
            if res.status_code != status.HTTP_201_CREATED:
                print(f"Failed to get count for {proben_type}proben: {res.status_code}, {res.json()}")
            assert res.status_code == status.HTTP_201_CREATED, f"Count retrieval failed for {proben_type}proben: {res.status_code}, {res.json()}"
            count = res.json()
            assert count == 1, f"Expected count 1 for {proben_type}proben, got {count}."

        # 7. Delete entries
        for proben_type, data in proben.items():
            if proben_type != "paraffin":
                delete_data = {
                    "barcode_id": data["barcode_id"],
                    "patient_Id_intern": data["patient_Id_intern"],
                    "probenart": data["probenart"]
                }
                res = client.request("DELETE", f"/delete/{proben_type}proben", json=delete_data)
            else:
                delete_data = {
                         "id": data["id"],
                        "patient_Id_intern": data["patient_Id_intern"],
                        "probenart": data["probenart"]
                }
                res = client.request("DELETE", "/delete/paraffinproben", json=delete_data)


            if res.status_code != status.HTTP_200_OK:
                print(f"Failed to delete {proben_type}proben: {res.status_code}, {res.json()}")
            assert res.status_code == status.HTTP_200_OK, f"Deletion failed for {proben_type}proben: {res.status_code}, {res.json()}"
            assert res.json()["message"] == "Successfully deleted", f"Unexpected deletion message for {proben_type}proben: {res.json()['message']}"

        # 8. Delete patient
        delete_patient_data = {"patient_Id_intern": "PAT_FULLCYCLE"}
        res = client.request("DELETE", "/delete/patient", json=delete_patient_data)
        if res.status_code != status.HTTP_200_OK:
            print(f"Failed to delete patient: {res.status_code}, {res.json()}")
        assert res.status_code == status.HTTP_200_OK, f"Patient deletion failed: {res.status_code}, {res.json()}"
        assert res.json()["message"] == "Successfully deleted", f"Unexpected patient deletion message: {res.json()['message']}"

        # 9. Confirm all deletions
        for proben_type, data in proben.items():
            table_name = f"{proben_type}proben"
            if proben_type == "paraffin":
                table_name = "paraffinproben"
            res = client.get(f"/table/data?table_name={table_name}")
            if res.status_code != status.HTTP_200_OK:
                print(f"Failed to retrieve {proben_type}proben: {res.status_code}, {res.json()}")
            assert res.status_code == status.HTTP_200_OK, f"Retrieval failed for {proben_type}proben: {res.status_code}, {res.json()}"
            data = res.json()
            if proben_type != "paraffin":
                assert not any(item["barcode_id"] == proben[proben_type]["barcode_id"] for item in data), f"{proben_type}proben with barcode_id {proben[proben_type]['barcode_id']} still exists."
            else:
                assert not any(item["id"] == proben["paraffin"]["id"] for item in data), f"paraffinproben with id {proben['paraffin']['id']} still exists."

        # Confirm patient deletion
        res = client.get("/table/data?table_name=patient")
        if res.status_code != status.HTTP_200_OK:
            print(f"Failed to retrieve patient data: {res.status_code}, {res.json()}")
        assert res.status_code == status.HTTP_200_OK, f"Patient data retrieval failed: {res.status_code}, {res.json()}"
        data = res.json()
        assert not any(p["patient_Id_intern"] == "PAT_FULLCYCLE" for p in data), "Patient PAT_FULLCYCLE still exists."
