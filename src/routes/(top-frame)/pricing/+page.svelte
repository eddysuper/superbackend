<script lang="ts">
import type { Product } from '$lib/types';
import type { PageData } from './$types';
export let data: PageData;

$: ({
    authenticated,
    current_user,
    subscription_plan,
    products
  } = data);

let orderedProducts: Product[] = [];

// Use a reactive statement to update orderedProducts when data.products changes
$: {
    if (data.products as Product[]) {
        // Always re-initialize orderedProducts as an empty array
        // inside the reactive block before populating it.
        orderedProducts = [];

        const hobby = data.products.find((p) => p.name === 'Hobby');
        const pro = data.products.find((p) => p.name === 'Pro');
        const founder = data.products.find((p) => p.name === 'Founder');

        if (hobby) orderedProducts.push(hobby);
        if (pro) orderedProducts.push(pro);
        if (founder) orderedProducts.push(founder);

    } else {
        // If data.products is not yet available, ensure orderedProducts is empty
        orderedProducts = [];
    }
}
</script>

<style>
  .pricing-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
    flex-wrap: wrap;
  }

  .plan-card {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 2rem;
    width: 300px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .plan-card h2 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }

  .plan-card .price {
    font-size: 2.5rem;
    font-weight: bold;
    color: #007bff; /* A nice blue for pricing */
    margin-bottom: 1rem;
  }

  .plan-card .description {
    color: #555;
    font-size: 1rem;
    min-height: 80px; /* Ensure consistent height for descriptions */
    margin-bottom: 1.5rem;
  }

  .plan-card .image-container {
    margin-bottom: 1rem;
    min-height: 100px; /* Adjust based on your image sizes */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .plan-card img {
    max-width: 100px;
    height: auto;
    border-radius: 4px;
  }

  .plan-card button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: background-color 0.2s ease-in-out;
    margin-top: auto; /* Push button to the bottom */
  }

  .plan-card button:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    .pricing-container {
      flex-direction: column;
      align-items: center;
    }
  }
</style>

<div class="pricing-container">
  {#each orderedProducts as product (product.id)}
    <div class="plan-card">
      <div>
        <h2>{product.name}</h2>
        <div class="price">{product.formatted_price}</div>
        <div class="image-container">
          {#if product.images && product.images.length > 0}
            <img src={product.images[0]} alt="{product.name} plan visual" />
          {/if}
        </div>
        <p class="description">{product.description}</p>
      </div>
      {#if data.authenticated && data.subscription_plan === product.name}
        <p class="description">You are currently subscribed to this plan.</p>
      {:else}
        <button>Choose {product.name}</button>
      {/if}
      
    </div>
  {/each}
</div>