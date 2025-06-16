import { writable } from 'svelte/store';
import type { UserData } from '$lib/types';

interface CachedUserData {
    data: UserData;
    timestamp: number;
}

// Create a writable store with initial null value
export const userStore = writable<CachedUserData | null>(null);

// Cache expiration time in milliseconds (e.g., 5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000;

// Helper function to update user data
export function setUserData(data: UserData) {
    userStore.set({
        data,
        timestamp: Date.now()
    });
}

// Helper function to clear user data (for logout)
export function clearUserData() {
    userStore.set(null);
}

// Helper function to check if cached data is still valid
export function isCacheValid(cachedData: CachedUserData | null): boolean {
    if (!cachedData) return false;
    return Date.now() - cachedData.timestamp < CACHE_EXPIRATION;
}

// Helper function to get valid user data
export function getValidUserData(cachedData: CachedUserData | null): UserData | null {
    return isCacheValid(cachedData) ? cachedData!.data : null;
} 