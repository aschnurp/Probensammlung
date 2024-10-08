
"""init

Revision ID: e90534b62244
Revises: 
Create Date: 2024-08-23 10:05:49.686642

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = 'e90534b62244'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('child_stadium',
    sa.Column('child_stadium_id', sa.Integer(), nullable=False),
    sa.Column('child_stadium_definition', mysql.TEXT(), nullable=True),
    sa.PrimaryKeyConstraint('child_stadium_id')
    )
    op.create_table('clavien_dindo',
    sa.Column('clavien_dindo_id', sa.Integer(), nullable=False),
    sa.Column('clavien_dindo_grade', mysql.TEXT(), nullable=False),
    sa.Column('clavien_dindo_definition', mysql.TEXT(), nullable=True),
    sa.PrimaryKeyConstraint('clavien_dindo_id')
    )
    op.create_table('dekubitus_grade',
    sa.Column('dekubitus_grade_id', sa.Integer(), nullable=False),
    sa.Column('dekubitus_grade_stadium', mysql.TEXT(), nullable=True),
    sa.PrimaryKeyConstraint('dekubitus_grade_id')
    )
    op.create_table('diabetes_mellitus',
    sa.Column('diabetes_mellitus_id', sa.Integer(), nullable=False),
    sa.Column('diabetes_mellitus_code', mysql.TEXT(), nullable=True),
    sa.Column('diabetes_mellitus_description', mysql.TEXT(), nullable=True),
    sa.PrimaryKeyConstraint('diabetes_mellitus_id')
    )
    op.create_table('metastases',
    sa.Column('metastasen_id', sa.Integer(), nullable=False),
    sa.Column('metastasen_timepoint', mysql.TEXT(), nullable=True),
    sa.PrimaryKeyConstraint('metastasen_id')
    )
    op.create_table('sex',
    sa.Column('sex_id', sa.Integer(), nullable=False),
    sa.Column('sex_category', mysql.TEXT(), nullable=True),
    sa.PrimaryKeyConstraint('sex_id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', mysql.TEXT(), nullable=False),
    sa.Column('password', mysql.TEXT(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('patient_data',
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.Column('patient_id_old', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('sex', sa.Integer(), nullable=True),
    sa.Column('age_at_surgery', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['sex'], ['sex.sex_id'], ),
    sa.PrimaryKeyConstraint('patient_id')
    )
    op.create_table('complication',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.Column('patient_id_old', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('duration_of_inpatient_stay_d', mysql.FLOAT(), nullable=True),
    sa.Column('duration_intermediate_care_d', mysql.FLOAT(), nullable=True),
    sa.Column('duration_intensive_care_station_d', mysql.FLOAT(), nullable=True),
    sa.Column('ventilation_duration_h', mysql.FLOAT(), nullable=True),
    sa.Column('noninvasive_ventilation_duration_h', mysql.FLOAT(), nullable=True),
    sa.Column('complication_free_progression', sa.Boolean(), nullable=True),
    sa.Column('liver_failure', sa.Boolean(), nullable=True),
    sa.Column('urinary_retention', sa.Boolean(), nullable=True),
    sa.Column('ileus', sa.Boolean(), nullable=True),
    sa.Column('cholascos', sa.Boolean(), nullable=True),
    sa.Column('cholangitis', sa.Boolean(), nullable=True),
    sa.Column('reintubation', sa.Boolean(), nullable=True),
    sa.Column('pneumonia', sa.Boolean(), nullable=True),
    sa.Column('thrombosis', sa.Boolean(), nullable=True),
    sa.Column('embolism', sa.Boolean(), nullable=True),
    sa.Column('postoperative_bleeding', sa.Boolean(), nullable=True),
    sa.Column('pleural_effusion', sa.Boolean(), nullable=True),
    sa.Column('burst_abdomen', sa.Boolean(), nullable=True),
    sa.Column('liver_abscess', sa.Boolean(), nullable=True),
    sa.Column('intraabdomineller_Abszess', sa.Boolean(), nullable=True),
    sa.Column('biliom', sa.Boolean(), nullable=True),
    sa.Column('decubitus', sa.Boolean(), nullable=True),
    sa.Column('decubitus_score', sa.Integer(), nullable=True),
    sa.Column('secondary_wound_healing', sa.Boolean(), nullable=True),
    sa.Column('multi_organ_failure', sa.Boolean(), nullable=True),
    sa.Column('anastomotic_insufficiency', sa.Boolean(), nullable=True),
    sa.Column('anastomotic_insufficiency_type', mysql.TEXT(), nullable=True),
    sa.Column('other_complications', sa.Boolean(), nullable=True),
    sa.Column('other_complications_1', mysql.TEXT(), nullable=True),
    sa.Column('other_complications_2', mysql.TEXT(), nullable=True),
    sa.Column('other_complications_3', mysql.TEXT(), nullable=True),
    sa.Column('other_complications_4', mysql.TEXT(), nullable=True),
    sa.Column('other_complications_5', mysql.TEXT(), nullable=True),
    sa.Column('other_complications_6', mysql.TEXT(), nullable=True),
    sa.Column('thoracic_drainage_for_effusion', sa.Boolean(), nullable=True),
    sa.Column('simplified_acute_physiology_score_average', mysql.FLOAT(), nullable=True),
    sa.Column('drainage_complication', sa.Boolean(), nullable=True),
    sa.Column('drainage_complication_text', mysql.TEXT(), nullable=True),
    sa.Column('endoscopy', sa.Boolean(), nullable=True),
    sa.Column('endoscopic_retrograde_cholangiopancreatography', sa.Boolean(), nullable=True),
    sa.Column('endoscopy_text', mysql.TEXT(), nullable=True),
    sa.Column('haemodialysis', sa.Boolean(), nullable=True),
    sa.Column('haemodialysis_h', mysql.FLOAT(), nullable=True),
    sa.Column('mutation_adjusted_risk_score', sa.Boolean(), nullable=True),
    sa.Column('mutation_adjusted_risk_score_h', mysql.FLOAT(), nullable=True),
    sa.Column('interventional_drainage', sa.Boolean(), nullable=True),
    sa.Column('re_operation', sa.Boolean(), nullable=True),
    sa.Column('clavien_dindo', sa.Integer(), nullable=True),
    sa.Column('kidney_insufficiency', sa.Boolean(), nullable=True),
    sa.Column('readmission_to_clinic', sa.Boolean(), nullable=True),
    sa.Column('readmission_to_clinic_date', mysql.TEXT(), nullable=True),
    sa.Column('other_complication_management', sa.Boolean(), nullable=True),
    sa.Column('other_complication_management_text', mysql.TEXT(), nullable=True),
    sa.Column('relocation_intensive_care_unit', sa.Boolean(), nullable=True),
    sa.Column('relocation_intermediate_care_unit', sa.Boolean(), nullable=True),
    sa.Column('acute_coronary_syndrome', sa.Boolean(), nullable=True),
    sa.Column('sepsis', sa.Boolean(), nullable=True),
    sa.Column('systemic_inflammatory_response_syndrome', sa.Boolean(), nullable=True),
    sa.Column('circulatory_instability', sa.Boolean(), nullable=True),
    sa.Column('reanimation', sa.Boolean(), nullable=True),
    sa.Column('duration_reanimation_min', mysql.FLOAT(), nullable=True),
    sa.Column('respiratory_failure', sa.Boolean(), nullable=True),
    sa.Column('hollow_organ_perforation', sa.Boolean(), nullable=True),
    sa.Column('which_organ_is_perforated', mysql.TEXT(), nullable=True),
    sa.Column('intestinal_passage_disorder', sa.Boolean(), nullable=True),
    sa.Column('ascites_postoperative', sa.Boolean(), nullable=True),
    sa.Column('pancreatitis_postoperative', sa.Boolean(), nullable=True),
    sa.Column('urinary_tract_infection_postoperative', sa.Boolean(), nullable=True),
    sa.Column('delirium', sa.Boolean(), nullable=True),
    sa.Column('delirium_type', mysql.TEXT(), nullable=True),
    sa.Column('cholecystitis', sa.Boolean(), nullable=True),
    sa.Column('pancreatic_fistula', sa.Boolean(), nullable=True),
    sa.Column('internal_hernia', sa.Boolean(), nullable=True),
    sa.Column('pleural_empyema', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['clavien_dindo'], ['clavien_dindo.clavien_dindo_id'], ),
    sa.ForeignKeyConstraint(['decubitus_score'], ['dekubitus_grade.dekubitus_grade_id'], ),
    sa.ForeignKeyConstraint(['patient_id'], ['patient_data.patient_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('histology_general',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.Column('patient_id_old', sa.Integer(), nullable=True),
    sa.Column('pathologist', mysql.TEXT(), nullable=True),
    sa.Column('order_number', mysql.TEXT(), nullable=True),
    sa.Column('histological_diagnosis', mysql.TEXT(), nullable=True),
    sa.Column('histology_summary', mysql.TEXT(), nullable=True),
    sa.ForeignKeyConstraint(['patient_id'], ['patient_data.patient_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('icd',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.Column('patient_id_old', sa.Integer(), nullable=True),
    sa.Column('ICD', sa.Integer(), nullable=True),
    sa.Column('ICD_discription', mysql.TEXT(), nullable=True),
    sa.ForeignKeyConstraint(['patient_id'], ['patient_data.patient_id'], ),
    sa.PrimaryKeyConstraint('id', 'patient_id')
    )
    op.create_table('labour',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.Column('patient_id_old', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('date_laboratory_analysis', mysql.TEXT(), nullable=True),
    sa.Column('ASAT_μmol_per_l', mysql.FLOAT(), nullable=True),
    sa.Column('ALAT_μmol_per_l', mysql.FLOAT(), nullable=True),
    sa.Column('AP_μmol_per_l', mysql.FLOAT(), nullable=True),
    sa.Column('GGT_μmol_per_l', mysql.FLOAT(), nullable=True),
    sa.Column('Lipase_μmol_per_l', mysql.FLOAT(), nullable=True),
    sa.Column('Kreatinin_μmol_per_l', mysql.FLOAT(), nullable=True),
    sa.Column('Bilirubin_μmol_per_l', mysql.FLOAT(), nullable=True),
    sa.Column('Quickk_percent', mysql.FLOAT(), nullable=True),
    sa.Column('INR', mysql.FLOAT(), nullable=True),
    sa.Column('Cholinesterase_μmol_per_l', mysql.FLOAT(), nullable=True),
    sa.Column('Natrium_mmol_per_l', mysql.FLOAT(), nullable=True),
    sa.Column('Hämoglobin_mmol_per_l', mysql.FLOAT(), nullable=True),
    sa.Column('Leukozyten_Gpt_per_l', mysql.FLOAT(), nullable=True),
    sa.Column('CRP_mg_per_l', mysql.FLOAT(), nullable=True),
    sa.Column('PCT_ng_ml', mysql.FLOAT(), nullable=True),
    sa.Column('Albumin_g_per_l', mysql.FLOAT(), nullable=True),
    sa.Column('Harnstoff_mmol_per_l', mysql.FLOAT(), nullable=True),
    sa.Column('GFR_ml_per_min', mysql.FLOAT(), nullable=True),
    sa.Column('MDRD_ml_per_min', mysql.FLOAT(), nullable=True),
    sa.Column('TSH_mU_per_l', mysql.FLOAT(), nullable=True),
    sa.Column('HbA1c_percent', mysql.FLOAT(), nullable=True),
    sa.Column('s_ColLineage', mysql.FLOAT(), nullable=True),
    sa.Column('s_Generation', mysql.FLOAT(), nullable=True),
    sa.Column('s_GUID', mysql.TEXT(), nullable=True),
    sa.Column('s_Lineage', mysql.FLOAT(), nullable=True),
    sa.ForeignKeyConstraint(['patient_id'], ['patient_data.patient_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('medical_history',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.Column('patient_id_old', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('body_size_cm', mysql.FLOAT(), nullable=True),
    sa.Column('weight_kg', mysql.FLOAT(), nullable=True),
    sa.Column('body_mass_index', mysql.FLOAT(), nullable=True),
    sa.Column('family_history_neoplastic_disease', sa.Boolean(), nullable=True),
    sa.Column('family_history_neoplastic_disease_text', mysql.TEXT(), nullable=True),
    sa.Column('number_of_relatives_first_degree', mysql.TEXT(), nullable=True),
    sa.Column('previous_tumour', sa.Boolean(), nullable=True),
    sa.Column('previous_tumour_text', mysql.TEXT(), nullable=True),
    sa.Column('previous_secondary_tumour', sa.Boolean(), nullable=True),
    sa.Column('previous_secondary_tumour_text', mysql.TEXT(), nullable=True),
    sa.Column('pre_existing_disease_immunological', sa.Boolean(), nullable=True),
    sa.Column('pre_existing_disease_immunological_text', mysql.TEXT(), nullable=True),
    sa.Column('pre_existing_liver_disease', sa.Boolean(), nullable=True),
    sa.Column('hepatitis_B', sa.Boolean(), nullable=True),
    sa.Column('hepatitis_C', sa.Boolean(), nullable=True),
    sa.Column('hepatitis_D', sa.Boolean(), nullable=True),
    sa.Column('ethyltoxic', sa.Boolean(), nullable=True),
    sa.Column('child_stadium', sa.Integer(), nullable=True),
    sa.Column('other_pre_existing_diseases', sa.Boolean(), nullable=True),
    sa.Column('other_liver_disease', mysql.TEXT(), nullable=True),
    sa.Column('other_pre_existing_diseases_1', mysql.TEXT(), nullable=True),
    sa.Column('other_pre_existing_diseases_2', mysql.TEXT(), nullable=True),
    sa.Column('other_pre_existing_diseases_3', mysql.TEXT(), nullable=True),
    sa.Column('other_pre_existing_diseases_4', mysql.TEXT(), nullable=True),
    sa.Column('other_pre_existing_diseases_5', mysql.TEXT(), nullable=True),
    sa.Column('reduced_general_state', sa.Boolean(), nullable=True),
    sa.Column('loss_of_appetite', sa.Boolean(), nullable=True),
    sa.Column('nausea_vomiting', sa.Boolean(), nullable=True),
    sa.Column('abdominal_pain', sa.Boolean(), nullable=True),
    sa.Column('back_pain', sa.Boolean(), nullable=True),
    sa.Column('dyspnoea', sa.Boolean(), nullable=True),
    sa.Column('diarrhoea', sa.Boolean(), nullable=True),
    sa.Column('constipation', sa.Boolean(), nullable=True),
    sa.Column('nocturia', sa.Boolean(), nullable=True),
    sa.Column('weight_loss', sa.Boolean(), nullable=True),
    sa.Column('fever', sa.Boolean(), nullable=True),
    sa.Column('night_sweat', sa.Boolean(), nullable=True),
    sa.Column('hepatomegaly_splenomegaly', sa.Boolean(), nullable=True),
    sa.Column('ascites', sa.Boolean(), nullable=True),
    sa.Column('ascites_severity', mysql.TEXT(), nullable=True),
    sa.Column('icterus', sa.Boolean(), nullable=True),
    sa.Column('oedema', sa.Boolean(), nullable=True),
    sa.Column('further_symptoms', sa.Boolean(), nullable=True),
    sa.Column('further_symptoms_text', mysql.TEXT(), nullable=True),
    sa.Column('diagnosis_date_primary_tumour', mysql.TEXT(), nullable=True),
    sa.Column('diagnosis_date_metastasis', mysql.TEXT(), nullable=True),
    sa.Column('type_primary_metastasis', sa.Integer(), nullable=True),
    sa.Column('localisation_of_the_metastasis', mysql.TEXT(), nullable=True),
    sa.Column('first_haemodialysis', mysql.TEXT(), nullable=True),
    sa.Column('diabetes_type', sa.Integer(), nullable=True),
    sa.Column('nicotine_abuse', sa.Boolean(), nullable=True),
    sa.Column('nicotine_amount_py', sa.Integer(), nullable=True),
    sa.Column('alcohol_abuse', sa.Boolean(), nullable=True),
    sa.Column('pulmonary_pre_existing_diseases', sa.Boolean(), nullable=True),
    sa.Column('pulmonary_pre_existing_diseases_text', mysql.TEXT(), nullable=True),
    sa.Column('arterial_hypertension', sa.Boolean(), nullable=True),
    sa.Column('charlson_comorbidity_index', sa.Integer(), nullable=True),
    sa.Column('cardiac_event', sa.Boolean(), nullable=True),
    sa.Column('peripheral_artery_disease', sa.Boolean(), nullable=True),
    sa.Column('cerebrovascular_event', sa.Boolean(), nullable=True),
    sa.Column('dementia', sa.Boolean(), nullable=True),
    sa.Column('chronic_obstructive_pulmonary_disease', sa.Boolean(), nullable=True),
    sa.Column('connective_tissue_disease', sa.Boolean(), nullable=True),
    sa.Column('hemiplegia', sa.Boolean(), nullable=True),
    sa.Column('previous_operations', sa.Boolean(), nullable=True),
    sa.Column('chronic_pancreatitis', sa.Boolean(), nullable=True),
    sa.Column('inflammatory_bowel_disease', sa.Boolean(), nullable=True),
    sa.Column('dysphagia', sa.Boolean(), nullable=True),
    sa.Column('chronic_renal_insufficiency_stage', sa.Integer(), nullable=True),
    sa.Column('pre_existing_thyroid_disease', sa.Boolean(), nullable=True),
    sa.Column('arthrosis', sa.Boolean(), nullable=True),
    sa.Column('osteoporosis', sa.Boolean(), nullable=True),
    sa.Column('gastrala_ulcera', sa.Boolean(), nullable=True),
    sa.Column('dermal_ulcera', sa.Boolean(), nullable=True),
    sa.Column('deep_leg_vein_thrombosis', sa.Boolean(), nullable=True),
    sa.Column('mental_pre_existing_diseases', sa.Boolean(), nullable=True),
    sa.Column('cardiac_event_text', mysql.TEXT(), nullable=True),
    sa.Column('acute_pancreatitis', sa.Boolean(), nullable=True),
    sa.Column('cholestasis', sa.Boolean(), nullable=True),
    sa.Column('cholangitis', sa.Boolean(), nullable=True),
    sa.Column('pleural_effusion', sa.Boolean(), nullable=True),
    sa.Column('coronary_heart_disease', sa.Boolean(), nullable=True),
    sa.Column('cardiac_arrhythmia', sa.Boolean(), nullable=True),
    sa.Column('cardiac_arrhythmia_text', mysql.TEXT(), nullable=True),
    sa.Column('congestive_heart_failure', mysql.TEXT(), nullable=True),
    sa.Column('lipid_metabolism_disorders', sa.Boolean(), nullable=True),
    sa.Column('neurological_pre_existing_disease', sa.Boolean(), nullable=True),
    sa.Column('neurological_pre_existing_disease_text', mysql.TEXT(), nullable=True),
    sa.Column('hiatal_hernia', sa.Boolean(), nullable=True),
    sa.Column('diverticulosis', sa.Boolean(), nullable=True),
    sa.Column('cholecystolithiasis', sa.Boolean(), nullable=True),
    sa.Column('hyperuricaemia_gout', sa.Boolean(), nullable=True),
    sa.Column('gastritis', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['child_stadium'], ['child_stadium.child_stadium_id'], ),
    sa.ForeignKeyConstraint(['diabetes_type'], ['diabetes_mellitus.diabetes_mellitus_id'], ),
    sa.ForeignKeyConstraint(['patient_id'], ['patient_data.patient_id'], ),
    sa.ForeignKeyConstraint(['type_primary_metastasis'], ['metastases.metastasen_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('medication',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.Column('patient_id_old', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('ASS', sa.Boolean(), nullable=True),
    sa.Column('Plavix', sa.Boolean(), nullable=True),
    sa.Column('Anti_Xa', sa.Boolean(), nullable=True),
    sa.Column('Falithrom_Marcumar', sa.Boolean(), nullable=True),
    sa.Column('NSAR', sa.Boolean(), nullable=True),
    sa.Column('Steroide', sa.Boolean(), nullable=True),
    sa.Column('Steroide_Tagesdosis', mysql.FLOAT(), nullable=True),
    sa.Column('Antidepressiva', sa.Boolean(), nullable=True),
    sa.Column('Antihypertensiva', sa.Boolean(), nullable=True),
    sa.Column('Anzahl_der_Antihypertensiva', mysql.TINYINT(), nullable=True),
    sa.Column('Thyreostatika', sa.Boolean(), nullable=True),
    sa.Column('Schilddrüsenhormone', sa.Boolean(), nullable=True),
    sa.Column('Protonenpumpeninhibitoren', sa.Boolean(), nullable=True),
    sa.Column('Urikostatika', sa.Boolean(), nullable=True),
    sa.Column('orale_Antidiabetika', sa.Boolean(), nullable=True),
    sa.Column('Insulin', sa.Boolean(), nullable=True),
    sa.Column('Insulin_Tagesdosis', sa.Integer(), nullable=True),
    sa.Column('inhalative_Bronchodilatatoren', sa.Boolean(), nullable=True),
    sa.Column('weitere_Medikation', sa.Boolean(), nullable=True),
    sa.Column('weitere_Medikation_1_Text', mysql.TEXT(), nullable=True),
    sa.Column('Statine', sa.Boolean(), nullable=True),
    sa.Column('Diuretika', sa.Boolean(), nullable=True),
    sa.Column('weitere_Medikation_2', sa.Boolean(), nullable=True),
    sa.Column('weitere_Medikation_2_Text', mysql.TEXT(), nullable=True),
    sa.Column('weitere_Medikation_3', sa.Boolean(), nullable=True),
    sa.Column('weitere_Medikation_3_Text', mysql.TEXT(), nullable=True),
    sa.Column('weitere_Medikation_4', sa.Boolean(), nullable=True),
    sa.Column('weitere_Medikation_4_Text', mysql.TEXT(), nullable=True),
    sa.Column('weitere_Medikation_5', sa.Boolean(), nullable=True),
    sa.Column('weitere_Medikation_5_Text', mysql.TEXT(), nullable=True),
    sa.ForeignKeyConstraint(['patient_id'], ['patient_data.patient_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('medication')
    op.drop_table('medical_history')
    op.drop_table('labour')
    op.drop_table('icd')
    op.drop_table('histology_general')
    op.drop_table('complication')
    op.drop_table('patient_data')
    op.drop_table('users')
    op.drop_table('sex')
    op.drop_table('metastases')
    op.drop_table('diabetes_mellitus')
    op.drop_table('dekubitus_grade')
    op.drop_table('clavien_dindo')
    op.drop_table('child_stadium')
    # ### end Alembic commands ###
