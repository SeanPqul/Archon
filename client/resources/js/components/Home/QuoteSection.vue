<script setup lang="ts">
import { useForm, usePage } from '@inertiajs/vue3';
import { computed, nextTick } from 'vue';
import { products } from '@/data/homepage';

const page = usePage();

const quoteSuccess = computed(
    () => page.props.flash?.quoteSuccess as string | null,
);

const form = useForm({
    full_name: '',
    email: '',
    truck: '',
    phone: '',
    additional_details: '',
    privacy_accepted: false,
});

const submit = () => {
    form.post('/quotes', {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
            nextTick(() => {
                document
                    .querySelector<HTMLElement>('#quote [aria-invalid="true"]')
                    ?.focus();
            });
        },
    });
};
</script>

<template>
    <section
        id="quote"
        class="site-shell relative z-20 -mt-24 scroll-mt-8 lg:-mt-40"
    >
        <div
            class="relative overflow-hidden rounded-[2.5rem] bg-white text-[#252525] shadow-[0_1.875rem_5rem_rgba(0,0,0,.28)] lg:rounded-[3.5rem] lg:bg-transparent"
        >
            <img
                src="/assets/shapes-line/bg-rqst%20quote.png"
                alt=""
                class="absolute inset-0 size-full object-fill"
            />

            <div class="relative p-6 pt-10 sm:p-10 lg:p-12 lg:pt-12">
                <p class="text-sm font-medium text-gold lg:text-base">
                    Let’s Get Started
                </p>
                <h2
                    id="quote-heading"
                    tabindex="-1"
                    class="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                >
                    Request a Quote
                </h2>

                <div
                    class="mt-12 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(19.375rem,.9fr)] lg:items-stretch"
                >
                    <form
                        class="flex flex-col"
                        novalidate
                        @submit.prevent="submit"
                    >
                        <p class="text-base leading-7 text-[#444] lg:text-lg">
                            All quotations are free of charge. Fill up the form
                            below, and we’ll reach out to you.
                        </p>

                        <div
                            v-if="quoteSuccess"
                            role="status"
                            class="mt-6 rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-800"
                        >
                            {{ quoteSuccess }}
                        </div>

                        <div class="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                            <label class="form-field">
                                <span>Full Name</span>
                                <input
                                    v-model="form.full_name"
                                    type="text"
                                    name="full_name"
                                    autocomplete="name"
                                    placeholder="Jack Benedict"
                                    :aria-invalid="
                                        Boolean(form.errors.full_name)
                                    "
                                    :aria-describedby="
                                        form.errors.full_name
                                            ? 'full-name-error'
                                            : undefined
                                    "
                                />
                                <small
                                    v-if="form.errors.full_name"
                                    id="full-name-error"
                                    role="alert"
                                    >{{ form.errors.full_name }}</small
                                >
                            </label>

                            <label class="form-field">
                                <span>Email Address</span>
                                <input
                                    v-model="form.email"
                                    type="email"
                                    name="email"
                                    autocomplete="email"
                                    :aria-invalid="Boolean(form.errors.email)"
                                    :aria-describedby="
                                        form.errors.email
                                            ? 'quote-email-error'
                                            : undefined
                                    "
                                />
                                <small
                                    v-if="form.errors.email"
                                    id="quote-email-error"
                                    role="alert"
                                    >{{ form.errors.email }}</small
                                >
                            </label>

                            <label class="form-field">
                                <span>Trucks</span>
                                <select
                                    v-model="form.truck"
                                    name="truck"
                                    :aria-invalid="Boolean(form.errors.truck)"
                                    :aria-describedby="
                                        form.errors.truck
                                            ? 'truck-error'
                                            : undefined
                                    "
                                >
                                    <option value="" disabled>
                                        Select a truck
                                    </option>
                                    <option
                                        v-for="product in products"
                                        :key="product.id"
                                        :value="product.id"
                                    >
                                        {{ product.name }}
                                    </option>
                                </select>
                                <small
                                    v-if="form.errors.truck"
                                    id="truck-error"
                                    role="alert"
                                    >{{ form.errors.truck }}</small
                                >
                            </label>

                            <label class="form-field">
                                <span>Phone Number</span>
                                <input
                                    v-model="form.phone"
                                    type="tel"
                                    name="phone"
                                    autocomplete="tel"
                                    :aria-invalid="Boolean(form.errors.phone)"
                                    :aria-describedby="
                                        form.errors.phone
                                            ? 'phone-error'
                                            : undefined
                                    "
                                />
                                <small
                                    v-if="form.errors.phone"
                                    id="phone-error"
                                    role="alert"
                                    >{{ form.errors.phone }}</small
                                >
                            </label>

                            <label class="form-field sm:col-span-2">
                                <span>Additional Details</span>
                                <textarea
                                    v-model="form.additional_details"
                                    name="additional_details"
                                    rows="6"
                                    :aria-invalid="
                                        Boolean(form.errors.additional_details)
                                    "
                                    :aria-describedby="
                                        form.errors.additional_details
                                            ? 'details-error'
                                            : undefined
                                    "
                                />
                                <small
                                    v-if="form.errors.additional_details"
                                    id="details-error"
                                    role="alert"
                                    >{{ form.errors.additional_details }}</small
                                >
                            </label>
                        </div>

                        <label class="mt-7 flex items-start gap-4">
                            <input
                                v-model="form.privacy_accepted"
                                type="checkbox"
                                name="privacy_accepted"
                                class="mt-0.5 size-6 shrink-0 rounded border-[#aaa] text-brand-red accent-brand-red focus:ring-brand-red"
                                :aria-invalid="
                                    Boolean(form.errors.privacy_accepted)
                                "
                                :aria-describedby="
                                    form.errors.privacy_accepted
                                        ? 'privacy-error'
                                        : undefined
                                "
                            />
                            <span class="text-[max(1rem,14px)] text-[#444]">
                                I accept the privacy and terms.
                            </span>
                        </label>
                        <p
                            v-if="form.errors.privacy_accepted"
                            id="privacy-error"
                            role="alert"
                            class="mt-2 text-[max(.875rem,14px)] text-brand-red"
                        >
                            {{ form.errors.privacy_accepted }}
                        </p>

                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="mt-8 inline-flex min-h-16 w-full items-center justify-between rounded-full bg-brand-red px-10 font-semibold text-white shadow-lg transition hover:bg-[#b50718] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red disabled:cursor-wait disabled:opacity-60"
                        >
                            <span>{{
                                form.processing
                                    ? 'Sending request...'
                                    : 'Submit Quote'
                            }}</span>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                class="size-5"
                                aria-hidden="true"
                            >
                                <path
                                    d="M5 12h14m-5-5 5 5-5 5"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>
                    </form>

                    <aside
                        class="relative isolate flex min-h-[33.75rem] flex-col overflow-hidden rounded-[2rem] bg-brand-red p-8 text-white lg:p-10"
                    >
                        <img
                            src="/assets/images/download%20brochure.png"
                            alt=""
                            class="absolute inset-0 -z-10 size-full object-cover"
                        />
                        <h3 class="text-4xl leading-tight font-bold">
                            Industry<br />Solutions!
                        </h3>
                        <p
                            class="mt-7 text-[max(1rem,14px)] leading-7 text-white/90"
                        >
                            Our portfolio consists of multiple clients in
                            various industries. This alone is a testament to the
                            reliability of our products and services. Check out
                            our comprehensive brochure by clicking the button
                            below.
                        </p>
                        <p
                            class="mt-5 text-[max(1rem,14px)] leading-7 text-white/90"
                        >
                            Don’t find what you need? Then, you may request a
                            special truck! We’ll source it for you.
                        </p>
                        <ul
                            class="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-gold"
                        >
                            <li>• Construction</li>
                            <li>• Mining</li>
                            <li>• Trucking</li>
                            <li>• Hauling</li>
                            <li>• Retail</li>
                        </ul>
                        <a
                            href="/assets/images/download%20brochure.png"
                            download="Archon-Industry-Solutions.png"
                            class="mt-auto inline-flex min-h-16 items-center justify-between rounded-full bg-white px-8 font-semibold text-[#282828] transition hover:bg-[#f1e4d4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                            Download Brochure
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                class="size-5"
                                aria-hidden="true"
                            >
                                <path
                                    d="M5 12h14m-5-5 5 5-5 5"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </a>
                    </aside>
                </div>
            </div>
        </div>
    </section>
</template>
