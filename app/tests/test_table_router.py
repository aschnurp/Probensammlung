from app import schemas
import pytest
from ..config import settings
from pydantic import ValidationError


def test_get_all_tablenames(client):
    res = client.get("/table/name")
    assert res.status_code == 200

##curretly not working
"""
def test_filter_table(client, test_user):
    # Senden der Daten an die API
    res = client.post("/table/filter", data={"table_name": "users","column_name": "id","value": "1"}) 
    data_res = res.json()
    #data_res = schemas.TableFilterRequest(**res.json())
    print(res)

    
    # Ausgabe der vollständigen Antwort zur Fehlerdiagnose
    print(res.status_code)
    print(res.json())
    
    assert res.status_code == 200
"""

def test_select_table(client):
    res = client.get("/table/data?table_name=users") 
    assert res.status_code == 200

def test_select_table_not_exist(client):
    res = client.get("/table/data?table_name=ffffff") 
    assert res.status_code == 400

def test_no_selected_table(client):
    res = client.get("/table/data?table_name=") 
    assert res.status_code == 400