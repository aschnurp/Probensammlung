from sqlalchemy.orm import Session
from .models.status import Status
from . database import get_db, Base
from sqlalchemy.orm import Session


def seed_status_data(db: Session):
    # Prüfen, ob bereits Einträge in der Tabelle vorhanden sind
    if not db.query(Status).first():
        # Seed-Daten definieren
        seed_data = [
            Status(status_text="eingeschleust"),
            Status(status_text="ausgeschleust"),
            Status(status_text="wiedereingeschleust"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")
    else:
        print("Tabelle ist bereits gefüllt. Keine Seed-Daten hinzugefügt.")