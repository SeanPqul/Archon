<script setup lang="ts">
import { useForm, usePage } from '@inertiajs/vue3';
import { computed, nextTick } from 'vue';

const page = usePage();
const newsletterSuccess = computed(
    () => page.props.flash?.newsletterSuccess as string | null,
);

const form = useForm({
    newsletter_email: '',
});

const subscribe = () => {
    form.post('/newsletter-subscriptions', {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
            nextTick(() => {
                document.getElementById('newsletter-email')?.focus();
            });
        },
    });
};

const quickLinkColumns = [
    [
        { label: 'About us', href: '#about' },
        { label: 'Products', href: '#products' },
        { label: 'Brand New', href: '#products' },
        { label: 'Parts', href: '#products' },
    ],
    [
        { label: 'Services', href: '#services' },
        { label: 'News', href: '#articles' },
        { label: 'Contact Us', href: '#quote' },
    ],
];
</script>

<template>
    <footer class="px-4 pb-6 text-white sm:px-6 lg:px-[1.375rem]">
        <div
            class="mx-auto max-w-[116.875rem] overflow-hidden rounded-[2.75rem] bg-gray-black p-7 sm:p-10 lg:rounded-[3.75rem] lg:p-16"
        >
            <div class="footer-layout">
                <div
                    class="footer-content-grid grid gap-12 lg:grid-cols-[1.1fr_.9fr_1.15fr] lg:gap-20"
                >
                    <section aria-labelledby="quick-contact-title">
                        <h2 id="quick-contact-title" class="text-xl font-bold">
                            Quick Contact
                        </h2>
                        <p class="mt-6 max-w-md leading-7 text-white/60">
                            If you have any questions or need assistance, don’t
                            hesitate to reach out to our team.
                        </p>

                        <div class="mt-6 border-t border-white/20 pt-5">
                            <p class="text-white/70">Where we located:</p>
                            <div class="mt-3 flex gap-4 leading-7 text-gold">
                                <img
                                    src="/assets/icons/location.png"
                                    alt=""
                                    class="mt-2 h-3 w-3"
                                />
                                <span>
                                    Door 14–18 Asiaprime Center, G. Del Pilar
                                    St.<br />
                                    Corner Dacudao Avenue, Brgy. Agdao
                                    Proper,<br />
                                    Agdao District, Davao City
                                </span>
                            </div>
                        </div>

                        <div class="mt-5 border-t border-white/20 pt-5">
                            <p class="text-white/70">Send us email:</p>
                            <a
                                href="mailto:archon.salesdivision@gmail.com"
                                class="mt-3 flex items-center gap-4 font-medium text-gold hover:text-white"
                            >
                                <img
                                    src="/assets/icons/email.png"
                                    alt=""
                                    class="h-3 w-3"
                                />
                                archon.salesdivision@gmail.com
                            </a>
                        </div>

                        <div class="mt-5 border-t border-white/20 pt-5">
                            <p class="text-white/70">Dial us today:</p>
                            <a
                                href="tel:+639171330643"
                                class="mt-3 flex items-center gap-4 font-medium text-gold hover:text-white"
                            >
                                <img
                                    src="/assets/icons/call.png"
                                    alt=""
                                    class="h-3 w-3"
                                />
                                (63) 917 133 0643
                            </a>
                        </div>

                        <div class="mt-8">
                            <p class="text-white/70">Follow us on</p>
                            <div class="mt-4 flex gap-4">
                                <span
                                    v-for="icon in [
                                        ['fb.png', 'Facebook'],
                                        ['LinkedIn.png', 'LinkedIn'],
                                        ['tiktok.png', 'TikTok'],
                                        ['yt.png', 'YouTube'],
                                    ]"
                                    :key="icon[1]"
                                    class="rounded-full focus-within:outline-2 focus-within:outline-gold"
                                >
                                    <img
                                        :src="`/assets/icons/${icon[0]}`"
                                        :alt="icon[1]"
                                        class="size-11"
                                    />
                                </span>
                            </div>
                        </div>
                    </section>

                    <section aria-labelledby="quick-links-title">
                        <h2 id="quick-links-title" class="text-xl font-bold">
                            Quick Links
                        </h2>
                        <div class="mt-7 grid grid-cols-2 gap-x-10">
                            <ul
                                v-for="(column, index) in quickLinkColumns"
                                :key="index"
                                class="space-y-6"
                            >
                                <li v-for="link in column" :key="link.label">
                                    <a
                                        :href="link.href"
                                        class="text-white/75 transition hover:text-gold"
                                    >
                                        {{ link.label }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section aria-labelledby="company-title">
                        <img
                            src="/assets/footer-logo.png"
                            alt=""
                            class="h-24 w-24"
                        />
                        <h2 id="company-title" class="mt-4 text-lg font-bold">
                            ARCHON SPECIAL MACHINERIES INC.
                        </h2>
                        <p class="mt-5 max-w-xl leading-8 text-white/80">
                            is the leading distributor of trucks &amp; heavy
                            equipment nationwide. We are a certified partner and
                            dealer of SINOTRUK, the largest and number one
                            manufacturer of trucks and heavy equipment in China.
                        </p>
                    </section>
                </div>

                <form
                    class="footer-newsletter newsletter-form rounded-[2rem] bg-[#363636] p-4 lg:px-10 lg:py-7"
                    novalidate
                    @submit.prevent="subscribe"
                >
                    <div class="newsletter-fields footer-newsletter-fields">
                        <label class="sr-only" for="newsletter-email"
                            >Email address</label
                        >
                        <input
                            id="newsletter-email"
                            v-model="form.newsletter_email"
                            type="email"
                            name="newsletter_email"
                            autocomplete="email"
                            placeholder="Enter your email to receive curated content, including industry alerts, news, and insights..."
                            class="min-h-16 min-w-0 flex-1 rounded-none bg-white px-6 text-[max(.875rem,14px)] text-[#292929] outline-none placeholder:text-[#aaa] focus:ring-2 focus:ring-gold lg:min-h-[4.5rem]"
                            :aria-invalid="
                                Boolean(form.errors.newsletter_email)
                            "
                            :aria-describedby="
                                form.errors.newsletter_email
                                    ? 'newsletter-email-error'
                                    : undefined
                            "
                        />
                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="min-h-16 rounded-none border-b-4 border-brand-red px-8 font-semibold transition hover:bg-white/5 hover:text-gold disabled:opacity-60 lg:min-h-[4.5rem] lg:min-w-56"
                        >
                            {{ form.processing ? 'Joining...' : 'Subscribe' }}
                        </button>
                    </div>
                    <p
                        v-if="form.errors.newsletter_email"
                        id="newsletter-email-error"
                        role="alert"
                        class="mt-3 text-[max(.875rem,14px)] text-[#ff9aa4]"
                    >
                        {{ form.errors.newsletter_email }}
                    </p>
                    <p
                        v-if="newsletterSuccess"
                        role="status"
                        class="mt-3 text-[max(.875rem,14px)] text-emerald-300"
                    >
                        {{ newsletterSuccess }}
                    </p>
                </form>
            </div>

            <div
                class="mt-12 flex flex-col justify-between gap-5 rounded-[2rem] bg-[#383838] px-7 py-7 text-[max(.875rem,12px)] text-white/75 lg:flex-row lg:px-12"
            >
                <p>
                    Copyright Archon Special Machineries Inc 2025, Designed and
                    Developed by R Web Solutions
                </p>
                <p>Terms and Conditions | Privacy Policy</p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
@media (min-width: 32rem) {
    .footer-newsletter-fields {
        gap: 0;
    }
}

@media (min-width: 1024px) {
    .footer-layout {
        position: relative;
    }

    .footer-newsletter {
        position: absolute;
        top: 22.25rem;
        right: 2.75rem;
        left: 35.2%;
        margin: 0;
    }
}
</style>
