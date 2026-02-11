from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT, FLOAT, TEXT, DATE, VARCHAR
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class Ltx_fragebogen(Base):
    __tablename__ = "ltx_fragebogen"
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    timestamp = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))

    # demographische Daten
    patient_Id_intern = Column(VARCHAR(200), ForeignKey("patient.patient_Id_intern"))
    geschlecht = Column(TEXT)
    alter = Column(Integer)
    gewicht = Column(Integer)
    groesse = Column(Integer)
    beruf = Column(TEXT)

    # sozioökonomische Daten
    kinder_anzahl = Column(Integer)
    krankenversicherung = Column(TEXT)
    epices_score = Column(Integer)
    sozialer_prekaritaetsindex = Column(TEXT)

    # körperliche Aktivität
    bewegung = Column(TEXT)

    # Ernährung
    rotes_fleisch = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    rotes_fleisch_anz = Column(Integer)
    gefluegel = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    gefluegel_anz = Column(Integer)
    verarbeitetes_fleisch = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    verarbeitetes_fleisch_anz = Column(Integer)
    fisch_meeresfruechte = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    fisch_meeresfruechte_anz = Column(Integer)
    eier = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    eier_anz = Column(Integer)
    fruechte_gemuese = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    fruechte_gemuese_anz = Column(Integer)
    staerkehaltige_lebensmittel = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    staerkehaltige_lebensmittel_anz = Column(Integer)
    vollwertkost = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    vollwertkost_anz = Column(Integer)
    huelsenfruechte = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    huelsenfruechte_anz = Column(Integer)
    joghurt = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    joghurt_anz = Column(Integer)
    kaese = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    kaese_anz = Column(Integer)
    milch = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    milch_anz = Column(Integer)
    fruehstueckscerealien = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    fruehstueckscerealien_anz = Column(Integer)
    fettfreie_zuckerhaltige_produkte = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    fettfreie_zuckerhaltige_produkte_anz = Column(Integer)
    fetthaltige_zuckerhaltige_produkte = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    fetthaltige_zuckerhaltige_produkte_anz = Column(Integer)
    fettige_salzige_produkte = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    fettige_salzige_produkte_anz = Column(Integer)
    fette = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    fette_anz = Column(Integer)
    zuckerhaltige_getraenke = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    zuckerhaltige_getraenke_anz = Column(Integer)
    wein = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    wein_anz = Column(Integer)
    bier = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    bier_anz = Column(Integer)
    aperitifs_digestifs = Column(TINYINT, ForeignKey("ltx_fragebogen_ernaerung_lookup.id"))
    aperitifs_digestifs_anz = Column(Integer)

    # Komorbiditäten
    nierenfunktion = Column(TEXT)
    diabetes = Column(TEXT)
    immunsuppression_immunkompetent = Column(TINYINT)
    immunsuppression_HIV_AIDS = Column(TINYINT)
    immunsuppression_solider_krebs = Column(TINYINT)
    immunsuppression_maligne_heamatopathie = Column(TINYINT)
    immunsuppression_organ_knochenmarkstransplantation = Column(TINYINT)
    immunsuppression_neutropenie = Column(TINYINT)
    immunsuppression_angeborene_immunschwaeche = Column(TINYINT)
    immunsuppression_immunsuppessive_therapie = Column(TINYINT)

    multiresistenz_infektion = Column(TEXT)
    antibiotische_behandlung = Column(TEXT)

    antibiotische_therapie_1_name = Column(TEXT)
    antibiotische_therapie_1_zeitraum = Column(TEXT)
    antibiotische_therapie_1_grund = Column(TEXT)
    antibiotische_therapie_2_name = Column(TEXT)
    antibiotische_therapie_2_zeitraum = Column(TEXT)
    antibiotische_therapie_2_grund = Column(TEXT)
    antibiotische_therapie_3_name = Column(TEXT)
    antibiotische_therapie_3_zeitraum = Column(TEXT)
    antibiotische_therapie_3_grund = Column(TEXT)

    langzeit_norfloxacin_prophylaxe = Column(TEXT)
    hospitalisation_vergangenes_jahr = Column(TEXT)
    geburtsort_ausserhalb_deutschlands = Column(TEXT)
    geburtsort_ausserhalb_deutschlands_ort = Column(TEXT)
    auslandsreise_letzte_drei_monate = Column(TEXT)
    auslandsreise_letzte_drei_monate_ort = Column(TEXT)
    auslandsreise_antibiotika = Column(TEXT)
    auslandsreise_durchfall = Column(TEXT)
    auslandsreise_krankenhaus = Column(TEXT)