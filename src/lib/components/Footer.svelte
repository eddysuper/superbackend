<script>
// Import icons - you'll need to install lucide-svelte: npm install lucide-svelte
import { Github, Twitter, Instagram, Mail } from 'lucide-svelte';
</script>

<footer class="bg-gray-50 text-gray-800 py-16">
    <div class="max-w-7xl mx-auto px-6">
        <!-- Navigation Links Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div>
                <div class="flex items-center gap-3 mb-4">
                    <img src="/layers64.png" alt="Superbackend Logo" class="w-8 h-8" />
                    <h3 class="text-sm font-medium text-gray-900">Superbackend</h3>
                </div>
                <p class="text-xs text-gray-600">© 2025 Superbackend, Inc.</p>
            </div>

            <div>
                <!-- This is necessary to keep the spacing -->
            </div>

            <div>
                <h3 class="text-sm font-medium text-gray-900 mb-4">Product</h3>
                <nav class="space-y-3">
                    <a
                        href="/pricing"
                        class="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        Pricing
                    </a>
                    <a
                        href="/features"
                        class="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        Features
                    </a>
                    <a
                        href="/enterprise"
                        class="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        Enterprise
                    </a>
                </nav>
            </div>

            <div>
                <h3 class="text-sm font-medium text-gray-900 mb-4">Platform</h3>
                <nav class="space-y-3">
                    <a
                        href="/changelog"
                        class="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        Changelog
                    </a>
                    <a
                        href="/community"
                        class="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        Community
                    </a>
                </nav>
            </div>
        </div>

        <!-- Large Brand Name -->
        <div class="mb-12">
            <h1
                class="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight">
                Superbackend
            </h1>
        </div>

        <!-- Bottom Section -->
        <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-gray-200">
            <div class="flex items-center gap-4 mb-4 md:mb-0">
                <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span class="text-sm text-gray-600">All systems operational</span>
                </div>
            </div>

            <div class="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                <div class="flex items-center gap-6">
                    <a
                        href="mailto:hi@superbackend.com"
                        class="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        hey@superbackend.com
                    </a>
                    <div class="flex items-center gap-4">
                        <a
                            href="https://x.com/superbackend"
                            class="text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="X (Twitter)">
                            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a
                            href="https://github.com/superbackend1"
                            class="text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="GitHub">
                            <Github size={16} />
                        </a>
                        <a
                            href="https://instagram.com/superbackend"
                            class="text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Instagram">
                            <Instagram size={16} />
                        </a>
                    </div>
                </div>

                <div class="flex items-center gap-6 text-sm text-gray-600">
                    <a href="/privacy" class="hover:text-gray-900 transition-colors"
                        >Privacy Policy</a>
                    <a href="/terms" class="hover:text-gray-900 transition-colors"
                        >Terms of Service</a>
                </div>
            </div>
        </div>
    </div>
</footer>
