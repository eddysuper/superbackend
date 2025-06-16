<script lang="ts">
import type { UserData } from '$lib/types';
export let data: { billing_url: string };
import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { goto, invalidateAll } from '$app/navigation';
import { clearUserData } from '$lib/stores/userStore';


console.log("-------------");
console.log(data.billing_url);

const logout = async () => {
    await fetch(`${PUBLIC_API_BASE_URL}/api/auth/google/logout`, {
        credentials: 'include',
    });
    clearUserData();
    await invalidateAll();
    goto('/')
};

const deleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        try {
            const response = await fetch(`${PUBLIC_API_BASE_URL}/api/auth/delete-account`, {
                method: 'DELETE',
                credentials: 'include',
            });
            
            if (response.ok) {
                clearUserData();
                await invalidateAll();
                goto('/');
            } else {
                alert('Failed to delete account. Please try again later.');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('An error occurred while deleting your account. Please try again later.');
        }
    }
};

</script>

<main>
    <div class="container">
        {#if data.current_user}
            <div class="profile">
                <img src={data.current_user.picture} alt="Profile" class="profile-pic" />
                <h2>{data.current_user.name}</h2>
                <p>{data.current_user.email}</p>

                <a href={data.billing_url}>Billing</a><br/>
                <button onclick={logout}>Logout</button><br/>
                <button onclick={deleteAccount}>Delete Account</button>
            </div>
        {/if}
    </div>
</main>

<style>
.profile {
    margin-top: 2rem;
    padding: 2rem;
    border-radius: 8px;
    background-color: #f5f5f5;
}
.profile-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 1rem;
}
</style>
