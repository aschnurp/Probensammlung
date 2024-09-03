export type MedicalHistoryData = {
    patient_id: number;
    patient_id_old?: number;
    created_at: string;
    medical_history_text?: string;
    previous_surgeries?: string;
    chronic_conditions?: string;
    allergies?: string;
    medication?: string;

    // Körpermaße und Gesundheitsdaten
    body_size_cm?: number;
    weight_kg?: number;
    body_mass_index?: number;

    // Familiengeschichte
    family_history_neoplastic_disease?: boolean;
    family_history_neoplastic_disease_text?: string;
    number_of_relatives_first_degree?: string;

    // Tumore
    previous_tumour?: boolean;
    previous_tumour_text?: string;
    previous_secondary_tumour?: boolean;
    previous_secondary_tumour_text?: string;

    // Vorerkrankungen
    pre_existing_disease_immunological?: boolean;
    pre_existing_disease_immunological_text?: string;
    pre_existing_liver_disease?: boolean;
    hepatitis_B?: boolean;
    hepatitis_C?: boolean;
    hepatitis_D?: boolean;
    ethyltoxic?: boolean;

    // Kindheitsstadium
    child_stadium?: number;

    // Weitere Vorerkrankungen
    other_pre_existing_diseases?: boolean;
    other_liver_disease?: string;
    other_pre_existing_diseases_1?: string;
    other_pre_existing_diseases_2?: string;
    other_pre_existing_diseases_3?: string;
    other_pre_existing_diseases_4?: string;
    other_pre_existing_diseases_5?: string;

    // Allgemeine Symptome
    reduced_general_state?: boolean;
    loss_of_appetite?: boolean;
    nausea_vomiting?: boolean;
    abdominal_pain?: boolean;
    back_pain?: boolean;
    dyspnoea?: boolean;
    diarrhoea?: boolean;
    constipation?: boolean;
    nocturia?: boolean;
    weight_loss?: boolean;
    fever?: boolean;
    night_sweat?: boolean;
    hepatomegaly_splenomegaly?: boolean;
    ascites?: boolean;
    ascites_severity?: string;
    icterus?: boolean;
    oedema?: boolean;
    further_symptoms?: boolean;
    further_symptoms_text?: string;

    // Diagnosedaten
    diagnosis_date_primary_tumour?: string;
    diagnosis_date_metastasis?: string;
    type_primary_metastasis?: number;
    localisation_of_the_metastasis?: string;

    // Dialyse, Diabetes und Suchmittelmissbrauch
    first_haemodialysis?: string;
    diabetes_type?: number;
    nicotine_abuse?: boolean;
    nicotine_amount_py?: number;
    alcohol_abuse?: boolean;

    // Lungen- und Herz-Kreislauf-Erkrankungen
    pulmonary_pre_existing_diseases?: boolean;
    pulmonary_pre_existing_diseases_text?: string;
    arterial_hypertension?: boolean;
    charlson_comorbidity_index?: number;
    cardiac_event?: boolean;
    peripheral_artery_disease?: boolean;
    cerebrovascular_event?: boolean;
    dementia?: boolean;
    chronic_obstructive_pulmonary_disease?: boolean;
    connective_tissue_disease?: boolean;
    hemiplegia?: boolean;
    previous_operations?: boolean;

    // Verdauungs- und Stoffwechselerkrankungen
    chronic_pancreatitis?: boolean;
    inflammatory_bowel_disease?: boolean;
    dysphagia?: boolean;
    chronic_renal_insufficiency_stage?: number;
    pre_existing_thyroid_disease?: boolean;
    arthrosis?: boolean;
    osteoporosis?: boolean;
    gastrala_ulcera?: boolean;
    dermal_ulcera?: boolean;
    deep_leg_vein_thrombosis?: boolean;

    // Weitere spezifische Erkrankungen
    mental_pre_existing_diseases?: boolean;
    cardiac_event_text?: string;
    acute_pancreatitis?: boolean;
    cholestasis?: boolean;
    cholangitis?: boolean;
    pleural_effusion?: boolean;
    coronary_heart_disease?: boolean;
    cardiac_arrhythmia?: boolean;
    cardiac_arrhythmia_text?: string;
    congestive_heart_failure?: string;
    lipid_metabolism_disorders?: boolean;
    neurological_pre_existing_disease?: boolean;
    neurological_pre_existing_disease_text?: string;
    hiatal_hernia?: boolean;
    diverticulosis?: boolean;
    cholecystolithiasis?: boolean;
    hyperuricaemia_gout?: boolean;
    gastritis?: boolean;
}