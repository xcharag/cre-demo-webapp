
const BASE_URL = 'http://localhost:3001';
export const getUserData = async () => {
    const authToken = localStorage.getItem('authToken');

    try {
        const response = await fetch(`${BASE_URL}/getUserData`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonResponse = await response.json();

        return jsonResponse;
    } catch (error) {
        console.error('Error getting user data:', error);
        throw error;
    }
}