import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Adjust this URL according to your FastAPI server address

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
