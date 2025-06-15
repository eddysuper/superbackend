import { redirect } from '@sveltejs/kit';
import { PUBLIC_API_BASE_URL } from '$env/static/public';


export async function load({ fetch, url }) {
  let user = null;
  
  // Define paths that should NOT trigger a redirect to login if unauthenticated
  const publicPaths = ['/', '/login', '/register', '/pricing', '/features', '/enterprise', '/privacy', '/terms'];
  
  try {
    const response = await fetch(`${PUBLIC_API_BASE_URL}/api/auth/me`, {
      credentials: 'include' // Important for sending cookies/auth headers
    });
    
    if (response.ok) {
      user = await response.json();
      if (user.authenticated) {
        console.log('root +layout.js user:', user);
        return user;
      }
    } else {
      console.log('/auth/me returned:', response.status, response.statusText);
    }
  } catch (error) {
    // Network error or other issues during API call
    console.error('Error during authentication check:', error);
    console.error('Attempted to connect to:', `${PUBLIC_API_BASE_URL}/api/auth/me`);
  }
  
  if (publicPaths.includes(url.pathname)) {
    // If not authenticated but on a public path (like /login),
    // or if authentication failed and we are not redirecting
    return {
      authenticated: false
    };
  }
  
  // Use a 302 status code for a temporary redirect
  throw redirect(302, '/login');
}