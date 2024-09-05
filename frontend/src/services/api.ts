import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; 


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
        return response.data;  // Gib die Daten zurück, um sie in der Komponente zu verwenden
    } catch (error) {
        console.error('Error fetching patient count:', error);
        throw error; // Wirf den Fehler, damit er in der Komponente behandelt werden kann
    }
};

export const getSerumCount = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/number/serumproben`);
        return response.data;  // Gib die Daten zurück, um sie in der Komponente zu verwenden
    } catch (error) {
        console.error('Error fetching patient count:', error);
        throw error; // Wirf den Fehler, damit er in der Komponente behandelt werden kann
    }
};

export const getGewebeCount = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/number/gewebeproben`);
        return response.data;  // Gib die Daten zurück, um sie in der Komponente zu verwenden
    } catch (error) {
        console.error('Error fetching patient count:', error);
        throw error; // Wirf den Fehler, damit er in der Komponente behandelt werden kann
    }
};

export const getUrinCount = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/number/urinproben`);
        return response.data;  // Gib die Daten zurück, um sie in der Komponente zu verwenden
    } catch (error) {
        console.error('Error fetching patient count:', error);
        throw error; // Wirf den Fehler, damit er in der Komponente behandelt werden kann
    }
};
