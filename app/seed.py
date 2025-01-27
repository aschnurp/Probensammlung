from sqlalchemy.orm import Session
from .models.status import Status
from .models.uebergeordnete_probenart import Uebergeordnete_probenart
from .models.untergeordnete_probenart_gewebe import Untergeordnete_probenart_gewebe
from .models.untergeordnete_probenart_urin import Untergeordnete_probenart_urin
from .models.untergeordnete_probenart_serum import Untergeordnete_probenart_serum
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
    
    if not db.query(Uebergeordnete_probenart).first():
        # Seed-Daten definieren
        seed_data = [
            Uebergeordnete_probenart(uebergeordnete_probenart_text="Normal"),
            Uebergeordnete_probenart(uebergeordnete_probenart_text="Normal regeneriert"),
            Uebergeordnete_probenart(uebergeordnete_probenart_text="Normal embolisiert"),
            Uebergeordnete_probenart(uebergeordnete_probenart_text="Tumor"),
            Uebergeordnete_probenart(uebergeordnete_probenart_text="Blut"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")

    if not db.query(Untergeordnete_probenart_gewebe).first():
        # Seed-Daten definieren
        seed_data = [
            Untergeordnete_probenart_gewebe(untergeordnete_probenart_text="keine"),
            Untergeordnete_probenart_gewebe(untergeordnete_probenart_text="Paraffinblock"),
            Untergeordnete_probenart_gewebe(untergeordnete_probenart_text="Paraffinblock (A/B)"),
            Untergeordnete_probenart_gewebe(untergeordnete_probenart_text="Trizol"),
            Untergeordnete_probenart_gewebe(untergeordnete_probenart_text="Cryo MF"),
            Untergeordnete_probenart_gewebe(untergeordnete_probenart_text="Cryo SF"),
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

    if not db.query(Untergeordnete_probenart_urin).first():
        # Seed-Daten definieren
        seed_data = [
            Untergeordnete_probenart_urin(untergeordnete_probenart_text="prä"),
            Untergeordnete_probenart_urin(untergeordnete_probenart_text="intra"),
            Untergeordnete_probenart_urin(untergeordnete_probenart_text="post 1d"),
            Untergeordnete_probenart_urin(untergeordnete_probenart_text="post 2d"),
            Untergeordnete_probenart_urin(untergeordnete_probenart_text="post 7d"),
            Untergeordnete_probenart_urin(untergeordnete_probenart_text="post 14d"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")

    if not db.query(Untergeordnete_probenart_serum).first():
        # Seed-Daten definieren
        seed_data = [
            Untergeordnete_probenart_serum(untergeordnete_probenart_text="Serum prä OP"),
            Untergeordnete_probenart_serum(untergeordnete_probenart_text="Serum intra OP peripher A"),
            Untergeordnete_probenart_serum(untergeordnete_probenart_text="Serum intra OP peripher V"),
            Untergeordnete_probenart_serum(untergeordnete_probenart_text="Serum intra OP ZVK"),
            Untergeordnete_probenart_serum(untergeordnete_probenart_text="Serum intra OP LV li."),
            Untergeordnete_probenart_serum(untergeordnete_probenart_text="Serum intra OP LV re."),
            Untergeordnete_probenart_serum(untergeordnete_probenart_text="Serum post OP 1d."),
            Untergeordnete_probenart_serum(untergeordnete_probenart_text="Serum post OP 2d"),
            Untergeordnete_probenart_serum(untergeordnete_probenart_text="Serum post OP 7d"),
            Untergeordnete_probenart_serum(untergeordnete_probenart_text="Serum post OP 14d"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")
    
    else:
        print("Tabelle ist bereits gefüllt. Keine Seed-Daten hinzugefügt.")