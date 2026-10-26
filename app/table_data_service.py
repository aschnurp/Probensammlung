from fastapi import HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session

EDTAPLASMA_PROBEN_QUERY = """
SELECT
edtaplasmaproben.barcode_id AS barcode_id,
edtaplasmaproben.timestamp AS zeitstempel,
edtaplasmaproben.patient_Id_intern AS patient_id_intern,
edtaplasmaproben.created_at AS erstellungsdatum,
edtaplasmaproben.abholer AS abholer,
edtaplasmaproben.uhrzeit AS probe_erhalten_uhrzeit,
edtaplasmaproben.probenart AS probenart,
probeninformation_ltx.probeninformation_text AS probeninformation_ltx_text,
differenzierungsmerkmal_edtaplasma.differenzierungsmerkmal_text AS differenzierungsmerkmal,
edtaplasmaproben.boxnummer AS boxname_boxnummer,
edtaplasmaproben.boxzeile AS boxzeile,
edtaplasmaproben.boxspalte AS boxspalte,
edtaplasmaproben.lagerraum AS lagerraum,
edtaplasmaproben.anmerkungen AS anmerkungen,
`status`.status_text AS probenstatus,
edtaplasmaproben.anzahl_statuswechsel AS anzahl_statuswechsel

FROM edtaplasmaproben

LEFT JOIN probeninformation_ltx
ON edtaplasmaproben.probeninformation_ltx = probeninformation_ltx.id

LEFT JOIN differenzierungsmerkmal_edtaplasma
ON edtaplasmaproben.differenzierungsmerkmal = differenzierungsmerkmal_edtaplasma.id

LEFT JOIN `status`
ON edtaplasmaproben.`status` = `status`.id
"""

GALLEPROBEN_PROBEN_QUERY = """
SELECT
galleproben.barcode_id AS barcode_id,
galleproben.timestamp AS zeitstempel,
galleproben.patient_Id_intern AS patient_id_intern,
galleproben.created_at AS erstellungsdatum,
galleproben.probenart AS probenart,
probeninformation_ltx.probeninformation_text AS probeninformation_ltx_text,
differenzierungsmerkmal_galle.differenzierungsmerkmal_text,
galleproben.abholer AS abholer,
galleproben.uhrzeit AS probe_erhalten_uhrzeit,
galleproben.boxnummer AS boxname_boxnummer,
galleproben.boxzeile AS boxzeile,
galleproben.boxspalte AS boxspalte,
galleproben.lagerraum AS lagerraum,
galleproben.anmerkungen AS anmerkungen_probenannahme,
galleproben.remarks AS anmerkungen_probenaufbereitung,
`status`.status_text AS probenstatus,
galleproben.anzahl_statuswechsel AS anzahl_statuswechsel

FROM galleproben

LEFT JOIN probeninformation_ltx
ON galleproben.probeninformation_ltx = probeninformation_ltx.id

LEFT JOIN differenzierungsmerkmal_galle
ON galleproben.differenzierungsmerkmal = differenzierungsmerkmal_galle.id

LEFT JOIN `status`
ON galleproben.`status` = `status`.id
"""

PARAFFIN_PROBEN_QUERY = """
SELECT
paraffinproben.id AS id,
paraffinproben.patient_Id_intern AS patient_id_intern,
paraffinproben.timestamp AS zeitstempel,
uebergeordnete_probenart_paraffin.uebergeordnete_probenart_text AS uebergeordnete_probenart,
paraffinproben.probenart AS probenart,
untergeordnete_probenart_paraffin.untergeordnete_probenart_text AS untergeordnete_probenart,
paraffinproben.created_at AS erstellungsdatum,
paraffinproben.uhrzeit_probennahme AS uhrzeit_probennahme_op,
paraffinproben.uhrzeit AS uhrzeit_alt,
paraffinproben.uhrzeit_freeze AS uhrzeit_freeze,
paraffinproben.abholer AS abholer,
paraffinproben.lagerraum AS lagerraum, 
paraffinproben.anmerkungen AS anmerkungen_probenaufbereitung,
`status`.status_text AS probenstatus

FROM paraffinproben

LEFT JOIN uebergeordnete_probenart_paraffin
ON uebergeordnete_probenart_paraffin.id = paraffinproben.uebergeordnete_probenart

LEFT JOIN untergeordnete_probenart_paraffin
ON untergeordnete_probenart_paraffin.id = paraffinproben.untergeordnete_probenart

LEFT JOIN `status`
ON paraffinproben.`status` = `status`.id
"""

GEWEBE_PROBEN_QUERY = """
SELECT 
gewebeproben.barcode_id AS barcode_id,
gewebeproben.timestamp AS zeitstempel,
gewebeproben.patient_Id_intern AS patient_id_intern,
gewebeproben.probenart AS probenart,
probeninformation.probeninformation_text AS probeninformation_text,
differenzierungsmerkmal_gewebe.differenzierungsmerkmal_text AS differenzierungsmerkmal_text,
gewebeproben.created_at AS erstellungsdatum,
gewebeproben.uhrzeit_probennahme AS probe_erhalten_uhrzeit,
gewebeproben.uhrzeit AS uhrzeit_alt,
gewebeproben.uhrzeit_freeze AS uhrzeit_freeze,
gewebeproben.boxnummer AS boxname_boxnummer,
gewebeproben.boxzeile AS boxzeile ,
gewebeproben.boxspalte AS boxspalte,
gewebeproben.lagerraum AS lagerraum,
gewebeproben.abholer AS abholer,
gewebeproben.anmerkungen AS anmerkungen_probenannahme,
gewebeproben.remarks AS anmerkungen_probenaufbereitung,
`status`.status_text AS probenstatus,
gewebeproben.anzahl_statuswechsel AS anzahl_statuswechsel

FROM gewebeproben

LEFT JOIN differenzierungsmerkmal_gewebe
ON differenzierungsmerkmal_gewebe.id = gewebeproben.differenzierungsmerkmal

LEFT JOIN probeninformation
ON probeninformation.id = gewebeproben.probeninformation

LEFT JOIN `status`
ON gewebeproben.`status` = `status`.id
"""

SERUM_PROBEN_QUERY = """
SELECT 
serumproben.barcode_id AS barcode_id,
serumproben.timestamp AS zeitstempel,
serumproben.patient_Id_intern AS patient_id_intern,
serumproben.probenart AS probenart,
probeninformation.probeninformation_text AS probeninformation_text,
differenzierungsmerkmal_serum.differenzierungsmerkmal_text AS differenzierungsmerkmal_text,
serumproben.created_at AS erstellungsdatum,
serumproben.uhrzeit AS probe_erhalten_uhrzeit,
serumproben.boxnummer AS boxname_boxnummer,
serumproben.boxzeile AS boxzeile ,
serumproben.boxspalte AS boxspalte,
serumproben.lagerraum AS lagerraum,
serumproben.abholer AS abholer,
serumproben.anmerkungen AS anmerkungen_probenannahme,
`status`.status_text AS probenstatus,
serumproben.anzahl_statuswechsel AS anzahl_statuswechsel

FROM serumproben

LEFT JOIN differenzierungsmerkmal_serum
ON differenzierungsmerkmal_serum.id = serumproben.differenzierungsmerkmal

LEFT JOIN probeninformation
ON probeninformation.id = serumproben.probeninformation

LEFT JOIN `status`
ON serumproben.`status` = `status`.id
"""

URIN_PROBEN_QUERY = """
SELECT 
urinproben.barcode_id AS barcode_id,
urinproben.timestamp AS zeitstempel,
urinproben.patient_Id_intern AS patient_id_intern,
urinproben.probenart AS probenart,
probeninformation.probeninformation_text AS probeninformation_text,
differenzierungsmerkmal_urin.differenzierungsmerkmal_text AS differenzierungsmerkmal_text,
urinproben.created_at AS erstellungsdatum,
urinproben.uhrzeit AS uhrzeit,
urinproben.abholer AS abholer,
urinproben.boxnummer AS boxname_boxnummer,
urinproben.boxzeile AS boxzeile ,
urinproben.boxspalte AS boxspalte,
urinproben.lagerraum AS lagerraum,
urinproben.anmerkungen AS anmerkungen_probenannahme,
`status`.status_text AS probenstatus,
urinproben.anzahl_statuswechsel AS anzahl_statuswechsel

FROM urinproben

LEFT JOIN differenzierungsmerkmal_urin
ON differenzierungsmerkmal_urin.id = urinproben.differenzierungsmerkmal

LEFT JOIN probeninformation
ON probeninformation.id = urinproben.probeninformation

LEFT JOIN `status`
ON urinproben.`status` = `status`.id
"""

PATIENT_QUERY = """
SELECT 
patient.patient_Id_intern AS patient_id_intern,
patient.sap_id AS sap_id,
patient.sap_fallnummer AS sap_fallnummer,
patient.created_at AS erstellungsdatum,
patient.geschlecht AS geschlecht,
patient.`alter` AS `alter`,
patient.op_diagnose AS op_diagnose,
patient.op_geplant AS op_geplant, 
patient.bemerkung AS bemerkung

FROM patient
"""

VORLAUFIGE_PROBEN_QUERY = """
SELECT 
vorlaeufigeproben.barcode_id AS barcode_id,
probeninformation.probeninformation_text AS probeninformation_text,
probeninformation_ltx.probeninformation_text AS probeninformation_ltx_text,
vorlaeufigeproben.timestamp AS zeitstempel,
vorlaeufigeproben.patient_Id_intern AS patient_id_intern

FROM vorlaeufigeproben

LEFT JOIN probeninformation
ON probeninformation.id = vorlaeufigeproben.probeninformation

LEFT JOIN probeninformation_ltx
ON probeninformation_ltx.id = vorlaeufigeproben.probeninformation_ltx
"""

STUHL_PROBEN_QUERY = """
SELECT 
stuhlproben.barcode_id AS barcode_id,
stuhlproben.timestamp AS zeitstempel,
stuhlproben.patient_Id_intern AS patient_id_intern,
stuhlproben.created_at AS erstellungsdatum,
stuhlproben.abholer AS abholer,
stuhlproben.uhrzeit AS probe_erhalten_uhrzeit,
stuhlproben.probenart AS probenart,
probeninformation_ltx.probeninformation_text AS probeninformation_ltx_text,
differenzierungsmerkmal_stuhl.differenzierungsmerkmal_text AS differenzierungsmerkmal_text,
stuhlproben.lagerraum AS lagerraum,
stuhlproben.boxnummer AS boxnummer,
stuhlproben.boxzeile AS boxzeile,
stuhlproben.boxspalte AS boxspalte,
stuhlproben.anmerkungen AS anmerkungen,
`status`.status_text AS probenstatus,
stuhlproben.anzahl_statuswechsel AS anzahl_statuswechsel

FROM stuhlproben

LEFT JOIN probeninformation_ltx ON
probeninformation_ltx.id = stuhlproben.probeninformation_ltx

LEFT JOIN differenzierungsmerkmal_stuhl ON
differenzierungsmerkmal_stuhl.id = stuhlproben.differenzierungsmerkmal

LEFT JOIN `status`
ON `status`.id = `status`.id
"""

#CSV export only
LTX_FRAGEBOGEN = """
SELECT
    ltx_fragebogen.id AS fragebogen_id,
    ltx_fragebogen.timestamp AS fragebogen_timestamp,
    ltx_fragebogen.patient_Id_intern AS patient_id_intern,
    ltx_fragebogen.geschlecht AS geschlecht,
    ltx_fragebogen.`alter` AS `alter`,
    ltx_fragebogen.gewicht AS gewicht,
    ltx_fragebogen.groesse AS groesse,
    ltx_fragebogen.beruf AS beruf,
    ltx_fragebogen.kinder_anzahl AS kinder_anzahl,
    ltx_fragebogen.krankenversicherung AS krankenversicherung,
    ltx_fragebogen.epices_score AS epices_score,
    ltx_fragebogen.sozialer_prekaritaetsindex AS sozialer_prekaritaetsindex,
    ltx_fragebogen.bewegung AS bewegung,

    rotes_fleisch_lookup.value AS rotes_fleisch,
    ltx_fragebogen.rotes_fleisch_anz AS rotes_fleisch_anz,

    gefluegel_lookup.value AS gefluegel,
    ltx_fragebogen.gefluegel_anz AS gefluegel_anz,

    verarbeitetes_fleisch_lookup.value AS verarbeitetes_fleisch,
    ltx_fragebogen.verarbeitetes_fleisch_anz AS verarbeitetes_fleisch_anz,

    fisch_lookup.value AS fisch_meeresfruechte,
    ltx_fragebogen.fisch_meeresfruechte_anz AS fisch_meeresfruechte_anz,

    eier_lookup.value AS eier,
    ltx_fragebogen.eier_anz AS eier_anz,

    fruechte_gemuese_lookup.value AS fruechte_gemuese,
    ltx_fragebogen.fruechte_gemuese_anz AS fruechte_gemuese_anz,

    staerke_lookup.value AS staerkehaltige_lebensmittel,
    ltx_fragebogen.staerkehaltige_lebensmittel_anz AS staerkehaltige_lebensmittel_anz,

    vollwertkost_lookup.value AS vollwertkost,
    ltx_fragebogen.vollwertkost_anz AS vollwertkost_anz,

    huelsenfruechte_lookup.value AS huelsenfruechte,
    ltx_fragebogen.huelsenfruechte_anz AS huelsenfruechte_anz,

    joghurt_lookup.value AS joghurt,
    ltx_fragebogen.joghurt_anz AS joghurt_anz,

    kaese_lookup.value AS kaese,
    ltx_fragebogen.kaese_anz AS kaese_anz,

    milch_lookup.value AS milch,
    ltx_fragebogen.milch_anz AS milch_anz,

    cereal_lookup.value AS fruehstueckscerealien,
    ltx_fragebogen.fruehstueckscerealien_anz AS fruehstueckscerealien_anz,

    fettfrei_zucker_lookup.value AS fettfreie_zuckerhaltige_produkte,
    ltx_fragebogen.fettfreie_zuckerhaltige_produkte_anz AS fettfreie_zuckerhaltige_produkte_anz,

    fetthaltig_zucker_lookup.value AS fetthaltige_zuckerhaltige_produkte,
    ltx_fragebogen.fetthaltige_zuckerhaltige_produkte_anz AS fetthaltige_zuckerhaltige_produkte_anz,

    salzig_lookup.value AS fettige_salzige_produkte,
    ltx_fragebogen.fettige_salzige_produkte_anz AS fettige_salzige_produkte_anz,

    fette_lookup.value AS fette,
    ltx_fragebogen.fette_anz AS fette_anz,

    getraenke_lookup.value AS zuckerhaltige_getraenke,
    ltx_fragebogen.zuckerhaltige_getraenke_anz AS zuckerhaltige_getraenke_anz,

    wein_lookup.value AS wein,
    ltx_fragebogen.wein_anz AS wein_anz,

    bier_lookup.value AS bier,
    ltx_fragebogen.bier_anz AS bier_anz,

    aperitif_lookup.value AS aperitifs_digestifs,
    ltx_fragebogen.aperitifs_digestifs_anz AS aperitifs_digestifs_anz

FROM ltx_fragebogen

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS rotes_fleisch_lookup
    ON rotes_fleisch_lookup.id = ltx_fragebogen.rotes_fleisch

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS gefluegel_lookup
    ON gefluegel_lookup.id = ltx_fragebogen.gefluegel

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS verarbeitetes_fleisch_lookup
    ON verarbeitetes_fleisch_lookup.id = ltx_fragebogen.verarbeitetes_fleisch

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS fisch_lookup
    ON fisch_lookup.id = ltx_fragebogen.fisch_meeresfruechte

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS eier_lookup
    ON eier_lookup.id = ltx_fragebogen.eier

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS fruechte_gemuese_lookup
    ON fruechte_gemuese_lookup.id = ltx_fragebogen.fruechte_gemuese

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS staerke_lookup
    ON staerke_lookup.id = ltx_fragebogen.staerkehaltige_lebensmittel

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS vollwertkost_lookup
    ON vollwertkost_lookup.id = ltx_fragebogen.vollwertkost

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS huelsenfruechte_lookup
    ON huelsenfruechte_lookup.id = ltx_fragebogen.huelsenfruechte

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS joghurt_lookup
    ON joghurt_lookup.id = ltx_fragebogen.joghurt

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS kaese_lookup
    ON kaese_lookup.id = ltx_fragebogen.kaese

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS milch_lookup
    ON milch_lookup.id = ltx_fragebogen.milch

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS cereal_lookup
    ON cereal_lookup.id = ltx_fragebogen.fruehstueckscerealien

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS fettfrei_zucker_lookup
    ON fettfrei_zucker_lookup.id = ltx_fragebogen.fettfreie_zuckerhaltige_produkte

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS fetthaltig_zucker_lookup
    ON fetthaltig_zucker_lookup.id = ltx_fragebogen.fetthaltige_zuckerhaltige_produkte

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS salzig_lookup
    ON salzig_lookup.id = ltx_fragebogen.fettige_salzige_produkte

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS fette_lookup
    ON fette_lookup.id = ltx_fragebogen.fette

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS getraenke_lookup
    ON getraenke_lookup.id = ltx_fragebogen.zuckerhaltige_getraenke

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS wein_lookup
    ON wein_lookup.id = ltx_fragebogen.wein

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS bier_lookup
    ON bier_lookup.id = ltx_fragebogen.bier

LEFT JOIN ltx_fragebogen_ernaerung_lookup AS aperitif_lookup
    ON aperitif_lookup.id = ltx_fragebogen.aperitifs_digestifs;
"""


TABLE_QUERIES = {
    "edtaplasmaproben": EDTAPLASMA_PROBEN_QUERY,
    "galleproben": GALLEPROBEN_PROBEN_QUERY,
    "gewebeproben": GEWEBE_PROBEN_QUERY,
    "ltx_fragebogen": LTX_FRAGEBOGEN,
    "paraffinproben": PARAFFIN_PROBEN_QUERY,
    "patient": PATIENT_QUERY,
    "serumproben": SERUM_PROBEN_QUERY,
    "stuhlproben": STUHL_PROBEN_QUERY,
    "urinproben": URIN_PROBEN_QUERY,
    "vorlaeufigeproben": VORLAUFIGE_PROBEN_QUERY,
}

def fetch_export_data(
    table_name: str,
    db: Session,
) -> tuple[list[str], list[dict]]:
    query = TABLE_QUERIES.get(table_name)

    if query is None:
        raise HTTPException(
            status_code=400,
            detail="Diese Tabelle kann nicht exportiert werden.",
        )

    result = db.execute(text(query))

    columns = list(result.keys())
    data = [
        dict(row)
        for row in result.mappings().all()
    ]

    return columns, data