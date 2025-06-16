import { redirect } from '@sveltejs/kit';
import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { setUserData, userStore, getValidUserData } from '$lib/stores/userStore';
import type { UserData } from '$lib/types';
import { get } from 'svelte/store';

export async function load({ fetch, url }) {
  // Define paths that should NOT trigger a redirect to login if unauthenticated
  const publicPaths = ['/', '/login', '/register', '/pricing', '/features', '/enterprise', '/privacy', '/terms'];
  
  // Check if we have valid cached user data
  const cachedUser = getValidUserData(get(userStore));
  if (cachedUser) {
    // If we have valid cached data and we're on a public path, return it
    if (publicPaths.includes(url.pathname)) {
      return cachedUser;
    }
    // If we have valid cached data and user is authenticated, return it
    if (cachedUser.authenticated) {
      return cachedUser;
    }
  }
  
  try {
    const response = await fetch(`${PUBLIC_API_BASE_URL}/api/auth/me`, {
      credentials: 'include' // Important for sending cookies/auth headers
    });
    
    if (response.ok) {
      const user = await response.json();
      if (user.authenticated) {
        console.log('root +layout.js user:', user);
        // Update the user store with the fetched data
        setUserData(user);
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
    const unauthenticatedUser: UserData = {
      authenticated: false,
      current_user: null,
      subscription_plan: null
    };
    setUserData(unauthenticatedUser);
    return unauthenticatedUser;
  }
  
  // Use a 302 status code for a temporary redirect
  throw redirect(302, '/login');
}