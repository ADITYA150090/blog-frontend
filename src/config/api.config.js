// API Configuration
let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
if (apiUrl && !apiUrl.startsWith('http')) {
    apiUrl = `http://${apiUrl}`;
}
export const API_URL = apiUrl;
export const API_BASE = `${API_URL}/api`;
