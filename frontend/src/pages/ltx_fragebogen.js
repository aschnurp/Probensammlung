// src/SampleForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Radio,
    TextField,
    Typography,
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    RadioGroup,
    Checkbox,
    Divider,
    Collapse,
    Snackbar,
    Alert,
} from '@mui/material';
import { IoMdArrowRoundBack } from "react-icons/io";
import dayjs from 'dayjs';
dayjs.locale('de');

export default function SampleForm() {
    const [formData, setFormData] = useState({
        patient_Id_intern: '',
        geschlecht: '',
        alter: '',
        gewicht: '',
        groesse: '',
        beruf: '',
        kinder_anzahl: '',
        krankenversicherung: '',
        epices_score: '',
        bewegung: '',
        rotes_fleisch: '',
        rotes_fleisch_anz: '',
        gefluegel: '',
        gefluegel_anz: '',
        verarbeitetes_fleisch: '',
        verarbeitetes_fleisch_anz: '',
        fisch_meeresfruechte: '',
        fisch_meeresfruechte_anz: '',
        eier: '',
        eier_anz: '',
        fruechte_gemuese: '',
        fruechte_gemuese_anz: '',
        staerkehaltige_lebensmittel: '',
        staerkehaltige_lebensmittel_anz: '',
        vollwertkost: '',
        vollwertkost_anz: '',
        huelsenfruechte: '',
        huelsenfruechte_anz: '',
        joghurt: '',
        joghurt_anz: '',
        kaese: '',
        kaese_anz: '',
        milch: '',
        milch_anz: '',
        fruehstueckscerealien: '',
        fruehstueckscerealien_anz: '',
        fettfreie_zuckerhaltige_produkte: '',
        fettfreie_zuckerhaltige_produkte_anz: '',
        fetthaltige_zuckerhaltige_produkte: '',
        fetthaltige_zuckerhaltige_produkte_anz: '',
        fettige_salzige_produkte: '',
        fettige_salzige_produkte_anz: '',
        fette: '',
        fette_anz: '',
        zuckerhaltige_getraenke: '',
        zuckerhaltige_getraenke_anz: '',
        wein: '',
        wein_anz: '',
        bier: '',
        bier_anz: '',
        aperitifs_digestifs: '',
        aperitifs_digestifs_anz: '',
        nierenfunktion: '',
        diabetes: '',
        immunsuppression_immunkompetent: false,
        immunsuppression_HIV_AIDS: false,
        immunsuppression_solider_krebs: false,
        immunsuppression_maligne_heamatopathie: false,
        immunsuppression_organ_knochenmarkstransplantation: false,
        immunsuppression_neutropenie: false,
        immunsuppression_angeborene_immunschwaeche: false,
        immunsuppression_immunsuppessive_therapie: false,
        multiresistenz_infektion: '',
        antibiotische_behandlung: '',
        antibiotische_therapie_1_name: '',
        antibiotische_therapie_1_zeitraum: '',
        antibiotische_therapie_1_grund: '',
        antibiotische_therapie_2_name: '',
        antibiotische_therapie_2_zeitraum: '',
        antibiotische_therapie_2_grund: '',
        antibiotische_therapie_3_name: '',
        antibiotische_therapie_3_zeitraum: '',
        antibiotische_therapie_3_grund: '',
        langzeit_norfloxacin_prophylaxe: '',
        hospitalisation_vergangenes_jahr: '',
        geburtsort_ausserhalb_deutschlands: '',
        geburtsort_ausserhalb_deutschlands_ort: '',
        auslandsreise_letzte_drei_monate: '',
        auslandsreise_letzte_drei_monate_ort: '',
        auslandsreise_antibiotika: '',
        auslandsreise_durchfall: '',
        auslandsreise_krankenhaus: '',
    });

    //set of all numerical variables
    const NUMBER_FIELDS = new Set([
        'alter',
        'gewicht',
        'groesse',
        'kinder_anzahl',
        'epices_score',
        'rotes_fleisch',
        'rotes_fleisch_anz',
        'gefluegel',
        'gefluegel_anz',
        'verarbeitetes_fleisch',
        'verarbeitetes_fleisch_anz',
        'fisch_meeresfruechte',
        'fisch_meeresfruechte_anz',
        'eier',
        'eier_anz',
        'fruechte_gemuese',
        'fruechte_gemuese_anz',
        'staerkehaltige_lebensmittel',
        'staerkehaltige_lebensmittel_anz',
        'vollwertkost',
        'vollwertkost_anz',
        'huelsenfruechte',
        'huelsenfruechte_anz',
        'joghurt',
        'joghurt_anz',
        'kaese',
        'kaese_anz',
        'milch',
        'milch_anz',
        'fruehstueckscerealien',
        'fruehstueckscerealien_anz',
        'fettfreie_zuckerhaltige_produkte',
        'fettfreie_zuckerhaltige_produkte_anz',
        'fetthaltige_zuckerhaltige_produkte',
        'fetthaltige_zuckerhaltige_produkte_anz',
        'fettige_salzige_produkte',
        'fettige_salzige_produkte_anz',
        'fette',
        'fette_anz',
        'zuckerhaltige_getraenke',
        'zuckerhaltige_getraenke_anz',
        'wein',
        'wein_anz',
        'bier',
        'bier_anz',
        'aperitifs_digestifs',
        'aperitifs_digestifs_anz',

    ]);

    //verify which items are chnaged compared to the initial value
    const normalize = (data) => {
        const result = {};

        for (const [key, value] of Object.entries(data)) {
            if (value === '') {
                result[key] = null;
            } else if (NUMBER_FIELDS.has(key)) {
                result[key] = Number(value);
            } else {
                result[key] = value;
            }
        }

        return result;
    };

    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    //set of all items for the nutrition table
    const FOOD_ITEMS = [
        { key: 'rotes_fleisch', label: 'Rotes Fleisch' },
        { key: 'gefluegel', label: 'Geflügel' },
        { key: 'verarbeitetes_fleisch', label: 'Verarbeitetes Fleisch' },
        { key: 'fisch_meeresfruechte', label: 'Fisch / Meeresfrüchte' },
        { key: 'eier', label: 'Eier' },
        { key: 'fruechte_gemuese', label: 'Früchte & Gemüse' },
        { key: 'staerkehaltige_lebensmittel', label: 'Stärkehaltige Lebensmittel' },
        { key: 'vollwertkost', label: 'Vollwertkost' },
        { key: 'huelsenfruechte', label: 'Hülsenfrüchte' },
        { key: 'joghurt', label: 'Joghurt' },
        { key: 'kaese', label: 'Käse' },
        { key: 'milch', label: 'Milch' },
        { key: 'fruehstueckscerealien', label: 'Frühstückscerealien' },
        { key: 'fettfreie_zuckerhaltige_produkte', label: 'Fettfreie zuckerhaltige Produkte' },
        { key: 'fetthaltige_zuckerhaltige_produkte', label: 'Fetthaltige zuckerhaltige Produkte' },
        { key: 'fettige_salzige_produkte', label: 'Fettige salzige Produkte' },
        { key: 'fette', label: 'Fette' },
        { key: 'zuckerhaltige_getraenke', label: 'Zuckerhaltige Getränke' },
        { key: 'wein', label: 'Wein' },
        { key: 'bier', label: 'Bier' },
        { key: 'aperitifs_digestifs', label: 'Aperitifs / Digestifs' },
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const Data = { ...formData };
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    //fetch previous entered data
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/table/data?table_name=ltx_fragebogen",
                );

                if (response.data && formData.barcode_id) {
                    const foundItem = response.data.find(item => item.barcode_id === formData.barcode_id);

                    if (foundItem) {
                        setFormData((prevData) => ({
                            ...prevData,
                            patient_Id_intern: foundItem.patient_Id_intern,
                        }))
                        setSnackbarMessage("Barcode gefunden.");
                        setSnackbarSeverity("success");
                        setSnackbarOpen(true);
                    } else {
                        setSnackbarOpen(false);
                    }
                }
            } catch (error) {
                setSnackbarMessage("Fehler beim Abrufen der Daten.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        };

        fetchAllData();
    }, [formData.patient_Id_intern]);

    //variables to clear by pressing the zuruecksetzen button
    const handleClear = () => {
        setFormData(prev => ({
            patient_Id_intern: '',
            geschlecht: '',
            alter: '',
            gewicht: '',
            groesse: '',
            beruf: '',
            kinder_anzahl: '',
            krankenversicherung: '',
            epices_score: '',
            bewegung: '',
            rotes_fleisch: '',
            rotes_fleisch_anz: '',
            gefluegel: '',
            gefluegel_anz: '',
            verarbeitetes_fleisch: '',
            verarbeitetes_fleisch_anz: '',
            fisch_meeresfruechte: '',
            fisch_meeresfruechte_anz: '',
            eier: '',
            eier_anz: '',
            fruechte_gemuese: '',
            fruechte_gemuese_anz: '',
            staerkehaltige_lebensmittel: '',
            staerkehaltige_lebensmittel_anz: '',
            vollwertkost: '',
            vollwertkost_anz: '',
            huelsenfruechte: '',
            huelsenfruechte_anz: '',
            joghurt: '',
            joghurt_anz: '',
            kaese: '',
            kaese_anz: '',
            milch: '',
            milch_anz: '',
            fruehstueckscerealien: '',
            fruehstueckscerealien_anz: '',
            fettfreie_zuckerhaltige_produkte: '',
            fettfreie_zuckerhaltige_produkte_anz: '',
            fetthaltige_zuckerhaltige_produkte: '',
            fetthaltige_zuckerhaltige_produkte_anz: '',
            fettige_salzige_produkte: '',
            fettige_salzige_produkte_anz: '',
            fette: '',
            fette_anz: '',
            zuckerhaltige_getraenke: '',
            zuckerhaltige_getraenke_anz: '',
            wein: '',
            wein_anz: '',
            bier: '',
            bier_anz: '',
            aperitifs_digestifs: '',
            aperitifs_digestifs_anz: '',
            nierenfunktion: '',
            diabetes: '',
            immunsuppression_immunkompetent: false,
            immunsuppression_HIV_AIDS: false,
            immunsuppression_solider_krebs: false,
            immunsuppression_maligne_heamatopathie: false,
            immunsuppression_organ_knochenmarkstransplantation: false,
            immunsuppression_neutropenie: false,
            immunsuppression_angeborene_immunschwaeche: false,
            immunsuppression_immunsuppessive_therapie: false,
            multiresistenz_infektion: '',
            antibiotische_behandlung: '',
            antibiotische_therapie_1_name: '',
            antibiotische_therapie_1_zeitraum: '',
            antibiotische_therapie_1_grund: '',
            antibiotische_therapie_2_name: '',
            antibiotische_therapie_2_zeitraum: '',
            antibiotische_therapie_2_grund: '',
            antibiotische_therapie_3_name: '',
            antibiotische_therapie_3_zeitraum: '',
            antibiotische_therapie_3_grund: '',
            langzeit_norfloxacin_prophylaxe: '',
            hospitalisation_vergangenes_jahr: '',
            geburtsort_ausserhalb_deutschlands: '',
            geburtsort_ausserhalb_deutschlands_ort: '',
            auslandsreise_letzte_drei_monate: '',
            auslandsreise_letzte_drei_monate_ort: '',
            auslandsreise_antibiotika: '',
            auslandsreise_durchfall: '',
            auslandsreise_krankenhaus: '',
        }));
        setErrors({});
    };

    //lookup const for nutrition table (cols)
    const FREQUENCY = {
        NIE: 1,
        MONAT_1_3: 2,
        WOCHE_1_2: 3,
        WOCHE_3_5: 4,
        TAG_1: 5,
        TAG_MEHR_2: 6,
    };

    //fetch already entered data
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/table/data?table_name=ltx_fragebogen",
                );

                if (response.data && formData.patient_Id_intern) {
                    const foundItem = response.data.find(item => item.patient_Id_intern === formData.patient_Id_intern);

                    if (foundItem) {
                        setFormData((prevData) => ({
                            ...prevData,
                            beruf: foundItem.beruf,
                            geschlecht: foundItem.geschlecht,
                            alter: foundItem.alter,
                            gewicht: foundItem.gewicht,
                            groesse: foundItem.groesse,
                            beruf: foundItem.beruf,
                            kinder_anzahl: foundItem.kinder_anzahl,
                            krankenversicherung: foundItem.krankenversicherung,
                            epices_score: foundItem.epices_score,
                            bewegung: foundItem.bewegung,
                            rotes_fleisch: foundItem.rotes_fleisch,
                            rotes_fleisch_anz: foundItem.rotes_fleisch_anz,
                            gefluegel: foundItem.gefluegel,
                            gefluegel_anz: foundItem.gefluegel_anz,
                            verarbeitetes_fleisch: foundItem.verarbeitetes_fleisch,
                            verarbeitetes_fleisch_anz: foundItem.verarbeitetes_fleisch_anz,
                            fisch_meeresfruechte: foundItem.fisch_meeresfruechte,
                            fisch_meeresfruechte_anz: foundItem.fisch_meeresfruechte_anz,
                            eier: foundItem.eier,
                            eier_anz: foundItem.eier_anz,
                            fruechte_gemuese: foundItem.fruechte_gemuese,
                            fruechte_gemuese_anz: foundItem.fruechte_gemuese_anz,
                            staerkehaltige_lebensmittel: foundItem.staerkehaltige_lebensmittel,
                            staerkehaltige_lebensmittel_anz: foundItem.staerkehaltige_lebensmittel_anz,
                            vollwertkost: foundItem.vollwertkost,
                            vollwertkost_anz: foundItem.vollwertkost_anz,
                            huelsenfruechte: foundItem.huelsenfruechte,
                            huelsenfruechte_anz: foundItem.huelsenfruechte_anz,
                            joghurt: foundItem.joghurt,
                            joghurt_anz: foundItem.joghurt_anz,
                            kaese: foundItem.kaese,
                            kaese_anz: foundItem.kaese_anz,
                            milch: foundItem.milch,
                            milch_anz: foundItem.milch_anz,
                            fruehstueckscerealien: foundItem.fruehstueckscerealien,
                            fruehstueckscerealien_anz: foundItem.fruehstueckscerealien_anz,
                            fettfreie_zuckerhaltige_produkte: foundItem.fettfreie_zuckerhaltige_produkte,
                            fettfreie_zuckerhaltige_produkte_anz: foundItem.fettfreie_zuckerhaltige_produkte_anz,
                            fetthaltige_zuckerhaltige_produkte: foundItem.fetthaltige_zuckerhaltige_produkte,
                            fetthaltige_zuckerhaltige_produkte_anz: foundItem.fetthaltige_zuckerhaltige_produkte_anz,
                            fettige_salzige_produkte: foundItem.fettige_salzige_produkte,
                            fettige_salzige_produkte_anz: foundItem.fettige_salzige_produkte_anz,
                            fette: foundItem.fette,
                            fette_anz: foundItem.fette_anz,
                            zuckerhaltige_getraenke: foundItem.zuckerhaltige_getraenke,
                            zuckerhaltige_getraenke_anz: foundItem.zuckerhaltige_getraenke_anz,
                            wein: foundItem.wein,
                            wein_anz: foundItem.wein_anz,
                            bier: foundItem.bier,
                            bier_anz: foundItem.bier_anz,
                            aperitifs_digestifs: foundItem.aperitifs_digestifs,
                            aperitifs_digestifs_anz: foundItem.aperitifs_digestifs_anz,
                            nierenfunktion: foundItem.nierenfunktion,
                            diabetes: foundItem.diabetes,
                            immunsuppression_immunkompetent: Boolean(foundItem.immunsuppression_immunkompetent),
                            immunsuppression_HIV_AIDS: Boolean(foundItem.immunsuppression_HIV_AIDS),
                            immunsuppression_solider_krebs: Boolean(foundItem.immunsuppression_solider_krebs),
                            immunsuppression_maligne_heamatopathie: Boolean(foundItem.immunsuppression_maligne_heamatopathie),
                            immunsuppression_organ_knochenmarkstransplantation: Boolean(foundItem.immunsuppression_organ_knochenmarkstransplantation),
                            immunsuppression_neutropenie: Boolean(foundItem.immunsuppression_neutropenie),
                            immunsuppression_angeborene_immunschwaeche: Boolean(foundItem.immunsuppression_angeborene_immunschwaeche),
                            immunsuppression_immunsuppessive_therapie: Boolean(foundItem.immunsuppression_immunsuppessive_therapie),
                            multiresistenz_infektion: foundItem.multiresistenz_infektion,
                            antibiotische_behandlung: foundItem.antibiotische_behandlung,
                            antibiotische_therapie_1_name: foundItem.antibiotische_therapie_1_name,
                            antibiotische_therapie_1_zeitraum: foundItem.antibiotische_therapie_1_zeitraum,
                            antibiotische_therapie_1_grund: foundItem.antibiotische_therapie_1_grund,
                            antibiotische_therapie_2_name: foundItem.antibiotische_therapie_2_name,
                            antibiotische_therapie_2_zeitraum: foundItem.antibiotische_therapie_2_zeitraum,
                            antibiotische_therapie_2_grund: foundItem.antibiotische_therapie_2_grund,
                            antibiotische_therapie_3_name: foundItem.antibiotische_therapie_3_name,
                            antibiotische_therapie_3_zeitraum: foundItem.antibiotische_therapie_3_zeitraum,
                            antibiotische_therapie_3_grund: foundItem.antibiotische_therapie_3_grund,
                            langzeit_norfloxacin_prophylaxe: foundItem.langzeit_norfloxacin_prophylaxe,
                            hospitalisation_vergangenes_jahr: foundItem.hospitalisation_vergangenes_jahr,
                            geburtsort_ausserhalb_deutschlands: foundItem.geburtsort_ausserhalb_deutschlands,
                            geburtsort_ausserhalb_deutschlands_ort: foundItem.geburtsort_ausserhalb_deutschlands_ort,
                            auslandsreise_letzte_drei_monate: foundItem.auslandsreise_letzte_drei_monate,
                            auslandsreise_letzte_drei_monate_ort: foundItem.auslandsreise_letzte_drei_monate_ort,
                            auslandsreise_antibiotika: foundItem.auslandsreise_antibiotika,
                            auslandsreise_durchfall: foundItem.auslandsreise_durchfall,
                            auslandsreise_krankenhaus: foundItem.auslandsreise_krankenhaus,
                        }))
                        setSnackbarMessage("Patienten Id gefunden");
                        setSnackbarSeverity("success");
                        setSnackbarOpen(true);
                    } else {
                        setSnackbarOpen(false);
                    }
                }
            } catch (error) {
                setSnackbarMessage("Fehler beim Abrufen der Daten.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        };

        fetchAllData();
    }, [formData.patient_Id_intern]);

    //data submittet when pressing send
    const handleSubmit = async () => {
        const payload = normalize(formData);

    //try to send
        try {
            console.log("Data try to send:", payload);
            const newErrors = {};

            //definde required fields
            const isUnfilled = (v) => v === '';
            [
                'rotes_fleisch', 
                'gefluegel', 
                'verarbeitetes_fleisch', 
                'fisch_meeresfruechte', 
                'eier', 
                'fruechte_gemuese', 
                'staerkehaltige_lebensmittel', 
                'vollwertkost', 
                'huelsenfruechte', 
                'joghurt', 
                'kaese', 
                'milch', 
                'fruehstueckscerealien',
                'fettfreie_zuckerhaltige_produkte',
                'fetthaltige_zuckerhaltige_produkte',
                'fettige_salzige_produkte',
                'fette',
                'zuckerhaltige_getraenke',
                'wein',
                'bier',
                'aperitifs_digestifs'
            ]
            .forEach((f) => {
            if (isUnfilled(formData[f])) {
                newErrors[f] = 'Alle Felder zum Thema "Ernährung" müssen Vollständig ausgefüllt sein';
            }
            });
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                setSnackbarMessage('Alle Felder zum Thema "Ernährung" müssen Vollständig ausgefüllt sein'); //error message
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                return;
            }

            await axios.post(
                "http://localhost:8000/new_data/ltx_fragebogen",
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log("Data has been sent:", payload);

            setSnackbarMessage('Daten erfolgreich gespeichert.');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

        } catch (error) {
            console.error(error);
            setSnackbarMessage('Fehler beim Speichern.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };


    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    return (
        <Box
            sx={{ p: 3, maxWidth: 1000, mx: "auto" }}
            onKeyDown={(e) => {
                if (e.key === "Enter") { //bei press-enter
                    const active = document.activeElement; // Cursor Element
                    if (active.name === "patient_Id_intern") {
                        e.preventDefault(); //aendere default funktion
                        handleSubmit();    //submit
                    }
                }
            }}
        >
            <Box sx={{ position: 'absolute', top: 90, left: 16 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.location.href = '/overview'}
                >
                    <IoMdArrowRoundBack />
                </Button>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    LTX-Fragebogen
                </Typography>
                <Typography variant="body1">
                    Erfassung aller befragten LTX-Patienten, welche den Studienkriterien entsprechen
                </Typography>
            </Box>

            {(
                <Box sx={{ mt: 2 }}>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
                        Demografische Daten
                    </Typography>

                    <TextField
                        label="Patienten ID (intern)"
                        name="patient_Id_intern"
                        value={formData.patient_Id_intern}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <FormControl component="fieldset" margin="normal">
                        <FormLabel id="geschlecht-label">
                            Geschlecht:
                        </FormLabel>

                        <RadioGroup
                            name="geschlecht"
                            value={formData.geschlecht}
                            onChange={handleChange}
                            row
                            sx={{ mt: 1 }}
                        >
                            <FormControlLabel value="männlich" control={<Radio />} label="Männlich" />
                            <FormControlLabel value="weiblich" control={<Radio />} label="Weiblich" />
                            <FormControlLabel value="non_binary" control={<Radio />} label="Non-Binary" />
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        label="Alter"
                        name="alter"
                        type='number'
                        value={formData.alter}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Gewicht"
                        name="gewicht"
                        type="number"
                        value={formData.gewicht}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Körpergröße"
                        name="groesse"
                        type="number"
                        value={formData.groesse}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Beruf"
                        name="beruf"
                        value={formData.beruf}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                </Box>
            )}
            <Box sx={{ mt: 2 }}>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
                    Sozioökonomische Daten
                </Typography>

                <TextField
                    label="Anzahl Kinder"
                    name="kinder_anzahl"
                    type="number"
                    value={formData.kinder_anzahl}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Krankenversicherung"
                    name="krankenversicherung"
                    value={formData.krankenversicherung}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="EPICES-Score"
                    name="epices_score"
                    type="number"
                    value={formData.epices_score ?? ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
            </Box>

            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
                Körperliche Aktivität
            </Typography>

            <FormControl component="fieldset" margin="normal">
                <RadioGroup
                    name="bewegung"
                    value={formData.bewegung}
                    onChange={handleChange}
                    sx={{ flexDirection: 'column' }}
                >
                    <FormControlLabel value="gelegentliche_bewegung" control={<Radio />} label="Gelegentliche Bewegung" />
                    <FormControlLabel value="woechentliche_bewegung" control={<Radio />} label="Wöchentliche Bewegung" />
                    <FormControlLabel value="30min_schnelles_gehen_jeden_tag" control={<Radio />} label="30 min schnelles Gehen pro Tag" />
                    <FormControlLabel value="regelmaeßiger_sport_mehr_als_30min_pro_tag" control={<Radio />} label="Regelmäßiger Sport >30 min pro Tag" />
                </RadioGroup>
            </FormControl>

            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                Ernährung
            </Typography>

            <FormControl component="fieldset" margin="normal" fullWidth>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '2.5fr repeat(6, 1fr)',
                        gap: 1,
                        textAlign: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/* Header */}
                    <Box />
                    <Typography variant="body2">Nie</Typography>
                    <Typography variant="body2">1–3 / Monat</Typography>
                    <Typography variant="body2">1–2 / Woche</Typography>
                    <Typography variant="body2">3–5 / Woche</Typography>
                    <Typography variant="body2">1 / Tag</Typography>
                    <Typography variant="body2">&gt;2 / Tag</Typography>

                    {FOOD_ITEMS.map((item) => (
                        <React.Fragment key={item.key}>
                            {/* Label */}
                            <Typography sx={{ textAlign: 'left', fontWeight: 500 }}>
                                {item.label}
                            </Typography>

                            {/* Frequenzen */}
                            <RadioGroup
                                row
                                name={item.key}
                                value={formData[item.key]}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        [item.key]: Number(e.target.value),
                                        // Anzahl zurücksetzen, wenn nicht >2/Tag
                                        ...(Number(e.target.value) !== FREQUENCY.TAG_MEHR_2 && {
                                            [`${item.key}_anz`]: '',
                                        }),
                                    }))
                                }
                                sx={{ display: 'contents' }}
                            >
                                <Radio value={FREQUENCY.NIE} />
                                <Radio value={FREQUENCY.MONAT_1_3} />
                                <Radio value={FREQUENCY.WOCHE_1_2} />
                                <Radio value={FREQUENCY.WOCHE_3_5} />
                                <Radio value={FREQUENCY.TAG_1} />

                                {/* >2/Tag → Number */}
                                <TextField
                                    type="number"
                                    size="small"
                                    inputProps={{ min: 0 }}
                                    value={formData[`${item.key}_anz`] || ''}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [item.key]: FREQUENCY.TAG_MEHR_2,
                                            [`${item.key}_anz`]: e.target.value,
                                        }))
                                    }
                                />
                            </RadioGroup>
                        </React.Fragment>
                    ))}
                </Box>
            </FormControl>

            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
                Komorbiditäten
            </Typography>
            <FormControl component="fieldset" margin="normal">
                <FormLabel id="nierenfunktion-label">
                    Nierenfunktion
                </FormLabel>

                <RadioGroup
                    aria-labelledby="nierenfunktion-label"
                    name="nierenfunktion"
                    value={formData.nierenfunktion}
                    onChange={handleChange}
                    row
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        textAlign: 'center',
                        maxWidth: 1000,
                        mx: 'auto',
                        mt: 1,
                    }}
                >
                    <FormControlLabel value="normal" control={<Radio />} label="Normal" />
                    <FormControlLabel value="eGFR_ueber_90" control={<Radio />} label="1 (eGFR > 90)" />
                    <FormControlLabel value="eGFR_60_90" control={<Radio />} label="2 (60 – 89)" />
                    <FormControlLabel value="eGFR_30_59" control={<Radio />} label="3 (30 – 59)" />
                    <FormControlLabel value="eGFR_15_29" control={<Radio />} label="4 (15 – 29)" />
                    <FormControlLabel value="eGFR_unter_15" control={<Radio />} label="5 (< 15)" />
                </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" margin="normal">
                <FormLabel id="diabetes-label">
                    Diabetes
                </FormLabel>

                <RadioGroup
                    aria-labelledby="diabetes-label"
                    name="diabetes"
                    value={formData.diabetes}
                    onChange={handleChange}
                    row
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        textAlign: 'center',
                        maxWidth: 900,
                        mx: 'auto',
                        mt: 1,
                    }}
                >
                    <FormControlLabel value="fehlend" control={<Radio />} label="Fehlend" />
                    <FormControlLabel value="typ1" control={<Radio />} label="Typ 1" />
                    <FormControlLabel value="typ2_keine_insulinpflicht" control={<Radio />} label="Typ 2 (nicht insulinpflichtig)" />
                    <FormControlLabel value="typ2_insulinpflicht" control={<Radio />} label="Typ 2 (insulinpflichtig)" />
                </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" margin="normal" fullWidth>
                <FormLabel>Immunsuppression</FormLabel>

                <FormGroup sx={{ mt: 1 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="immunsuppression_immunkompetent"
                                checked={Boolean(formData.immunsuppression_immunkompetent)}
                                onChange={handleChange}
                            />
                        }
                        label="Immunkompetent"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="immunsuppression_HIV_AIDS"
                                checked={Boolean(formData.immunsuppression_HIV_AIDS)}
                                onChange={handleChange}
                            />
                        }
                        label="HIV/AIDS (<200 CD4)"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="immunsuppression_solider_krebs"
                                checked={Boolean(formData.immunsuppression_solider_krebs)}
                                onChange={handleChange}
                            />
                        }
                        label="Fortgeschrittener solider Krebs"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="immunsuppression_maligne_heamatopathie"
                                checked={Boolean(formData.immunsuppression_maligne_heamatopathie)}
                                onChange={handleChange}
                            />
                        }
                        label="Maligne Hämatopathie"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="immunsuppression_organ_knochenmarkstransplantation"
                                checked={Boolean(formData.immunsuppression_organ_knochenmarkstransplantation)}
                                onChange={handleChange}
                            />
                        }
                        label="Organ- oder Knochenmarkstransplantation"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="immunsuppression_neutropenie"
                                checked={Boolean(formData.immunsuppression_neutropenie)}
                                onChange={handleChange}
                            />
                        }
                        label="Neutropenie <500"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="immunsuppression_angeborene_immunschwaeche"
                                checked={Boolean(formData.immunsuppression_angeborene_immunschwaeche)}
                                onChange={handleChange}
                            />
                        }
                        label="Angeborene Immunschwäche"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="immunsuppression_immunsuppessive_therapie"
                                checked={Boolean(formData.immunsuppression_immunsuppessive_therapie)}
                                onChange={handleChange}
                            />
                        }
                        label="Immunsuppressive Therapie (Kortikosteroide, Chemotherapie, immunmodulatorische Behandlung)"
                    />
                </FormGroup>
            </FormControl>


            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
                Risikofaktoren für Multiresistente Keime / Vorgeschichte der Antibiotikabehandlung
            </Typography>
            <FormControl component="fieldset" margin="normal">
                <FormLabel id="multiresistenz_infektion-label">
                    Vorgeschichte einer Multiresistenten-Infektion in den letzten 6 Monaten:
                </FormLabel>

                <RadioGroup
                    name="multiresistenz_infektion"
                    value={formData.multiresistenz_infektion}
                    onChange={handleChange}
                    row
                    sx={{
                        mt: 1,
                    }}
                >
                    <FormControlLabel value="ja" control={<Radio />} label="Ja" />
                    <FormControlLabel value="nein" control={<Radio />} label="Nein" />

                </RadioGroup>
            </FormControl>
            <Box sx={{ mt: 0 }}></Box>
            <FormControl component="fieldset" margin="normal">
                <FormLabel id="antibiotische_behandlung-label">
                    Antibiotische Behandlung in den letzten 6 Monaten:
                </FormLabel>

                <RadioGroup
                    name="antibiotische_behandlung"
                    value={formData.antibiotische_behandlung}
                    onChange={handleChange}
                    row
                    sx={{ mt: 1 }}
                >
                    <FormControlLabel value="ja" control={<Radio />} label="Ja" />
                    <FormControlLabel value="nein" control={<Radio />} label="Nein" />
                </RadioGroup>
            </FormControl>

            <Collapse in={formData.antibiotische_behandlung === 'ja'}>
                <Box sx={{ mt: 2 }}>
                    {[1, 2, 3].map((nr) => (
                        <Box key={nr} sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                Antibiotische Therapie {nr}
                            </Typography>

                            <TextField
                                label="Name"
                                name={`antibiotische_therapie_${nr}_name`}
                                value={formData[`antibiotische_therapie_${nr}_name`] || ''}
                                onChange={handleChange}
                                fullWidth
                                margin="dense"
                            />

                            <TextField
                                label="Zeitraum"
                                name={`antibiotische_therapie_${nr}_zeitraum`}
                                value={formData[`antibiotische_therapie_${nr}_zeitraum`] || ''}
                                onChange={handleChange}
                                fullWidth
                                margin="dense"
                            />

                            <TextField
                                label="Grund"
                                name={`antibiotische_therapie_${nr}_grund`}
                                value={formData[`antibiotische_therapie_${nr}_grund`] || ''}
                                onChange={handleChange}
                                fullWidth
                                margin="dense"
                            />
                        </Box>
                    ))}
                </Box>
            </Collapse>

            <FormControl component="fieldset" margin="normal">
                <FormLabel id="langzeit_norfloxacin_prophylaxe-label">
                    Langzeit Norfloxacin Prophylaxe (Sekundärprophylaxe SPB):
                </FormLabel>

                <RadioGroup
                    name="langzeit_norfloxacin_prophylaxe"
                    value={formData.langzeit_norfloxacin_prophylaxe}
                    onChange={handleChange}
                    row
                    sx={{
                        mt: 1,
                    }}
                >
                    <FormControlLabel value="ja" control={<Radio />} label="Ja" />
                    <FormControlLabel value="nein" control={<Radio />} label="Nein" />

                </RadioGroup>
            </FormControl>

            <Box sx={{ mt: 0 }} />
            <FormControl component="fieldset" margin="normal">
                <FormLabel id="hospitalisation_vergangenes_jahr-label">
                    Hospitalisation im vergangenen Jahr:
                </FormLabel>

                <RadioGroup
                    name="hospitalisation_vergangenes_jahr"
                    value={formData.hospitalisation_vergangenes_jahr}
                    onChange={handleChange}
                    row
                    sx={{
                        mt: 1,
                    }}
                >
                    <FormControlLabel value="ja" control={<Radio />} label="Ja" />
                    <FormControlLabel value="nein" control={<Radio />} label="Nein" />

                </RadioGroup>
            </FormControl>

            <Box sx={{ mt: 0 }} />
            <FormControl component="fieldset" margin="normal" fullWidth>
                <FormLabel id="geburtsort_ausserhalb_deutschlands-label">
                    Geburtsort außerhalb Deutschlands:
                </FormLabel>

                <RadioGroup
                    name="geburtsort_ausserhalb_deutschlands"
                    value={formData.geburtsort_ausserhalb_deutschlands}
                    onChange={handleChange}
                    row
                    sx={{ mt: 1 }}
                >
                    <FormControlLabel value="ja" control={<Radio />} label="Ja" />
                    <FormControlLabel value="nein" control={<Radio />} label="Nein" />
                </RadioGroup>

                {/* Wenn Ja */}
                {formData.geburtsort_ausserhalb_deutschlands === 'ja' && (
                    <TextField
                        label="Ort"
                        name="geburtsort_ausserhalb_deutschlands_ort"
                        value={formData.geburtsort_ausserhalb_deutschlands_ort || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                        sx={{ mt: 1 }}
                    />
                )}
            </FormControl>

            <Box sx={{ mt: 0 }} />
            <FormControl component="fieldset" margin="normal" fullWidth>
                <FormLabel id="auslandsreise_letzte_drei_monate">
                    Auslandsreisen innerhalb der letzten 3 Monate:
                </FormLabel>

                <RadioGroup
                    name="auslandsreise_letzte_drei_monate"
                    value={formData.auslandsreise_letzte_drei_monate}
                    onChange={handleChange}
                    row
                    sx={{ mt: 1 }}
                >
                    <FormControlLabel value="ja" control={<Radio />} label="Ja" />
                    <FormControlLabel value="nein" control={<Radio />} label="Nein" />
                </RadioGroup>

                {/* Wenn Ja */}
                {formData.auslandsreise_letzte_drei_monate === 'ja' && (
                    <TextField
                        label="Land"
                        name="auslandsreise_letzte_drei_monate_ort"
                        value={formData.auslandsreise_letzte_drei_monate_ort || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                        sx={{ mt: 1 }}
                    />
                )}
            </FormControl>

            <FormControl component="fieldset" margin="normal">
                <FormLabel id="auslandsreise_antibiotika-label">
                    Wurden Antibiotika während dieser Auslandsreise eingenommen?:
                </FormLabel>

                <RadioGroup
                    name="auslandsreise_antibiotika"
                    value={formData.auslandsreise_antibiotika}
                    onChange={handleChange}
                    row
                    sx={{
                        mt: 1,
                    }}
                >
                    <FormControlLabel value="ja" control={<Radio />} label="Ja" />
                    <FormControlLabel value="nein" control={<Radio />} label="Nein" />

                </RadioGroup>
            </FormControl>

            <Box sx={{ mt: 0 }} />
            <FormControl component="fieldset" margin="normal">
                <FormLabel id="auslandsreise_durchfall-label">
                    Kam es zu Durchfall während dieser Auslandsreise?:
                </FormLabel>

                <RadioGroup
                    name="auslandsreise_durchfall"
                    value={formData.auslandsreise_durchfall}
                    onChange={handleChange}
                    row
                    sx={{
                        mt: 1,
                    }}
                >
                    <FormControlLabel value="ja" control={<Radio />} label="Ja" />
                    <FormControlLabel value="nein" control={<Radio />} label="Nein" />
                </RadioGroup>
            </FormControl>

            <Box sx={{ mt: 0 }} />
            <FormControl component="fieldset" margin="normal">
                <FormLabel id="auslandsreise_krankenhaus-label">
                    Haben Sie eine medizinische Einrichtung (Praxis, Krankenhaus) während dieser Auslandsreise besucht?:
                </FormLabel>

                <RadioGroup
                    name="auslandsreise_krankenhaus"
                    value={formData.auslandsreise_krankenhaus}
                    onChange={handleChange}
                    row
                    sx={{
                        mt: 1,
                    }}
                >
                    <FormControlLabel value="ja" control={<Radio />} label="Ja" />
                    <FormControlLabel value="nein" control={<Radio />} label="Nein" />
                </RadioGroup>
            </FormControl>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }} elevation={6}
                    variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            {/* Action Buttons */}
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" color="secondary" onClick={handleClear}>
                    Zurücksetzen
                </Button>
                <Button type="submit" variant="contained" color="success" onClick={handleSubmit}>
                    Speichern
                </Button>
            </Box>
        </Box>
    );
}
