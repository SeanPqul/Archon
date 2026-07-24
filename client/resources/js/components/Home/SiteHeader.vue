<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

const isOpen = ref(false);
const menuButton = ref<HTMLButtonElement | null>(null);

const links = [
    { label: 'About Us', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Services', href: '#services' },
    { label: 'Articles', href: '#articles' },
];

const closeMenu = () => {
    isOpen.value = false;
};

const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen.value) {
        closeMenu();
        nextTick(() => menuButton.value?.focus());
    }
};

onMounted(() => window.addEventListener('keydown', closeOnEscape));
onBeforeUnmount(() => window.removeEventListener('keydown', closeOnEscape));
</script>

<template>
    <header class="relative z-50 bg-archon">
        <div
            class="site-shell flex min-h-24 items-center justify-between gap-8 py-5 xl:min-h-36 xl:py-8"
        >
            <a href="#top" aria-label="Archon homepage" @click="closeMenu">
                <img
                    src="/assets/archon-logo.png"
                    alt="Archon — Moving Life Forward"
                    class="w-44 xl:w-64"
                />
            </a>

            <button
                ref="menuButton"
                type="button"
                class="inline-flex size-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold xl:hidden"
                :aria-expanded="isOpen"
                aria-controls="primary-navigation"
                aria-label="Toggle navigation"
                @click="isOpen = !isOpen"
            >
                <svg
                    v-if="!isOpen"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    class="size-6"
                    aria-hidden="true"
                >
                    <path
                        d="M4 7h16M4 12h16M4 17h16"
                        stroke-width="1.8"
                        stroke-linecap="round"
                    />
                </svg>
                <svg
                    v-else
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    class="size-6"
                    aria-hidden="true"
                >
                    <path
                        d="m6 6 12 12M18 6 6 18"
                        stroke-width="1.8"
                        stroke-linecap="round"
                    />
                </svg>
            </button>

            <nav
                id="primary-navigation"
                :class="[
                    isOpen ? 'flex' : 'hidden',
                    'absolute top-full right-4 left-4 flex-col gap-1 rounded-3xl border border-white/10 bg-[#202121] p-4 shadow-2xl xl:static xl:flex xl:flex-row xl:items-center xl:gap-14 xl:border-0 xl:bg-transparent xl:p-0 xl:shadow-none',
                ]"
                aria-label="Primary navigation"
            >
                <a
                    v-for="link in links"
                    :key="link.href"
                    :href="link.href"
                    class="rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:text-gold focus-visible:outline-2 focus-visible:outline-gold xl:px-0 xl:text-base"
                    @click="closeMenu"
                >
                    {{ link.label }}
                </a>
                <a
                    href="#quote"
                    class="mt-2 inline-flex items-center justify-center rounded-full bg-brand-red px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#b50718] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold xl:mt-0 xl:ml-2 xl:px-10 xl:text-base"
                    @click="closeMenu"
                >
                    Get in Touch
                </a>
            </nav>
        </div>
    </header>
</template>
