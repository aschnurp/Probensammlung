from app import schemas
import pytest
from ..config import settings
from jose import jwt

def test_create_user(client):
    res = client.post("/users/", json={"email": "gggtttddd@gmail.com", "password": "password123"})
    print(res.json())
    new_user = schemas.UserOut(**res.json())
    assert res.status_code == 201
    assert new_user.email == "gggtttddd@gmail.com"

def test_login_user(client, test_user):
    res = client.post("/login", data={"username": test_user["email"], "password": test_user["password"]})
    login_res = schemas.Token(**res.json())
    payload = jwt.decode(login_res.access_token, settings.secret_key, algorithms=[settings.algorithm])
    id = payload.get("user_id")
    assert id == test_user["id"]
    assert login_res.token_type == "bearer"
    assert res.status_code == 200

@pytest.mark.parametrize("email, password, status_code", [
    ("wrongemail@gmail.com", "1234", 403),
    ("anton@gmail.de", "1234",403),
    ("anton@gmail.de","123455",403),
    (None,"1234",422),
    ("anton@gmail.de",None,422)
])
def test_incorrect_login(test_user, client, email, password, status_code):
    res = client.post("/login", data={"username": email, "password": password})
    assert res.status_code == status_code