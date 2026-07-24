<script setup lang="ts">
const benefits = [
    {
        number: '01',
        title: 'Free Delivery',
        description:
            'Getting hold of your new truck is no hassle because we deliver them to you at your doorstep!',
        icon: '/assets/icons/free delivery.png',
        featured: true,
    },
    {
        number: '02',
        title: 'On-site Repair',
        description:
            'Have troubles with your track? Don’t worry! We’ll be there wherever your site may be.',
        icon: '/assets/icons/on-site repair.png',
        featured: false,
    },
    {
        number: '03',
        title: 'One Year Warranty',
        description:
            'We prioritize your peace of mind. Rest assured that all your units have a one-year warranty.',
        icon: '/assets/icons/one year warranty.png',
        featured: false,
    },
    {
        number: '04',
        title: '24-Hour Service',
        description:
            'We have you covered, whether at 2pm or 2am! Call our sales associates and service advisors for any concerns you have, and we’ll respond!',
        icon: '/assets/icons/24 hours.png',
        featured: false,
    },
];
</script>

<template>
    <section
        id="about"
        class="relative mt-20 overflow-hidden rounded-[2.75rem] bg-gray-black pb-32 text-white lg:mt-32 lg:rounded-[3.75rem] lg:pb-52"
    >
        <img
            src="/assets/images/world map 2.png"
            alt=""
            class="absolute inset-x-0 bottom-20 w-full object-cover opacity-35"
            loading="lazy"
            decoding="async"
        />

        <div class="site-shell relative z-10 py-16 lg:py-24">
            <p class="eyebrow">About Us</p>
            <h2
                class="mt-6 max-w-6xl text-3xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-[3.5rem]"
            >
                Archon is the leading provider of Sinotruk<br
                    class="hidden lg:block"
                />
                Machineries heavy equipment in the Philippines.
            </h2>

            <div
                class="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-12 lg:gap-10"
            >
                <article
                    v-for="(benefit, index) in benefits"
                    :key="benefit.number"
                    :class="[
                        benefit.featured ? 'bg-brand-red' : 'bg-[#343535]/95',
                        index === 0
                            ? 'lg:col-span-4'
                            : index === 1
                              ? 'lg:col-span-4'
                              : index === 2
                                ? 'lg:col-span-4'
                                : 'lg:col-span-4 lg:row-start-2',
                        'min-h-72 rounded-[2.5rem] p-8 shadow-sm lg:p-10',
                    ]"
                >
                    <div class="flex items-start justify-between gap-4">
                        <span class="text-4xl font-bold">{{
                            benefit.number
                        }}</span>
                        <img
                            :src="benefit.icon"
                            alt=""
                            class="h-14 w-16 object-contain"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                    <h3 class="mt-9 text-2xl font-bold">
                        {{ benefit.title }}
                    </h3>
                    <p
                        class="mt-3 text-[max(1rem,14px)] leading-7 text-white/90"
                    >
                        {{ benefit.description }}
                    </p>
                </article>

                <div
                    class="self-center md:col-span-2 lg:col-span-7 lg:col-start-6 lg:row-start-2"
                >
                    <p
                        class="text-center text-base leading-7 text-white/85 lg:text-right lg:text-lg lg:leading-8"
                    >
                        Since 2014, Archon has set its eyes on continuous
                        growth. What started as a young entrant in the industry
                        with only three (3) surplus units on hand has now become
                        a top player with over 1,000 employees nationwide.
                    </p>
                    <p
                        class="mt-8 text-center text-base leading-7 text-white/85 lg:text-right lg:text-lg lg:leading-8"
                    >
                        We have partnered with China’s leading brands, created
                        multiple service stations nationwide, and established
                        Gateway – the reliable parts provider, making us a
                        one-stop shop for all our clients.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
