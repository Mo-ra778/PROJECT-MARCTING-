// ========================================
// API CLIENT - HTTP Requests Wrapper
// ========================================

class APIClient {
    constructor(baseURL = '/api') {
        this.baseURL = baseURL;
        this.token = localStorage.getItem('authToken');
    }

    // Set authorization token
    setToken(token) {
        this.token = token;
        localStorage.setItem('authToken', token);
    }

    // Remove authorization token
    clearToken() {
        this.token = null;
        localStorage.removeItem('authToken');
    }

    // Get default headers
    getHeaders(customHeaders = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...customHeaders
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    // Handle response
    async handleResponse(response) {
        const contentType = response.headers.get('content-type');
        const isJSON = contentType && contentType.includes('application/json');

        const data = isJSON ? await response.json() : await response.text();

        if (!response.ok) {
            const error = new Error(data.message || 'حدث خطأ في الاتصال');
            error.status = response.status;
            error.data = data;
            throw error;
        }

        return data;
    }

    // GET request
    async get(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'GET',
                headers: this.getHeaders(options.headers),
                ...options
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('GET Error:', error);
            throw error;
        }
    }

    // POST request
    async post(endpoint, data = {}, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: this.getHeaders(options.headers),
                body: JSON.stringify(data),
                ...options
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('POST Error:', error);
            throw error;
        }
    }

    // PUT request
    async put(endpoint, data = {}, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'PUT',
                headers: this.getHeaders(options.headers),
                body: JSON.stringify(data),
                ...options
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('PUT Error:', error);
            throw error;
        }
    }

    // PATCH request
    async patch(endpoint, data = {}, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'PATCH',
                headers: this.getHeaders(options.headers),
                body: JSON.stringify(data),
                ...options
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('PATCH Error:', error);
            throw error;
        }
    }

    // DELETE request
    async delete(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'DELETE',
                headers: this.getHeaders(options.headers),
                ...options
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('DELETE Error:', error);
            throw error;
        }
    }

    // Upload file
    async upload(endpoint, file, additionalData = {}) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            Object.keys(additionalData).forEach(key => {
                formData.append(key, additionalData[key]);
            });

            const headers = {};
            if (this.token) {
                headers['Authorization'] = `Bearer ${this.token}`;
            }

            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers,
                body: formData
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('Upload Error:', error);
            throw error;
        }
    }
}

// Create a default instance
const api = new APIClient();

// Export
window.api = api;
window.APIClient = APIClient;
