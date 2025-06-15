<script lang="ts">
import type { UserData } from '$lib/types';
import { PUBLIC_API_BASE_URL } from '$env/static/public';


export let data: UserData;

let showUserMenu = false;

function showMenu() {
    showUserMenu = true;
}

function hideMenu() {
    showUserMenu = false;
}

function toggleUserMenu() {
    showUserMenu = !showUserMenu;
}

async function handleSignOut() {
    console.log('Signing out...');
    await fetch(`${PUBLIC_API_BASE_URL}/api/auth/google/logout`, {
        credentials: 'include',
    });
    showUserMenu = false; // Close menu after signing out
    window.location.reload(); // Reload to reflect logout
}
</script>

<nav class="navbar">
    <div class="navbar-left">
        <a href="/" class="company-link">
            <img src="/layers32.png" alt="Superbackend Logo" class="logo" />
            <span class="company-name">Superbackend</span>
        </a>
    </div>

    <div class="navbar-right">
        <a href="/pricing" class="nav-item">Pricing</a>

        {#if data.authenticated}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="user-menu-container" onmouseleave={hideMenu}>
                <button class="user-info-button" onclick={toggleUserMenu}>
                    <img
                        src={data.current_user!.picture}
                        alt={data.current_user!.name}
                        class="user-avatar"
                        onerror={(this.src = '/logo.png')} />
                    <span class="user-name">{data.current_user!.name}</span>
                </button>

                {#if showUserMenu}
                    <div class="user-dropdown-menu">
                        <a href="/profile" class="dropdown-item">Profile</a>
                        <a href="/billing" class="dropdown-item">Billing</a>
                        <button onclick={handleSignOut} class="dropdown-item">Sign out</button>
                    </div>
                {/if}
            </div>
        {:else}
            <a href="{PUBLIC_API_BASE_URL}/api/auth/google/login" class="button">Sign in</a>
        {/if}
    </div>
</nav>

<style>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #f8f8f8;
    border-bottom: 1px solid #eee;
}

.navbar-left {
    display: flex;
    align-items: center;
}

.company-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
}

.logo {
    height: 30px; /* Adjust as needed */
    margin-right: 10px;
}

.company-name {
    font-size: 1.2rem;
    font-weight: bold;
}

.navbar-right {
    display: flex;
    align-items: center;
    gap: 1.5rem; /* Space between right-aligned items */
}

.nav-item {
    text-decoration: none;
    color: #333;
    font-size: 1rem;
}

.nav-item:hover {
    color: #007bff;
}

.button {
    background-color: #007bff;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-decoration: none;
    font-size: 1rem;
    border: none;
    cursor: pointer;
}

.button:hover {
    background-color: #0056b3;
}

.user-menu-container {
    position: relative;
    display: inline-block;
}

.user-info-button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
}

.user-avatar {
    width: 35px; /* Adjust as needed */
    height: 35px; /* Adjust as needed */
    border-radius: 50%;
    object-fit: cover;
    margin-right: 8px;
    border: 1px solid #ddd; /* Optional: subtle border */
}

.user-name {
    font-size: 1rem;
    font-weight: 500;
}

.user-dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    min-width: 120px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    /* ADD THIS */
    overflow: hidden; /* This is key to clip the inner content to the border-radius */
}

/* New style for dropdown links and buttons */
.dropdown-item {
    display: block;
    width: 100%;
    padding: 10px 15px;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.95rem;
    color: #333; /* Ensure text color is consistent */
    text-decoration: none; /* Remove underline from links */
    box-sizing: border-box; /* Ensures padding is included in the 100% width */
}

.dropdown-item:hover {
    background-color: #f0f0f0;
}

/* Optional: Refine border-radius for first and last items if needed */
.user-dropdown-menu .dropdown-item:first-child {
    border-top-left-radius: 4px; /* Slightly less than parent to account for border */
    border-top-right-radius: 4px;
}

.user-dropdown-menu .dropdown-item:last-child {
    border-bottom-left-radius: 4px; /* Slightly less than parent to account for border */
    border-bottom-right-radius: 4px;
}
</style>
