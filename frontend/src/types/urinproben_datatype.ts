export type urinprobenData = {
    barcode_id?: string;
    patient_Id_intern?: string;
    created_at: string;	
    probenart?: string;
    untergeordnete_probenart?: string;
    uebergeordnete_probenart?: string; 	
    boxnummer?: number; 
    boxzeile?: string;
    boxspalte?: number;	
    lagerraum?: string;	
    anmerkungen?: string;
    abholer?: string;	
}