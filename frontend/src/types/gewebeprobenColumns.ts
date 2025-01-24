//label for data overview
// variable .... displayd text
export const gewebeprobenDataColumns = [
    { key: "barcode_id", label: "Barcode ID" },
    { key: "patient_Id_intern", label: "Patienten ID (intern)" },
    { key: "probenart", label: "Probenart" },
    { key: "boxnummer", label: "Boxnummer" },
    { key: "boxzeile", label: "Boxzeile" },
    { key: "boxspalte", label: "Boxspalte" },
    { key: "lagerraum", label: "Lagerraum" },   
    { key: "created_at", label: "Erstellungsdatum" },
    { key: "uhrzeit", label: "Probe erhalten (Uhrzeit)" },
    { key: "abholer", label: "Abholer:In" },
    { key: "anmerkungen", label: "Besonderheiten/Anmerkungen (bei Probennahme)" },
    { key: "remarks", label: "Bemerkungen (während Probenaufbereitung)" },
    { key: "status", label: "Probenstatus" },
    { key: "uebergeordete_probenart", label: "Übergeordnete Probenart" },       // Added
    { key: "untergeordete_probenart", label: "Untergeordnete Probenart" },     // Added

];