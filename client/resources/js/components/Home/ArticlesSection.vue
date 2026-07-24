<script setup lang="ts">
import { articles } from '@/data/homepage';
</script>

<template>
    <section
        id="articles"
        class="relative isolate scroll-mt-12 overflow-hidden py-24 text-white lg:py-36"
    >
        <img
            src="/assets/images/bg-article.png"
            alt=""
            class="absolute inset-0 -z-10 size-full object-cover opacity-35"
            loading="lazy"
            decoding="async"
        />
        <div class="site-shell">
            <div class="text-center">
                <p class="eyebrow">Article</p>
                <h2
                    class="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                >
                    We are <span class="text-gold">Archon</span>
                </h2>
            </div>

            <div class="mt-20 grid gap-8 md:grid-cols-3 lg:mt-28">
                <article
                    v-for="article in articles"
                    :key="article.title"
                    class="group overflow-hidden rounded-[1.75rem] bg-white text-[#292929] shadow-2xl"
                >
                    <img
                        :src="article.image"
                        :alt="article.title"
                        class="aspect-[1.25] w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                    />
                    <div
                        class="relative min-h-64 border-b-4 border-brand-red p-7"
                    >
                        <p class="text-[max(.75rem,11px)] text-[#606060]">
                            {{ article.date }}
                        </p>
                        <h3
                            class="mt-4 text-xl leading-tight font-bold lg:text-2xl"
                        >
                            {{ article.title }}
                        </h3>
                        <span
                            class="mt-9 inline-flex items-center gap-4 text-lg text-[#444]"
                            aria-label="Article details are not included in the assessment"
                        >
                            <span class="text-3xl text-gold">→</span>
                            Read Article
                        </span>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>
