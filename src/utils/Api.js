
const BASE_URL = 'https://cooperitvaqrapi-accafe8b1ea7.herokuapp.com';
export const getUserData = async () => {
    const authToken = localStorage.getItem('authToken');

    try {
        const response = await fetch(`${BASE_URL}/getUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: authToken
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonResponse = await response.json();
        localStorage.setItem('role', jsonResponse.role);

        return jsonResponse;
    } catch (error) {
        console.error('Error getting user data:', error);
        throw error;
    }
}