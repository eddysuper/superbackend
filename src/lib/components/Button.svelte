<script lang="ts">
  import { cva, type VariantProps } from "class-variance-authority"
  import { cn } from "$lib/utils"
  
  const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90",
          destructive:
            "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline:
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 rounded-md px-3",
          lg: "h-11 rounded-md px-8",
          icon: "h-10 w-10",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  )

  type ButtonVariants = VariantProps<typeof buttonVariants>
  
  interface ButtonProps extends ButtonVariants {
    class?: string
    asChild?: boolean
    [key: string]: any
  }

  let {
    class: className = "",
    variant = "default",
    size = "default",
    asChild = false,
    children,
    ...restProps
  }: ButtonProps = $props()

  let element: HTMLButtonElement | HTMLElement
</script>

{#if asChild}
  <svelte:element
    this="div"
    bind:this={element}
    class={cn(buttonVariants({ variant, size, class: className }))}
    {...restProps}
  >
    {@render children?.()}
  </svelte:element>
{:else}
  <button
    bind:this={element}
    class={cn(buttonVariants({ variant, size, class: className }))}
    {...restProps}
  >
    {@render children?.()}
  </button>
{/if}