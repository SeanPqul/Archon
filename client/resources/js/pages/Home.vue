<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AboutSection from '@/components/Home/AboutSection.vue';
import ArticlesSection from '@/components/Home/ArticlesSection.vue';
import HeroSection from '@/components/Home/HeroSection.vue';
import PartnersSection from '@/components/Home/PartnersSection.vue';
import ProductsSection from '@/components/Home/ProductsSection.vue';
import QuoteSection from '@/components/Home/QuoteSection.vue';
import ServicesSection from '@/components/Home/ServicesSection.vue';
import SiteFooter from '@/components/Home/SiteFooter.vue';
import SiteHeader from '@/components/Home/SiteHeader.vue';

defineProps<{
    ogImage: string;
}>();
</script>

<template>
    <Head title="Heavy-Duty Trucks & Equipment">
        <meta
            head-key="description"
            name="description"
            content="Archon is a leading Philippine distributor of Sinotruk HOWO heavy-duty trucks, equipment, and after-sales maintenance services."
        />
        <meta
            head-key="og-title"
            property="og:title"
            content="Archon Special Machineries Inc."
        />
        <meta
            head-key="og-description"
            property="og:description"
            content="Reliable heavy-duty trucks, equipment, and after-sales support in the Philippines."
        />
        <meta head-key="og-image" property="og:image" :content="ogImage" />
    </Head>

    <div class="min-h-screen overflow-x-clip bg-archon">
        <SiteHeader />
        <main>
            <HeroSection />
            <AboutSection />
            <QuoteSection />
            <PartnersSection />
            <ProductsSection />
            <ServicesSection />
            <ArticlesSection />
        </main>
        <SiteFooter />
    </div>
</template>
