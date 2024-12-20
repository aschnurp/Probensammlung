# app/tests/conftest.py

import pytest
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient  # Updated import
from app.database import get_db, Base
from app.main import app
from app.config import settings
import json

# Define the test database URL (ensure it's correct and does not append '_test' twice)
SQLALCHEMY_DATABASE_URL = (
    f"mariadb+mariadbconnector://{settings.database_username}:"
    f"{settings.database_password}@{settings.database_hostname}:"
    f"{settings.database_port}/{settings.database_name}?allow_multi_statements=True"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def ensure_test_database():
    """Create the test database if it doesn't exist."""
    try:
        default_engine = create_engine(
            f"mariadb+mariadbconnector://{settings.database_username}:"
            f"{settings.database_password}@{settings.database_hostname}:{settings.database_port}"
        )
        with default_engine.connect() as conn:
            conn.execute(text(f"CREATE DATABASE IF NOT EXISTS {settings.database_name}_test"))
    except Exception as e:
        print(f"Error creating test database: {e}")
        raise

# Ensure the test database exists before setting up fixtures
ensure_test_database()

@pytest.fixture(scope="session")
def test_engine():
    """Create the database engine for testing."""
    return engine

@pytest.fixture(scope="session")
def tables(test_engine):
    """Create all tables before tests and drop them after."""
    Base.metadata.drop_all(bind=test_engine)
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)

@pytest.fixture(scope="function")
def session(test_engine, tables):
    """Create a new database session for a test."""
    connection = test_engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)

    try:
        # Seed initial data
        session.execute(
            text(
                """
                INSERT INTO status (id, status_text)
                VALUES
                    (1, 'Eingeschleust'),
                    (2, 'Ausschleust'),
                    (3, 'Wiedereingeschleust');
                """
            )
        )

        # Insert a sample patient
        session.execute(
            text(
                """
                INSERT INTO patient (patient_Id_intern, sap_id, created_at, geschlecht, `alter`, op_diagnose, op_geplant, bemerkung)
                VALUES ('00000', 1, '2024-01-01 00:00:00', 'männlich', 30, 'Test Diagnose', 'Test OP', 'Keine');
                """
            )
        )

        session.commit()
        yield session
    finally:
        session.close()
        transaction.rollback()
        connection.close()

@pytest.fixture()
def client(session):
    """Provide a TestClient that uses the testing session."""
    def override_get_db():
        try:
            yield session
        finally:
            session.close()

@pytest.fixture()
def client(session):
    """Provide a TestClient that uses the testing session."""
    def override_get_db():
        try:
            yield session
        finally:
            session.close()

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


######## test data ########

@pytest.fixture()
def serum_data():
    return {
        "barcode_id": "1234",
        "patient_Id_intern": "00000",
        "created_at": "2024-04-27",
        "probenart": "Serum",
        "uebergeordete_probenart": 1,
        "untergeordete_probenart": 1,
        "boxnummer": 1, 
        "boxzeile": "A",
        "boxspalte": 3,
        "lagerraum": "1027",
        "anmerkungen": "Keine",
        "remarks": "Keine",
        "status": 1
    }

@pytest.fixture()
def serum_data_invlaid():
    return {
        "patient_Id_intern": "00000",
        "created_at": "2024-04-27",
        "probenart": "Serum",
        "uebergeordete_probenart": 1,
        "untergeordete_probenart": 1,
        "boxnummer": 1, 
        "boxzeile": "A",
        "boxspalte": 3,
        "lagerraum": "1027",
        "anmerkungen": "Keine",
        "remarks": "Keine",
        "status": 1
    }


@pytest.fixture()
def patient_data():
    return {
        "sap_id":1,
        "patient_Id_intern": "123",
        "created_at": "2024-04-27",
        "geschlecht": "weiblich",
        "alter":  22,
        "op_diagnose": "text",
        "op_geplant": "text",
        "bemerkung": "text"
    }

@pytest.fixture()
def patient_data_double():
    return {
        "sap_id":1,
        "patient_Id_intern": "00000",
        "created_at": "2024-04-27",
        "geschlecht": "weiblich",
        "alter":  22,
        "op_diagnose": "text",
        "op_geplant": "text",
        "bemerkung": "text"
    }

