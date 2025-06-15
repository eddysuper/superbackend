import { PUBLIC_API_BASE_URL } from '$env/static/public';

export async function load({ fetch, url }) {
    let products = null;
    try {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/api/payments/products`, {
            credentials: 'include' // Important for sending cookies/auth headers
        });

        if (response.ok) {
            products = await response.json();
            return {"products": products}
        } else {
            console.log('Failed to retrieve products:', response.status, response.statusText);
        }
    } catch (error) {
        // Network error or other issues during API call
        console.error('Error during product retrieval:', error);
    }
    return {"products": null}
}