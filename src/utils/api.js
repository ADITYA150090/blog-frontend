import axios from 'axios';
import { API_BASE } from '../config/api.config';


export const api = {
    // Get all blogs
    async getAllBlogs() {
        const { data } = await axios.get(`${API_BASE}/blogs`);
        return data;
    },

    // Get featured blogs (shows all if no featured ones exist)
    async getFeaturedBlogs() {
        const { data } = await axios.get(`${API_BASE}/blogs`);
        // Show all blogs if no featured ones, otherwise show featured
        const featured = data.filter(blog => blog.featured);
        return featured.length > 0 ? featured : data;
    },

    // Get blog by slug
    async getBlogBySlug(slug) {
        const { data } = await axios.get(`${API_BASE}/blogs/${slug}`);
        return data;
    },

    // Get blog by ID
    async getBlogById(id) {
        const { data } = await axios.get(`${API_BASE}/blogs`);
        return data.find(blog => blog._id === id);
    },

    // Get blogs by category
    async getBlogsByCategory(category) {
        const { data } = await axios.get(`${API_BASE}/blogs`);
        return data.filter(blog => blog.category === category);
    },

    // Get all portfolio projects
    async getPortfolio() {
        const { data } = await axios.get(`${API_BASE}/projects`);
        return data;
    },

    // Get project by slug
    async getProjectBySlug(slug) {
        const { data } = await axios.get(`${API_BASE}/projects/${slug}`);
        return data;
    },

    // Subscribe to newsletter
    async subscribeNewsletter(email) {
        const { data } = await axios.post(`${API_BASE}/newsletter/subscribe`, { email });
        return data;
    }
};
