from sqlalchemy.orm import Session
from .models.status import Status
from .models.uebergeordnete_probenart_gewebe import Uebergeordnete_probenart_gewebe
from .models.uebergeordnete_probenart_urin import Uebergeordnete_probenart_urin
from .models.uebergeordnete_probenart_paraffin import Uebergeordnete_probenart_paraffin

from .models.untergeordnete_probenart_gewebe import Untergeordnete_probenart_gewebe
from .models.untergeordnete_probenart_urin import Untergeordnete_probenart_urin
from .models.untergeordnete_probenart_serum import Untergeordnete_probenart_serum
from .models.untergeordnete_probenart_paraffin import Untergeordnete_probenart_paraffin
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
    
    if not db.query(Uebergeordnete_probenart_gewebe).first():
        # Seed-Daten definieren
        seed_data = [
            Uebergeordnete_probenart_gewebe(uebergeordnete_probenart_text="Normal"),
            Uebergeordnete_probenart_gewebe(uebergeordnete_probenart_text="Normal regeneriert"),            
            Uebergeordnete_probenart_gewebe(uebergeordnete_probenart_text="Normal embolisiert"),
            Uebergeordnete_probenart_gewebe(uebergeordnete_probenart_text="Normal Empfängerleber"),
            Uebergeordnete_probenart_gewebe(uebergeordnete_probenart_text="Normal Spender der Leber"),
            Uebergeordnete_probenart_gewebe(uebergeordnete_probenart_text="Normal Spender nach Perfusion der Leber"),
            Uebergeordnete_probenart_gewebe(uebergeordnete_probenart_text="Tumor"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")

    if not db.query(Untergeordnete_probenart_gewebe).first():
        # Seed-Daten definieren
        seed_data = [
            Untergeordnete_probenart_gewebe(untergeordnete_probenart_text="keine"),
            Untergeordnete_probenart_gewebe(untergeordnete_probenart_text="Trizol"),
            Untergeordnete_probenart_gewebe(untergeordnete_probenart_text="Cryo MF"),
            Untergeordnete_probenart_gewebe(untergeordnete_probenart_text="Cryo SF"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")

    if not db.query(Uebergeordnete_probenart_urin).first():
        # Seed-Daten definieren
        seed_data = [
            Uebergeordnete_probenart_urin(uebergeordnete_probenart_text="Katheter"),
            Uebergeordnete_probenart_urin(uebergeordnete_probenart_text="Spontan"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")

    if not db.query(Untergeordnete_probenart_urin).first():
        # Seed-Daten definieren
        seed_data = [
            Untergeordnete_probenart_urin(untergeordnete_probenart_text="prä OP"),
            Untergeordnete_probenart_urin(untergeordnete_probenart_text="intra OP"),
            Untergeordnete_probenart_urin(untergeordnete_probenart_text="post OP 1d"),
            Untergeordnete_probenart_urin(untergeordnete_probenart_text="post OP 2d"),
            Untergeordnete_probenart_urin(untergeordnete_probenart_text="post OP 7d"),
            Untergeordnete_probenart_urin(untergeordnete_probenart_text="post OP 14d"),
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

    if not db.query(Untergeordnete_probenart_paraffin).first():
        # Seed-Daten definieren
        seed_data = [
            Untergeordnete_probenart_paraffin(untergeordnete_probenart_text="Paraffinblock"),
            Untergeordnete_probenart_paraffin(untergeordnete_probenart_text="Paraffinblock (A/B)"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")
    
    else:
        print("Tabelle ist bereits gefüllt. Keine Seed-Daten hinzugefügt.")


    if not db.query(Uebergeordnete_probenart_paraffin).first():
        # Seed-Daten definieren
        seed_data = [
            Uebergeordnete_probenart_paraffin(uebergeordnete_probenart_text="Normal"),
            Uebergeordnete_probenart_paraffin(uebergeordnete_probenart_text="Normal regeneriert"),            
            Uebergeordnete_probenart_paraffin(uebergeordnete_probenart_text="Normal embolisiert"),
            Uebergeordnete_probenart_paraffin(uebergeordnete_probenart_text="Normal Empfängerleber"),
            Uebergeordnete_probenart_paraffin(uebergeordnete_probenart_text="Normal Spender der Leber"),
            Uebergeordnete_probenart_paraffin(uebergeordnete_probenart_text="Normal Spender nach Perfusion der Leber"),
            Uebergeordnete_probenart_paraffin(uebergeordnete_probenart_text="Tumor"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")
    
    else:
        print("Tabelle ist bereits gefüllt. Keine Seed-Daten hinzugefügt.")