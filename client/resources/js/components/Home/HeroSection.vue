<script setup lang="ts">
const focusQuoteForm = () => {
    const target = document.getElementById('quote-heading');
    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
    ).matches;

    target?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
    });
    window.setTimeout(() => target?.focus(), reducedMotion ? 0 : 450);
};
</script>

<template>
    <section
        id="top"
        class="hero-section relative isolate overflow-hidden bg-[#122125]"
    >
        <div class="absolute inset-0 -z-20">
            <img
                src="/assets/images/bg-banner.png"
                alt=""
                class="absolute inset-y-0 right-0 h-full w-[104%] max-w-none object-cover object-right-bottom"
            />
            <div class="hero-background-overlay absolute inset-0" />
        </div>
        <div
            class="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[3.75vw] bg-archon lg:block"
            aria-hidden="true"
        />

        <div
            class="site-shell relative min-h-[53.125rem] py-16 sm:py-20 lg:min-h-[60.625rem] lg:py-20"
        >
            <div
                class="grid items-start gap-10 lg:grid-cols-[1.25fr_.55fr] lg:gap-12"
            >
                <h1
                    class="max-w-5xl text-[clamp(3rem,5vw,6rem)] leading-[1.08] font-extrabold tracking-[-0.045em] text-white uppercase"
                >
                    Your <span class="text-brand-red">Reliable</span><br />
                    Heavy Duty Truck<br />
                    <span class="text-gold">Provider</span>
                </h1>

                <div
                    class="max-w-md pt-3 lg:translate-x-14 lg:justify-self-end lg:pt-6"
                >
                    <p
                        class="text-base leading-8 font-medium text-white/90 lg:text-xl"
                    >
                        Archon is the top distributor of China’s famous brands –
                        HOWO trucks heavy equipment
                    </p>
                    <a
                        href="#quote"
                        class="mt-8 inline-flex min-w-60 items-center justify-between gap-6 rounded-full bg-brand-red px-9 py-5 font-semibold text-white shadow-[0_0.9375rem_2.1875rem_rgba(157,2,17,.34)] transition hover:-translate-y-0.5 hover:bg-[#b50718] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                        @click.prevent="focusQuoteForm"
                    >
                        Request Quote
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
                </div>
            </div>

            <div
                class="relative z-10 mt-14 max-w-sm lg:absolute lg:bottom-20 lg:left-0 lg:mt-0"
            >
                <p class="text-base leading-7 text-white/85 lg:text-lg">
                    Archon is the premier distributor of China’s renowned
                    brands, specializing in HOWO trucks and heavy equipment.
                </p>
                <button
                    type="button"
                    class="mt-8 inline-flex cursor-not-allowed items-center gap-5 text-lg font-medium text-gold opacity-90"
                    aria-disabled="true"
                    title="Video source was not included in the provided resources"
                >
                    <span
                        class="grid size-14 place-items-center rounded-full border-2 border-gold"
                    >
                        <img
                            src="/assets/icons/Play.png"
                            alt=""
                            class="size-12"
                        />
                    </span>
                    Watch Video
                </button>
            </div>

            <div
                class="hero-truck-stage relative mt-12 ml-auto flex min-h-72 w-full items-center justify-center overflow-hidden rounded-tl-[2.5rem] rounded-bl-[2.5rem] bg-transparent shadow-2xl sm:min-h-96 lg:absolute lg:bottom-0 lg:h-[37.5rem] lg:min-h-0 lg:w-[72%]"
            >
                <img
                    src="/assets/images/img-banner.png"
                    alt="White Archon HOWO heavy-duty truck at a work site"
                    class="absolute inset-y-0 left-[-4%] block h-full w-[104%] max-w-none object-cover object-center"
                />
            </div>

            <div
                class="pointer-events-none mt-7 flex items-center justify-center gap-8 text-white lg:absolute lg:bottom-[21.5rem] lg:left-[24%] lg:z-20 lg:mt-0 lg:flex-col lg:gap-[2.9375rem]"
                aria-hidden="true"
            >
                <span class="p-1.5">
                    <svg
                        viewBox="0 0 88 48"
                        fill="none"
                        stroke="currentColor"
                        class="w-16 sm:w-20"
                        aria-hidden="true"
                    >
                        <path
                            d="M2 24h78M58 3l22 21-22 21"
                            stroke-width="5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </span>
                <span class="p-1.5 lg:-translate-x-16">
                    <svg
                        viewBox="0 0 88 48"
                        fill="none"
                        stroke="currentColor"
                        class="w-16 sm:w-20"
                        aria-hidden="true"
                    >
                        <path
                            d="M86 24H8M30 3 8 24l22 21"
                            stroke-width="5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </span>
            </div>
        </div>
    </section>
</template>

<style scoped>
.hero-truck-stage {
    box-shadow:
        -0.75rem 0 2rem rgb(214 160 61 / 12%),
        -1.75rem 0 4rem rgb(177 116 34 / 6%),
        0 0.75rem 2.25rem rgb(211 155 57 / 9%),
        0 2.5rem 5rem rgb(166 106 31 / 4%),
        0 1.5rem 2.5rem rgb(0 0 0 / 28%);
}

.hero-truck-stage::before {
    position: absolute;
    z-index: 20;
    right: 0;
    bottom: 0;
    left: 0;
    height: 3.25rem;
    pointer-events: none;
    content: '';
    background:
        radial-gradient(
            6rem 3.25rem at 0 100%,
            rgb(229 180 79 / 9%),
            transparent 74%
        ),
        linear-gradient(
            0deg,
            rgb(211 155 57 / 4%) 0%,
            transparent 82%
        );
}

.hero-truck-stage::after {
    position: absolute;
    z-index: 20;
    top: 0;
    bottom: 0;
    left: 0;
    width: 2.75rem;
    pointer-events: none;
    content: '';
    background:
        radial-gradient(
            2.75rem 5rem at 0 0,
            rgb(229 180 79 / 12%),
            transparent 72%
        ),
        radial-gradient(
            2.75rem 5rem at 0 100%,
            rgb(229 180 79 / 14%),
            transparent 72%
        ),
        linear-gradient(
            90deg,
            rgb(214 160 61 / 6%) 0%,
            transparent 80%
        );
}

@media (min-width: 1024px) {
    .hero-truck-stage {
        right: calc((100% - 100vw) / 2);
    }
}

.hero-background-overlay {
    background:
        linear-gradient(
            180deg,
            rgb(21 22 22 / 2%) 0%,
            transparent 42%,
            transparent 100%
        ),
        linear-gradient(
            90deg,
            rgb(18 33 37 / 40%) 0%,
            rgb(18 33 37 / 28%) 24%,
            rgb(18 33 37 / 14%) 50%,
            rgb(18 33 37 / 4%) 75%,
            transparent 100%
        );
}

</style>
