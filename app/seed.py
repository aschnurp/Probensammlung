from sqlalchemy.orm import Session
from .models.status import Status
from .models.uebergeordete_probenart import Uebergeordete_probenart
from .models.untergeordete_probenart_gewebe import Untergeordete_probenart_gewebe
from .models.untergeordete_probenart_urin import Untergeordete_probenart_urin
from .models.untergeordete_probenart_serum import Untergeordete_probenart_serum
from .models.probenquelle_urin import Probenquelle_urin
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
    
    if not db.query(Uebergeordete_probenart).first():
        # Seed-Daten definieren
        seed_data = [
            Uebergeordete_probenart(uebergeordete_probenart_text="Normal"),
            Uebergeordete_probenart(uebergeordete_probenart_text="Normal regeneriert"),
            Uebergeordete_probenart(uebergeordete_probenart_text="Normal embolisiert"),
            Uebergeordete_probenart(uebergeordete_probenart_text="Tumor"),
            Uebergeordete_probenart(uebergeordete_probenart_text="Blut"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")

    if not db.query(Untergeordete_probenart_gewebe).first():
        # Seed-Daten definieren
        seed_data = [
            Untergeordete_probenart_gewebe(untergeordete_probenart_text="keine"),
            Untergeordete_probenart_gewebe(untergeordete_probenart_text="Paraffinblock"),
            Untergeordete_probenart_gewebe(untergeordete_probenart_text="Paraffinblock (A/B)"),
            Untergeordete_probenart_gewebe(untergeordete_probenart_text="Trizol"),
            Untergeordete_probenart_gewebe(untergeordete_probenart_text="Cryo MF"),
            Untergeordete_probenart_gewebe(untergeordete_probenart_text="Cryo SF"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")

    if not db.query(Probenquelle_urin).first():
        # Seed-Daten definieren
        seed_data = [
            Probenquelle_urin(probenquelle_text="Katheter"),
            Probenquelle_urin(probenquelle_text="Spontan"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")

    if not db.query(Untergeordete_probenart_urin).first():
        # Seed-Daten definieren
        seed_data = [
            Untergeordete_probenart_urin(untergeordete_probenart_text="prä"),
            Untergeordete_probenart_urin(untergeordete_probenart_text="intra"),
            Untergeordete_probenart_urin(untergeordete_probenart_text="post 1d"),
            Untergeordete_probenart_urin(untergeordete_probenart_text="post 2d"),
            Untergeordete_probenart_urin(untergeordete_probenart_text="post 7d"),
            Untergeordete_probenart_urin(untergeordete_probenart_text="post 14d"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")

    if not db.query(Untergeordete_probenart_serum).first():
        # Seed-Daten definieren
        seed_data = [
            Untergeordete_probenart_serum(untergeordete_probenart_text="Serum prä OP"),
            Untergeordete_probenart_serum(untergeordete_probenart_text="Serum intra OP peripher A"),
            Untergeordete_probenart_serum(untergeordete_probenart_text="Serum intra OP peripher V"),
            Untergeordete_probenart_serum(untergeordete_probenart_text="Serum intra OP ZVK"),
            Untergeordete_probenart_serum(untergeordete_probenart_text="Serum intra OP LV li."),
            Untergeordete_probenart_serum(untergeordete_probenart_text="Serum intra OP LV re."),
            Untergeordete_probenart_serum(untergeordete_probenart_text="Serum post OP 1d."),
            Untergeordete_probenart_serum(untergeordete_probenart_text="Serum post OP 2d"),
            Untergeordete_probenart_serum(untergeordete_probenart_text="Serum post OP 7d"),
            Untergeordete_probenart_serum(untergeordete_probenart_text="Serum post OP 14d"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")
    
    else:
        print("Tabelle ist bereits gefüllt. Keine Seed-Daten hinzugefügt.")