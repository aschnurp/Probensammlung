/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.6.2-MariaDB, for osx10.19 (arm64)
--
-- Host: 127.0.0.1    Database: clinical_database_test
-- ------------------------------------------------------
-- Server version	11.6.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `alembic_version`
--

DROP TABLE IF EXISTS `alembic_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chemoterapy`
--

DROP TABLE IF EXISTS `chemoterapy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chemoterapy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `patient_id_old` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `radiotherapy` tinyint(1) DEFAULT NULL,
  `radiation_amount_in_gray` float DEFAULT NULL,
  `chemotherapy` tinyint(1) DEFAULT NULL,
  `number_of_cycles` int(11) DEFAULT NULL,
  `five_fluorouracil` tinyint(1) DEFAULT NULL,
  `capecitabine` tinyint(1) DEFAULT NULL,
  `oxaliplatin` tinyint(1) DEFAULT NULL,
  `cisplatin` tinyint(1) DEFAULT NULL,
  `epirubicin` tinyint(1) DEFAULT NULL,
  `leucovorin` tinyint(1) DEFAULT NULL,
  `doxorubicin` tinyint(1) DEFAULT NULL,
  `sorafenib` tinyint(1) DEFAULT NULL,
  `gemcitabine` tinyint(1) DEFAULT NULL,
  `irinotecan` tinyint(1) DEFAULT NULL,
  `docetaxel` tinyint(1) DEFAULT NULL,
  `paclitaxel` tinyint(1) DEFAULT NULL,
  `carboplatin` tinyint(1) DEFAULT NULL,
  `folic_acid` tinyint(1) DEFAULT NULL,
  `other_chemotherapeutics_i` text DEFAULT NULL,
  `other_chemotherapeutics_ii` text DEFAULT NULL,
  `other_chemotherapeutics_iii` text DEFAULT NULL,
  `specific_antibodies` tinyint(1) DEFAULT NULL,
  `specific_antibodies_text` text DEFAULT NULL,
  `tace` tinyint(1) DEFAULT NULL,
  `rfa` tinyint(1) DEFAULT NULL,
  `tace_cycles` int(11) DEFAULT NULL,
  `rfa_cycles` int(11) DEFAULT NULL,
  `photodynamic_therapy` tinyint(1) DEFAULT NULL,
  `pdt_cycles` int(11) DEFAULT NULL,
  `stable_course` tinyint(1) DEFAULT NULL,
  `progression` tinyint(1) DEFAULT NULL,
  `regression` tinyint(1) DEFAULT NULL,
  `remission` tinyint(1) DEFAULT NULL,
  `tumor_board_decision` tinyint(1) DEFAULT NULL,
  `recommendations_tumor_board` text DEFAULT NULL,
  `implementation_tumor_board` tinyint(1) DEFAULT NULL,
  `dose_according_to_bsa` tinyint(1) DEFAULT NULL,
  `primary_dose_reduction` tinyint(1) DEFAULT NULL,
  `dose_reduction_over_time` tinyint(1) DEFAULT NULL,
  `side_effects_of_cx` tinyint(1) DEFAULT NULL,
  `emesis` tinyint(1) DEFAULT NULL,
  `diarrhea` tinyint(1) DEFAULT NULL,
  `alopecia` tinyint(1) DEFAULT NULL,
  `hand_foot_syndrome` tinyint(1) DEFAULT NULL,
  `bm_depression` tinyint(1) DEFAULT NULL,
  `neurotoxicity` tinyint(1) DEFAULT NULL,
  `ototoxicity` tinyint(1) DEFAULT NULL,
  `ps_deterioration` tinyint(1) DEFAULT NULL,
  `other_side_effects` tinyint(1) DEFAULT NULL,
  `other_side_effects_text` text DEFAULT NULL,
  `ecog_stage` int(11) DEFAULT NULL,
  `karnofsky_index_percent` int(11) DEFAULT NULL,
  `her_2_status` int(11) DEFAULT NULL,
  `microsatellites` int(11) DEFAULT NULL,
  `implementation_of_chemotherapy_uncertain` tinyint(1) DEFAULT NULL,
  `chemoterapy_neoadjuvant` tinyint(4) DEFAULT NULL,
  `chemoterapy_adjuvant` tinyint(4) DEFAULT NULL,
  `chemoterapy_palliativ` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=511 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `child_stadium`
--

DROP TABLE IF EXISTS `child_stadium`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `child_stadium` (
  `child_stadium_id` int(11) NOT NULL AUTO_INCREMENT,
  `child_stadium_definition` text DEFAULT NULL,
  PRIMARY KEY (`child_stadium_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clavien_dindo`
--

DROP TABLE IF EXISTS `clavien_dindo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clavien_dindo` (
  `clavien_dindo_id` int(11) NOT NULL AUTO_INCREMENT,
  `clavien_dindo_grade` text NOT NULL,
  `clavien_dindo_definition` text DEFAULT NULL,
  PRIMARY KEY (`clavien_dindo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `complication`
--

DROP TABLE IF EXISTS `complication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `complication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `duration_of_inpatient_stay_d` float DEFAULT NULL,
  `duration_intermediate_care_d` float DEFAULT NULL,
  `duration_intensive_care_station_d` float DEFAULT NULL,
  `ventilation_duration_h` float DEFAULT NULL,
  `noninvasive_ventilation_duration_h` float DEFAULT NULL,
  `complication_free_progression` tinyint(1) DEFAULT NULL,
  `liver_failure` tinyint(1) DEFAULT NULL,
  `urinary_retention` tinyint(1) DEFAULT NULL,
  `ileus` tinyint(1) DEFAULT NULL,
  `cholascos` tinyint(1) DEFAULT NULL,
  `cholangitis` tinyint(1) DEFAULT NULL,
  `reintubation` tinyint(1) DEFAULT NULL,
  `pneumonia` tinyint(1) DEFAULT NULL,
  `thrombosis` tinyint(1) DEFAULT NULL,
  `embolism` tinyint(1) DEFAULT NULL,
  `postoperative_bleeding` tinyint(1) DEFAULT NULL,
  `pleural_effusion` tinyint(1) DEFAULT NULL,
  `burst_abdomen` tinyint(1) DEFAULT NULL,
  `liver_abscess` tinyint(1) DEFAULT NULL,
  `intraabdomineller_Abszess` tinyint(1) DEFAULT NULL,
  `biliom` tinyint(1) DEFAULT NULL,
  `decubitus` tinyint(1) DEFAULT NULL,
  `decubitus_score` int(11) DEFAULT NULL,
  `secondary_wound_healing` tinyint(1) DEFAULT NULL,
  `multi_organ_failure` tinyint(1) DEFAULT NULL,
  `anastomotic_insufficiency` tinyint(1) DEFAULT NULL,
  `anastomotic_insufficiency_type` text DEFAULT NULL,
  `other_complications` tinyint(1) DEFAULT NULL,
  `other_complications_1` text DEFAULT NULL,
  `other_complications_2` text DEFAULT NULL,
  `other_complications_3` text DEFAULT NULL,
  `other_complications_4` text DEFAULT NULL,
  `other_complications_5` text DEFAULT NULL,
  `other_complications_6` text DEFAULT NULL,
  `thoracic_drainage_for_effusion` tinyint(1) DEFAULT NULL,
  `simplified_acute_physiology_score_average` float DEFAULT NULL,
  `drainage_complication` tinyint(1) DEFAULT NULL,
  `drainage_complication_text` text DEFAULT NULL,
  `endoscopy` tinyint(1) DEFAULT NULL,
  `endoscopic_retrograde_cholangiopancreatography` tinyint(1) DEFAULT NULL,
  `endoscopy_text` text DEFAULT NULL,
  `haemodialysis` tinyint(1) DEFAULT NULL,
  `haemodialysis_h` float DEFAULT NULL,
  `mutation_adjusted_risk_score` tinyint(1) DEFAULT NULL,
  `mutation_adjusted_risk_score_h` float DEFAULT NULL,
  `interventional_drainage` tinyint(1) DEFAULT NULL,
  `re_operation` tinyint(1) DEFAULT NULL,
  `clavien_dindo` int(11) DEFAULT NULL,
  `kidney_insufficiency` tinyint(1) DEFAULT NULL,
  `readmission_to_clinic` tinyint(1) DEFAULT NULL,
  `readmission_to_clinic_date` text DEFAULT NULL,
  `other_complication_management` tinyint(1) DEFAULT NULL,
  `other_complication_management_text` text DEFAULT NULL,
  `relocation_intensive_care_unit` tinyint(1) DEFAULT NULL,
  `relocation_intermediate_care_unit` tinyint(1) DEFAULT NULL,
  `acute_coronary_syndrome` tinyint(1) DEFAULT NULL,
  `sepsis` tinyint(1) DEFAULT NULL,
  `systemic_inflammatory_response_syndrome` tinyint(1) DEFAULT NULL,
  `circulatory_instability` tinyint(1) DEFAULT NULL,
  `reanimation` tinyint(1) DEFAULT NULL,
  `duration_reanimation_min` float DEFAULT NULL,
  `respiratory_failure` tinyint(1) DEFAULT NULL,
  `hollow_organ_perforation` tinyint(1) DEFAULT NULL,
  `which_organ_is_perforated` text DEFAULT NULL,
  `intestinal_passage_disorder` tinyint(1) DEFAULT NULL,
  `ascites_postoperative` tinyint(1) DEFAULT NULL,
  `pancreatitis_postoperative` tinyint(1) DEFAULT NULL,
  `urinary_tract_infection_postoperative` tinyint(1) DEFAULT NULL,
  `delirium` tinyint(1) DEFAULT NULL,
  `delirium_type` text DEFAULT NULL,
  `cholecystitis` tinyint(1) DEFAULT NULL,
  `pancreatic_fistula` tinyint(1) DEFAULT NULL,
  `internal_hernia` tinyint(1) DEFAULT NULL,
  `pleural_empyema` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `decubitus_score` (`decubitus_score`),
  KEY `clavien_dindo` (`clavien_dindo`),
  CONSTRAINT `complication_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient_data` (`patient_id`),
  CONSTRAINT `complication_ibfk_2` FOREIGN KEY (`decubitus_score`) REFERENCES `dekubitus_grade` (`dekubitus_grade_id`),
  CONSTRAINT `complication_ibfk_3` FOREIGN KEY (`clavien_dindo`) REFERENCES `clavien_dindo` (`clavien_dindo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=539 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dekubitus_grade`
--

DROP TABLE IF EXISTS `dekubitus_grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dekubitus_grade` (
  `dekubitus_grade_id` int(11) NOT NULL AUTO_INCREMENT,
  `dekubitus_grade_stadium` text DEFAULT NULL,
  PRIMARY KEY (`dekubitus_grade_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `diabetes_mellitus`
--

DROP TABLE IF EXISTS `diabetes_mellitus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diabetes_mellitus` (
  `diabetes_mellitus_id` int(11) NOT NULL AUTO_INCREMENT,
  `diabetes_mellitus_code` text DEFAULT NULL,
  `diabetes_mellitus_description` text DEFAULT NULL,
  PRIMARY KEY (`diabetes_mellitus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `histology_general`
--

DROP TABLE IF EXISTS `histology_general`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `histology_general` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `patient_id_old` int(11) DEFAULT NULL,
  `pathologist` text DEFAULT NULL,
  `order_number` text DEFAULT NULL,
  `histological_diagnosis` text DEFAULT NULL,
  `histology_summary` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `histology_general_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient_data` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `icd`
--

DROP TABLE IF EXISTS `icd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `icd` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `patient_id_old` int(11) DEFAULT NULL,
  `ICD` int(11) DEFAULT NULL,
  `ICD_discription` text DEFAULT NULL,
  PRIMARY KEY (`id`,`patient_id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `icd_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient_data` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `labour`
--

DROP TABLE IF EXISTS `labour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labour` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_laboratory_analysis` text DEFAULT NULL,
  `ASAT_μmol_per_l` float DEFAULT NULL,
  `ALAT_μmol_per_l` float DEFAULT NULL,
  `AP_μmol_per_l` float DEFAULT NULL,
  `GGT_μmol_per_l` float DEFAULT NULL,
  `Lipase_μmol_per_l` float DEFAULT NULL,
  `Kreatinin_μmol_per_l` float DEFAULT NULL,
  `Bilirubin_μmol_per_l` float DEFAULT NULL,
  `Quickk_percent` float DEFAULT NULL,
  `INR` float DEFAULT NULL,
  `Cholinesterase_μmol_per_l` float DEFAULT NULL,
  `Natrium_mmol_per_l` float DEFAULT NULL,
  `Hämoglobin_mmol_per_l` float DEFAULT NULL,
  `Leukozyten_Gpt_per_l` float DEFAULT NULL,
  `CRP_mg_per_l` float DEFAULT NULL,
  `PCT_ng_ml` float DEFAULT NULL,
  `Albumin_g_per_l` float DEFAULT NULL,
  `Harnstoff_mmol_per_l` float DEFAULT NULL,
  `GFR_ml_per_min` float DEFAULT NULL,
  `MDRD_ml_per_min` float DEFAULT NULL,
  `TSH_mU_per_l` float DEFAULT NULL,
  `HbA1c_percent` float DEFAULT NULL,
  `s_ColLineage` float DEFAULT NULL,
  `s_Generation` float DEFAULT NULL,
  `s_GUID` text DEFAULT NULL,
  `s_Lineage` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `labour_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient_data` (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2145000468 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_history`
--

DROP TABLE IF EXISTS `medical_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `body_size_cm` float DEFAULT NULL,
  `weight_kg` float DEFAULT NULL,
  `body_mass_index` float DEFAULT NULL,
  `family_history_neoplastic_disease` tinyint(1) DEFAULT NULL,
  `family_history_neoplastic_disease_text` text DEFAULT NULL,
  `number_of_relatives_first_degree` text DEFAULT NULL,
  `previous_tumour` tinyint(1) DEFAULT NULL,
  `previous_tumour_text` text DEFAULT NULL,
  `previous_secondary_tumour` tinyint(1) DEFAULT NULL,
  `previous_secondary_tumour_text` text DEFAULT NULL,
  `pre_existing_disease_immunological` tinyint(1) DEFAULT NULL,
  `pre_existing_disease_immunological_text` text DEFAULT NULL,
  `pre_existing_liver_disease` tinyint(1) DEFAULT NULL,
  `hepatitis_B` tinyint(1) DEFAULT NULL,
  `hepatitis_C` tinyint(1) DEFAULT NULL,
  `hepatitis_D` tinyint(1) DEFAULT NULL,
  `ethyltoxic` tinyint(1) DEFAULT NULL,
  `child_stadium` int(11) DEFAULT NULL,
  `other_pre_existing_diseases` tinyint(1) DEFAULT NULL,
  `other_liver_disease` text DEFAULT NULL,
  `other_pre_existing_diseases_1` text DEFAULT NULL,
  `other_pre_existing_diseases_2` text DEFAULT NULL,
  `other_pre_existing_diseases_3` text DEFAULT NULL,
  `other_pre_existing_diseases_4` text DEFAULT NULL,
  `other_pre_existing_diseases_5` text DEFAULT NULL,
  `reduced_general_state` tinyint(1) DEFAULT NULL,
  `loss_of_appetite` tinyint(1) DEFAULT NULL,
  `nausea_vomiting` tinyint(1) DEFAULT NULL,
  `abdominal_pain` tinyint(1) DEFAULT NULL,
  `back_pain` tinyint(1) DEFAULT NULL,
  `dyspnoea` tinyint(1) DEFAULT NULL,
  `diarrhoea` tinyint(1) DEFAULT NULL,
  `constipation` tinyint(1) DEFAULT NULL,
  `nocturia` tinyint(1) DEFAULT NULL,
  `weight_loss` tinyint(1) DEFAULT NULL,
  `fever` tinyint(1) DEFAULT NULL,
  `night_sweat` tinyint(1) DEFAULT NULL,
  `hepatomegaly_splenomegaly` tinyint(1) DEFAULT NULL,
  `ascites` tinyint(1) DEFAULT NULL,
  `ascites_severity` text DEFAULT NULL,
  `icterus` tinyint(1) DEFAULT NULL,
  `oedema` tinyint(1) DEFAULT NULL,
  `further_symptoms` tinyint(1) DEFAULT NULL,
  `further_symptoms_text` text DEFAULT NULL,
  `diagnosis_date_primary_tumour` text DEFAULT NULL,
  `diagnosis_date_metastasis` text DEFAULT NULL,
  `type_primary_metastasis` int(11) DEFAULT NULL,
  `localisation_of_the_metastasis` text DEFAULT NULL,
  `first_haemodialysis` text DEFAULT NULL,
  `diabetes_type` int(11) DEFAULT NULL,
  `nicotine_abuse` tinyint(1) DEFAULT NULL,
  `nicotine_amount_py` int(11) DEFAULT NULL,
  `alcohol_abuse` tinyint(1) DEFAULT NULL,
  `pulmonary_pre_existing_diseases` tinyint(1) DEFAULT NULL,
  `pulmonary_pre_existing_diseases_text` text DEFAULT NULL,
  `arterial_hypertension` tinyint(1) DEFAULT NULL,
  `charlson_comorbidity_index` int(11) DEFAULT NULL,
  `cardiac_event` tinyint(1) DEFAULT NULL,
  `peripheral_artery_disease` tinyint(1) DEFAULT NULL,
  `cerebrovascular_event` tinyint(1) DEFAULT NULL,
  `dementia` tinyint(1) DEFAULT NULL,
  `chronic_obstructive_pulmonary_disease` tinyint(1) DEFAULT NULL,
  `connective_tissue_disease` tinyint(1) DEFAULT NULL,
  `hemiplegia` tinyint(1) DEFAULT NULL,
  `previous_operations` tinyint(1) DEFAULT NULL,
  `chronic_pancreatitis` tinyint(1) DEFAULT NULL,
  `inflammatory_bowel_disease` tinyint(1) DEFAULT NULL,
  `dysphagia` tinyint(1) DEFAULT NULL,
  `chronic_renal_insufficiency_stage` int(11) DEFAULT NULL,
  `pre_existing_thyroid_disease` tinyint(1) DEFAULT NULL,
  `arthrosis` tinyint(1) DEFAULT NULL,
  `osteoporosis` tinyint(1) DEFAULT NULL,
  `gastrala_ulcera` tinyint(1) DEFAULT NULL,
  `dermal_ulcera` tinyint(1) DEFAULT NULL,
  `deep_leg_vein_thrombosis` tinyint(1) DEFAULT NULL,
  `mental_pre_existing_diseases` tinyint(1) DEFAULT NULL,
  `cardiac_event_text` text DEFAULT NULL,
  `acute_pancreatitis` tinyint(1) DEFAULT NULL,
  `cholestasis` tinyint(1) DEFAULT NULL,
  `cholangitis` tinyint(1) DEFAULT NULL,
  `pleural_effusion` tinyint(1) DEFAULT NULL,
  `coronary_heart_disease` tinyint(1) DEFAULT NULL,
  `cardiac_arrhythmia` tinyint(1) DEFAULT NULL,
  `cardiac_arrhythmia_text` text DEFAULT NULL,
  `congestive_heart_failure` text DEFAULT NULL,
  `lipid_metabolism_disorders` tinyint(1) DEFAULT NULL,
  `neurological_pre_existing_disease` tinyint(1) DEFAULT NULL,
  `neurological_pre_existing_disease_text` text DEFAULT NULL,
  `hiatal_hernia` tinyint(1) DEFAULT NULL,
  `diverticulosis` tinyint(1) DEFAULT NULL,
  `cholecystolithiasis` tinyint(1) DEFAULT NULL,
  `hyperuricaemia_gout` tinyint(1) DEFAULT NULL,
  `gastritis` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `child_stadium` (`child_stadium`),
  KEY `type_primary_metastasis` (`type_primary_metastasis`),
  KEY `diabetes_type` (`diabetes_type`),
  CONSTRAINT `medical_history_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient_data` (`patient_id`),
  CONSTRAINT `medical_history_ibfk_2` FOREIGN KEY (`child_stadium`) REFERENCES `child_stadium` (`child_stadium_id`),
  CONSTRAINT `medical_history_ibfk_3` FOREIGN KEY (`type_primary_metastasis`) REFERENCES `metastases` (`metastasen_id`),
  CONSTRAINT `medical_history_ibfk_4` FOREIGN KEY (`diabetes_type`) REFERENCES `diabetes_mellitus` (`diabetes_mellitus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=727 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medication`
--

DROP TABLE IF EXISTS `medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `ASS` tinyint(1) DEFAULT NULL,
  `Plavix` tinyint(1) DEFAULT NULL,
  `Anti_Xa` tinyint(1) DEFAULT NULL,
  `Falithrom_Marcumar` tinyint(1) DEFAULT NULL,
  `NSAR` tinyint(1) DEFAULT NULL,
  `Steroide` tinyint(1) DEFAULT NULL,
  `Steroide_Tagesdosis` float DEFAULT NULL,
  `Antidepressiva` tinyint(1) DEFAULT NULL,
  `Antihypertensiva` tinyint(1) DEFAULT NULL,
  `Anzahl_der_Antihypertensiva` tinyint(4) DEFAULT NULL,
  `Thyreostatika` tinyint(1) DEFAULT NULL,
  `Schilddrüsenhormone` tinyint(1) DEFAULT NULL,
  `Protonenpumpeninhibitoren` tinyint(1) DEFAULT NULL,
  `Urikostatika` tinyint(1) DEFAULT NULL,
  `orale_Antidiabetika` tinyint(1) DEFAULT NULL,
  `Insulin` tinyint(1) DEFAULT NULL,
  `Insulin_Tagesdosis` int(11) DEFAULT NULL,
  `inhalative_Bronchodilatatoren` tinyint(1) DEFAULT NULL,
  `weitere_Medikation` tinyint(1) DEFAULT NULL,
  `weitere_Medikation_1_Text` text DEFAULT NULL,
  `Statine` tinyint(1) DEFAULT NULL,
  `Diuretika` tinyint(1) DEFAULT NULL,
  `weitere_Medikation_2` tinyint(1) DEFAULT NULL,
  `weitere_Medikation_2_Text` text DEFAULT NULL,
  `weitere_Medikation_3` tinyint(1) DEFAULT NULL,
  `weitere_Medikation_3_Text` text DEFAULT NULL,
  `weitere_Medikation_4` tinyint(1) DEFAULT NULL,
  `weitere_Medikation_4_Text` text DEFAULT NULL,
  `weitere_Medikation_5` tinyint(1) DEFAULT NULL,
  `weitere_Medikation_5_Text` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `medication_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient_data` (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=660 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `metastases`
--

DROP TABLE IF EXISTS `metastases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `metastases` (
  `metastasen_id` int(11) NOT NULL AUTO_INCREMENT,
  `metastasen_timepoint` text DEFAULT NULL,
  PRIMARY KEY (`metastasen_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_data`
--

DROP TABLE IF EXISTS `patient_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_data` (
  `patient_id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id_old` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `sex` int(11) DEFAULT NULL,
  `age_at_surgery` int(11) DEFAULT NULL,
  PRIMARY KEY (`patient_id`),
  KEY `sex` (`sex`),
  CONSTRAINT `patient_data_ibfk_1` FOREIGN KEY (`sex`) REFERENCES `sex` (`sex_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7842 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `search_numbers`
--

DROP TABLE IF EXISTS `search_numbers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `search_numbers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total_searches` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sex`
--

DROP TABLE IF EXISTS `sex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sex` (
  `sex_id` int(11) NOT NULL AUTO_INCREMENT,
  `sex_category` text DEFAULT NULL,
  PRIMARY KEY (`sex_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2024-12-04 10:50:11
