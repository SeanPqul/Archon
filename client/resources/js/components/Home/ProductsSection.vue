<script setup lang="ts">
import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
} from 'vue';
import { products } from '@/data/homepage';
import type { Product } from '@/data/homepage';

const quickViewProduct = ref<Product | null>(null);
const comparedIds = ref<string[]>([]);
const activeProductId = ref<string | null>(null);
const showComparison = ref(false);
const isClientReady = ref(false);
const quickDialog = ref<HTMLElement | null>(null);
const quickCloseButton = ref<HTMLButtonElement | null>(null);
const compareDialog = ref<HTMLElement | null>(null);
const compareCloseButton = ref<HTMLButtonElement | null>(null);
const lastTrigger = ref<HTMLElement | null>(null);

const comparedProducts = computed(() =>
    products.filter((product) => comparedIds.value.includes(product.id)),
);

const toggleCompare = (product: Product) => {
    if (comparedIds.value.includes(product.id)) {
        comparedIds.value = comparedIds.value.filter((id) => id !== product.id);

        return;
    }

    if (comparedIds.value.length < 2) {
        comparedIds.value = [...comparedIds.value, product.id];
    }
};

const activateProduct = (product: Product) => {
    activeProductId.value = product.id;
};

const clearActiveProductOnMouseLeave = (event: MouseEvent) => {
    if (
        event.currentTarget instanceof HTMLElement &&
        event.currentTarget.contains(document.activeElement)
    ) {
        return;
    }

    activeProductId.value = null;
};

const clearActiveProductOnFocusOut = (event: FocusEvent) => {
    if (
        event.currentTarget instanceof HTMLElement &&
        event.relatedTarget instanceof Node &&
        event.currentTarget.contains(event.relatedTarget)
    ) {
        return;
    }

    activeProductId.value = null;
};

const rememberTrigger = (event: MouseEvent) => {
    if (event.currentTarget instanceof HTMLElement) {
        lastTrigger.value = event.currentTarget;
    }
};

const openQuickView = (product: Product, event: MouseEvent) => {
    rememberTrigger(event);
    quickViewProduct.value = product;
    nextTick(() => quickCloseButton.value?.focus());
};

const restoreTriggerFocus = () => {
    const trigger = lastTrigger.value;

    nextTick(() => trigger?.focus());
};

const closeQuickView = () => {
    quickViewProduct.value = null;
    restoreTriggerFocus();
};

const openComparison = (event: MouseEvent) => {
    rememberTrigger(event);
    showComparison.value = true;
    nextTick(() => compareCloseButton.value?.focus());
};

const closeComparison = () => {
    showComparison.value = false;
    restoreTriggerFocus();
};

const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') {
        return;
    }

    if (quickViewProduct.value) {
        closeQuickView();
    } else if (showComparison.value) {
        closeComparison();
    }
};

const trapFocus = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') {
        return;
    }

    const dialog = quickDialog.value ?? compareDialog.value;
    const focusable = Array.from(
        dialog?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
    ).filter((element) => element.offsetParent !== null);

    if (!focusable.length) {
        return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
};

watch(
    () => Boolean(quickViewProduct.value || showComparison.value),
    (isOpen) => {
        const app = document.getElementById('app');

        if (app) {
            app.inert = isOpen;
        }

        document.body.style.overflow = isOpen ? 'hidden' : '';
    },
);

onMounted(() => {
    isClientReady.value = true;
    window.addEventListener('keydown', closeOnEscape);
});
onBeforeUnmount(() => {
    window.removeEventListener('keydown', closeOnEscape);
    document.body.style.overflow = '';

    const app = document.getElementById('app');

    if (app) {
        app.inert = false;
    }
});
</script>

<template>
    <section
        id="products"
        class="site-shell scroll-mt-12 py-20 text-white lg:py-32"
    >
        <div class="text-center">
            <p class="eyebrow">Durable &amp; Efficient</p>
            <h2 class="mt-5 text-4xl font-bold tracking-tight lg:text-5xl">
                Featured Products
            </h2>
        </div>

        <div
            class="mt-20 grid gap-x-10 gap-y-20 sm:grid-cols-2 lg:mt-28 lg:grid-cols-3 lg:gap-y-28"
        >
            <article
                v-for="product in products"
                :key="product.id"
                :data-active="activeProductId === product.id"
                class="group flex min-h-[28.75rem] flex-col items-center text-center outline-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-gold"
                tabindex="0"
                @click="activateProduct(product)"
                @focus="activateProduct(product)"
                @focusout="clearActiveProductOnFocusOut"
                @mouseenter="activateProduct(product)"
                @mouseleave="clearActiveProductOnMouseLeave"
            >
                <div
                    class="relative flex h-80 w-full items-center justify-center"
                >
                    <img
                        v-if="activeProductId === product.id"
                        src="/assets/shapes-line/bg-truck-shape.png"
                        alt=""
                        class="absolute top-4 h-72 object-fill opacity-90"
                        style="
                            left: 50%;
                            width: calc(100% + 7.5rem);
                            max-width: none;
                            transform: translateX(-50%);
                        "
                    />
                    <img
                        :src="product.image"
                        :alt="product.name"
                        class="relative z-10 max-h-80 w-[90%] object-contain transition duration-500 group-hover:-translate-y-2 group-hover:scale-[1.03]"
                        loading="lazy"
                    />
                </div>

                <div
                    class="mt-5 flex min-h-12 items-center justify-center gap-3"
                >
                    <template v-if="activeProductId === product.id">
                        <button
                            type="button"
                            class="rounded-full bg-brand-red px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#b50718] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                            @click="openQuickView(product, $event)"
                        >
                            Quick View
                        </button>
                        <button
                            type="button"
                            :class="[
                                comparedIds.includes(product.id)
                                    ? 'border-gold bg-gold text-[#1e1e1e]'
                                    : 'border-white/70 text-white',
                                'rounded-full border px-7 py-3 text-sm font-semibold transition hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold',
                            ]"
                            :aria-pressed="comparedIds.includes(product.id)"
                            @click="toggleCompare(product)"
                        >
                            Compare
                        </button>
                    </template>
                    <template v-else>
                        <span
                            v-for="color in product.colors"
                            :key="color"
                            class="size-11 rounded-xl border border-white/10"
                            :style="{ backgroundColor: color }"
                            aria-hidden="true"
                        />
                    </template>
                </div>

                <h3 class="mt-4 text-xl font-bold lg:text-2xl">
                    {{ product.name }}
                </h3>
            </article>
        </div>

        <div
            v-if="comparedIds.length"
            class="sticky bottom-5 z-30 mx-auto mt-16 flex max-w-2xl flex-col items-center justify-between gap-4 rounded-3xl border border-gold/40 bg-[#252525]/95 px-6 py-5 shadow-2xl backdrop-blur sm:flex-row"
        >
            <p class="font-medium">
                {{ comparedIds.length }} of 2 products selected
            </p>
            <div class="flex gap-3">
                <button
                    type="button"
                    class="rounded-full px-5 py-3 text-sm text-white/70 transition hover:text-white"
                    @click="comparedIds = []"
                >
                    Clear
                </button>
                <button
                    type="button"
                    :disabled="comparedIds.length < 2"
                    class="rounded-full bg-brand-red px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-45"
                    @click="openComparison($event)"
                >
                    Compare products
                </button>
            </div>
        </div>

        <Teleport v-if="isClientReady" to="#modal-root">
            <div
                v-if="quickViewProduct"
                class="fixed inset-0 z-[100] grid place-items-center bg-black/75 p-4 backdrop-blur-sm"
                role="presentation"
                @click.self="closeQuickView"
            >
                <section
                    ref="quickDialog"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="quick-view-title"
                    tabindex="-1"
                    class="relative max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-y-auto rounded-[2.5rem] border border-white/10 bg-[#262626] p-8 text-white shadow-2xl sm:p-12"
                    @keydown="trapFocus"
                >
                    <button
                        ref="quickCloseButton"
                        type="button"
                        class="absolute top-5 right-5 grid size-11 place-items-center rounded-full border border-white/20 text-xl"
                        aria-label="Close quick view"
                        @click="closeQuickView"
                    >
                        ×
                    </button>
                    <img
                        :src="quickViewProduct.image"
                        :alt="quickViewProduct.name"
                        class="mx-auto h-48 w-full object-contain sm:h-80"
                    />
                    <h2
                        id="quick-view-title"
                        class="mt-6 text-center text-3xl font-bold"
                    >
                        {{ quickViewProduct.name }}
                    </h2>
                    <p class="mx-auto mt-4 max-w-xl text-center text-white/70">
                        Request a free quotation to learn more about this Archon
                        HOWO truck.
                    </p>
                    <a
                        href="#quote"
                        class="mx-auto mt-8 flex w-fit rounded-full bg-brand-red px-8 py-4 font-semibold"
                        @click="closeQuickView"
                    >
                        Request Quote
                    </a>
                </section>
            </div>

            <div
                v-if="showComparison"
                class="fixed inset-0 z-[100] grid place-items-center bg-black/75 p-4 backdrop-blur-sm"
                role="presentation"
                @click.self="closeComparison"
            >
                <section
                    ref="compareDialog"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="compare-title"
                    tabindex="-1"
                    class="relative max-h-[calc(100dvh-2rem)] w-full max-w-5xl overflow-y-auto rounded-[2.5rem] border border-white/10 bg-[#262626] p-8 text-white shadow-2xl sm:p-12"
                    @keydown="trapFocus"
                >
                    <button
                        ref="compareCloseButton"
                        type="button"
                        class="absolute top-5 right-5 grid size-11 place-items-center rounded-full border border-white/20 text-xl"
                        aria-label="Close product comparison"
                        @click="closeComparison"
                    >
                        ×
                    </button>
                    <h2 id="compare-title" class="text-3xl font-bold">
                        Product comparison
                    </h2>
                    <p class="mt-3 text-white/65">
                        Only the imagery supplied in the assessment is shown;
                        technical specifications were not provided.
                    </p>
                    <div class="mt-8 grid gap-8 sm:grid-cols-2">
                        <article
                            v-for="product in comparedProducts"
                            :key="product.id"
                            class="rounded-3xl bg-white/5 p-6 text-center"
                        >
                            <img
                                :src="product.image"
                                :alt="product.name"
                                class="h-40 w-full object-contain sm:h-64"
                            />
                            <h3 class="mt-4 text-xl font-bold">
                                {{ product.name }}
                            </h3>
                        </article>
                    </div>
                </section>
            </div>
        </Teleport>
    </section>
</template>
