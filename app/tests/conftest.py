from fastapi.testclient import TestClient
from app.main import app
from app.config import settings
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.database import get_db, Base
import pytest

# Insert a different test database
SQLALCHEMY_DATABASE_URL = f"mariadb+mariadbconnector://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}?allow_multi_statements=True"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture()
def session():
    # Drop all tables, recreate them, and seed initial data
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()

    try:
        # Insert into `status` table
        db.execute(
            text(
                """
                INSERT INTO status (id)
                VALUES (1);
                """
            )
        )

        # Insert into `patient` table
        db.execute(
            text(
                """
                INSERT INTO patient (patient_Id_intern, sap_id, created_at, geschlecht, `alter`, op_diagnose, op_geplant, bemerkung)
                VALUES ('00000', 1, '2024-01-01 00:00:00', 'männlich', 30, 'Test Diagnose', 'Test OP', 'Keine');
                """
            )
        )

        yield db
    finally:
        db.close()


@pytest.fixture()
def client(session):
    def override_get_db():
        try:
            yield session
        finally:
            session.close()

    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)


@pytest.fixture
def test_user(client, session):
    user_data = {"email": "gggtttddd@gmail.com", "password": "password123"}
    res = client.post("/users/", json=user_data)

    assert res.status_code == 201
    new_user = res.json()
    new_user["password"] = user_data["password"]
    return new_user
