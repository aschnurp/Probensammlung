import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; 

//Get number of content entrys in table
export const getTableData = async (tableName: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/table/data`, {
            params: {
                table_name: tableName,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching table data:', error);
        throw error;
    }
};

export const getPatientCount = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/number/patients`);
        return response.data;  
    } catch (error) {
        console.error('Error fetching patient count:', error);
        throw error; 
    }
};

export const getSerumCount = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/number/serumproben`);
        return response.data;  
    } catch (error) {
        console.error('Error fetching patient count:', error);
        throw error; 
    }
};

export const getGewebeCount = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/number/gewebeproben`);
        return response.data;  
    } catch (error) {
        console.error('Error fetching patient count:', error);
        throw error; 
    }
};

export const getUrinCount = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/number/urinproben`);
        return response.data;  
    } catch (error) {
        console.error('Error fetching patient count:', error);
        throw error; 
    }
};

export const getParaffinCount = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/number/paraffinproben`);
        return response.data;  
    } catch (error) {
        console.error('Error fetching patient count:', error);
        throw error; 
    }
};

export const getGalleCount = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/number/galleproben`);
        return response.data;  
    } catch (error) {
        console.error('Error fetching patient count:', error);
        throw error; 
    }
};

export const getStuhlCount = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/number/stuhlproben`);
        return response.data;  
    } catch (error) {
        console.error('Error fetching patient count:', error);
        throw error; 
    }
};

export const getEdtaplasmaCount = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/number/edtaplasmaproben`);
        return response.data;  
    } catch (error) {
        console.error('Error fetching patient count:', error);
        throw error; 
    }
};

// patient specific call of data
export const getPatientParaffinCount = async (patientID: string) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/number/patient/paraffinentries`,
            { params: { patient_Id_intern: patientID } }
        );
        return response.data.count;
    } catch (error) {
        console.error('Error fetching paraffin count:', error);
        throw error;
    }
};

export const getPatientSerumCount = async (patientID: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/number/patient/serumentries`,
        { params: { patient_Id_intern: patientID } }
        );
        return response.data.count;  
    } catch (error) {
        console.error('Error fetching - count:', error);
        throw error; 
    }
};

export const getPatientGewebeCount = async (patientID: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/number/patient/gewebeentries`,
        { params: { patient_Id_intern: patientID } });
        return response.data.count;  
    } catch (error) {
        console.error('Error fetching - count:', error);
        throw error; 
    }
};

export const getPatientUrinCount = async (patientID: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/number/patient/urinentries`,
        { params: { patient_Id_intern: patientID } });
        return response.data.count;  
    } catch (error) {
        console.error('Error fetching - count:', error);
        throw error; 
    }
};



