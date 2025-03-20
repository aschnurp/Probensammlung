from sqlalchemy.orm import Session
from .models.status import Status
from .models.differenzierungsmerkmal_gewebe import Differenzierungsmerkmal_gewebe
from .models.differenzierungsmerkmal_serum import Differenzierungsmerkmal_serum

from .models.differenzierungsmerkmal_urin import Differenzierungsmerkmal_urin
from .models.uebergeordnete_probenart_paraffin import Uebergeordnete_probenart_paraffin

from .models.probeninformation import Probeninformation
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


    if not db.query(Probeninformation).first():
        seed_data = [
            Probeninformation(probeninformation_text="Serum prä OP I", probenart="serum"),  
            Probeninformation(probeninformation_text="Serum prä OP II", probenart="serum"),
            Probeninformation(probeninformation_text="Serum prä OP III", probenart="serum"),
            Probeninformation(probeninformation_text="Serum prä OP IV", probenart="serum"),
            Probeninformation(probeninformation_text="Urin prä OP I", probenart="urin"),  
            Probeninformation(probeninformation_text="Urin prä OP II", probenart="urin"),
            Probeninformation(probeninformation_text="Urin prä OP III", probenart="urin"),
            Probeninformation(probeninformation_text="Urin prä OP IV", probenart="urin"),
            Probeninformation(probeninformation_text="Normal Cryo I (MF)", probenart="gewebe"),
            Probeninformation(probeninformation_text="Normal Cryo II (SF)", probenart="gewebe"),
            Probeninformation(probeninformation_text="Normal Cryo III (SF)", probenart="gewebe"),
            Probeninformation(probeninformation_text="Normal Cryo IV (SF)", probenart="gewebe"),
            Probeninformation(probeninformation_text="Normal Cryo V (SF)", probenart="gewebe"),
            Probeninformation(probeninformation_text="Normal Cryo VI (SF)", probenart="gewebe"),
            Probeninformation(probeninformation_text="Normal Trizol", probenart="gewebe"),
            Probeninformation(probeninformation_text="Tumor Cryo I (MF)", probenart="gewebe"),
            Probeninformation(probeninformation_text="Tumor Cryo II (SF)", probenart="gewebe"),
            Probeninformation(probeninformation_text="Tumor Cryo III (SF)", probenart="gewebe"),
            Probeninformation(probeninformation_text="Tumor Cryo IV (SF)", probenart="gewebe"),
            Probeninformation(probeninformation_text="Tumor Cryo V (SF)", probenart="gewebe"),
            Probeninformation(probeninformation_text="Tumor Cryo VI (SF)", probenart="gewebe"),
            Probeninformation(probeninformation_text="Tumor Trizol", probenart="gewebe"),
            Probeninformation(probeninformation_text="Serum intra OP I", probenart="serum"),
            Probeninformation(probeninformation_text="Serum intra OP II", probenart="serum"),
            Probeninformation(probeninformation_text="Serum intra OP III", probenart="serum"),
            Probeninformation(probeninformation_text="Serum intra OP IV", probenart="serum"),
            Probeninformation(probeninformation_text="Serum post OP 1d I", probenart="serum"),
            Probeninformation(probeninformation_text="Serum post OP 1d II", probenart="serum"),
            Probeninformation(probeninformation_text="Serum post OP 1d III", probenart="serum"),
            Probeninformation(probeninformation_text="Serum post OP 1d IV", probenart="serum"),
            Probeninformation(probeninformation_text="Serum post OP 2d I", probenart="serum"),
            Probeninformation(probeninformation_text="Serum post OP 2d II", probenart="serum"),
            Probeninformation(probeninformation_text="Serum post OP 2d III", probenart="serum"),
            Probeninformation(probeninformation_text="Serum post OP 2d IV", probenart="serum"),
            Probeninformation(probeninformation_text="Serum post OP 7d I", probenart="serum"),
            Probeninformation(probeninformation_text="Serum post OP 7d II", probenart="serum"),
            Probeninformation(probeninformation_text="Serum post OP 7d III", probenart="serum"),
            Probeninformation(probeninformation_text="Serum post OP 7d IV", probenart="serum"),
            Probeninformation(probeninformation_text="Serum post OP 14d I", probenart="serum"),
            Probeninformation(probeninformation_text="Serum post OP 14d II", probenart="serum"),
            Probeninformation(probeninformation_text="Serum post OP 14d III", probenart="serum"),
            Probeninformation(probeninformation_text="Serum post OP 14d IV", probenart="serum"),
            Probeninformation(probeninformation_text="Urin intra OP I", probenart="urin"),
            Probeninformation(probeninformation_text="Urin intra OP II", probenart="urin"),
            Probeninformation(probeninformation_text="Urin intra OP III", probenart="urin"),
            Probeninformation(probeninformation_text="Urin intra OP IV", probenart="urin"),
            Probeninformation(probeninformation_text="Urin post OP 1d I", probenart="urin"),
            Probeninformation(probeninformation_text="Urin post OP 1d II", probenart="urin"),
            Probeninformation(probeninformation_text="Urin post OP 1d III", probenart="urin"),
            Probeninformation(probeninformation_text="Urin post OP 1d IV", probenart="urin"),
            Probeninformation(probeninformation_text="Urin post OP 2d I", probenart="urin"),
            Probeninformation(probeninformation_text="Urin post OP 2d II", probenart="urin"),
            Probeninformation(probeninformation_text="Urin post OP 2d III", probenart="urin"),
            Probeninformation(probeninformation_text="Urin post OP 2d IV", probenart="urin"),
            Probeninformation(probeninformation_text="Urin post OP 7d I", probenart="urin"),
            Probeninformation(probeninformation_text="Urin post OP 7d II", probenart="urin"),
            Probeninformation(probeninformation_text="Urin post OP 7d III", probenart="urin"),
            Probeninformation(probeninformation_text="Urin post OP 7d IV", probenart="urin"),
            Probeninformation(probeninformation_text="Urin post OP 14d I", probenart="urin"),
            Probeninformation(probeninformation_text="Urin post OP 14d II", probenart="urin"),
            Probeninformation(probeninformation_text="Urin post OP 14d III", probenart="urin"),
            Probeninformation(probeninformation_text="Urin post OP 14d IV", probenart="urin"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")

    
    if not db.query(Differenzierungsmerkmal_gewebe).first():
        # Seed-Daten definieren
        seed_data = [
            Differenzierungsmerkmal_gewebe(differenzierungsmerkmal_text="Regeneriert"),            
            Differenzierungsmerkmal_gewebe(differenzierungsmerkmal_text="Embolisiert"),
            Differenzierungsmerkmal_gewebe(differenzierungsmerkmal_text="Normal Empfänger"),
            Differenzierungsmerkmal_gewebe(differenzierungsmerkmal_text="Spender"),
            Differenzierungsmerkmal_gewebe(differenzierungsmerkmal_text="Spender nach Perfusion"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")


    if not db.query(Differenzierungsmerkmal_serum).first():
        # Seed-Daten definieren
        seed_data = [
            Differenzierungsmerkmal_serum(differenzierungsmerkmal_text="Lebervene Links"),            
            Differenzierungsmerkmal_serum(differenzierungsmerkmal_text="Lebervene Rechts"),
            Differenzierungsmerkmal_serum(differenzierungsmerkmal_text="ZVK"),
            Differenzierungsmerkmal_serum(differenzierungsmerkmal_text="Vene peripher"),
            Differenzierungsmerkmal_serum(differenzierungsmerkmal_text="Arterie peripher"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")



    if not db.query(Differenzierungsmerkmal_urin).first():
        # Seed-Daten definieren
        seed_data = [
            Differenzierungsmerkmal_urin(differenzierungsmerkmal_text="Katheter"),
            Differenzierungsmerkmal_urin(differenzierungsmerkmal_text="Spontan"),
        ]
        # Einfügen und speichern
        db.add_all(seed_data)
        db.commit()
        print("Seed-Daten erfolgreich hinzugefügt.")


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