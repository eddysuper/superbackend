<script lang="ts">
import type { UserData } from '$lib/types';
import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { goto } from '$app/navigation';

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
    goto('/')
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
                    <a href="/dashboard" class="dropdown-item">Dashboard</a>
                    <button onclick={handleSignOut} class="dropdown-item">Sign out</button>
                </div>
            {/if}
        </div>
       
    </div>
</nav>
