
const BASE_URL = 'https://project-manager-web-crm-8b2dbc36e91e.herokuapp.com';
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

export const registerUser = async (user) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

export const getUsers = async () => {
    const authToken = localStorage.getItem('authToken');

    try {
        const response = await fetch(`${BASE_URL}/getAllUsers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const filteredData = data.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            role: user.role
        }));

        return filteredData;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
}