<script lang="ts">
  import type { UserData } from '$lib/types';
  import { goto } from '$app/navigation';
  import { PUBLIC_API_BASE_URL } from '$env/static/public';

  export let data: UserData;

  function handleLinkClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  function navigateAndScroll(path) {
    goto(path);
    handleLinkClick();
  }
</script>

<header class="bg-white border-b border-gray-200 sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <div class="flex items-center">
        <button 
          type="button"
          class="flex items-center space-x-2 cursor-pointer" 
          on:click={() => navigateAndScroll('/')}
        >
          <img 
            src="https://raw.githubusercontent.com/eddysuper/icons/main/layers128.png" 
            alt="Superbackend" 
            class="h-8 w-8"
          />
          <span class="text-xl font-bold text-gray-900">Superbackend</span>
        </button>
      </div>
      
      <!-- Navigation -->
      <nav class="hidden md:flex items-center space-x-8">
        <button 
          type="button"
          class="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer" 
          on:click={() => navigateAndScroll('/pricing')}
        >
          Pricing
        </button>
        <button 
          type="button"
          class="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer" 
          on:click={() => navigateAndScroll('/features')}
        >
          Features
        </button>
        <button 
          type="button"
          class="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer" 
          on:click={() => navigateAndScroll('/enterprise')}
        >
          Enterprise
        </button>
      </nav>
      
      <!-- CTA -->
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
                        <a href="/dashboard" class="dropdown-item">Dashboard</a>
                        <button onclick={handleSignOut} class="dropdown-item">Sign out</button>
                    </div>
                {/if}
            </div>
        {:else}
            <a href="{PUBLIC_API_BASE_URL}/api/auth/google/login" class="button">Sign in</a>
        {/if}



      <div class="flex items-center space-x-4">
        <a href="{PUBLIC_API_BASE_URL}/api/auth/google/login" class="button">Sign in</a>
        
        <button 
          type="button"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white h-9 px-3 cursor-pointer"
          style="background-color: #516ECC;"
          on:mouseenter={(e) => e.target.style.backgroundColor = '#4558B3'}
          on:mouseleave={(e) => e.target.style.backgroundColor = '#516ECC'}
        >
          Get Started
        </button>
      </div>
    </div>
  </div>
</header>