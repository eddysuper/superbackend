import { redirect } from '@sveltejs/kit';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

export async function load({ fetch, url }) {
  try {
    const response = await fetch(`${PUBLIC_API_BASE_URL}/api/payments/billing`, {
      credentials: 'include' // Important for sending cookies/auth headers
    });
    
    if (response.ok) {
      const billing_url = await response.json();
      return { billing_url };
    } else {
      console.log('returned:', response.status, response.statusText);
    }
  } catch (error) {
    // Network error or other issues during API call
    console.error('Error during:', error);
  }
  
  // Use a 302 status code for a temporary redirect
  throw redirect(302, '/login');
}