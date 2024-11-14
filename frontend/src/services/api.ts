import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; 

//Get Routes
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

//Post Routes

export const postSerumEntry = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/new_data/serum`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching patient count:', error);
        throw error;
    }
};

