<script setup lang="ts">
import { ref } from 'vue';
import { services } from '@/data/homepage';

const activeIndex = ref(0);

const selectService = (index: number) => {
    activeIndex.value = index;
};

const navigateServiceRail = (event: KeyboardEvent) => {
    const lastIndex = services.length - 1;
    let nextIndex = activeIndex.value;

    switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case 'PageDown':
            nextIndex = Math.min(activeIndex.value + 1, lastIndex);
            break;
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'PageUp':
            nextIndex = Math.max(activeIndex.value - 1, 0);
            break;
        case 'Home':
            nextIndex = 0;
            break;
        case 'End':
            nextIndex = lastIndex;
            break;
        default:
            return;
    }

    event.preventDefault();
    selectService(nextIndex);
};

const selectServiceFromPointer = (event: PointerEvent) => {
    if (event.type === 'pointermove' && !(event.buttons & 1)) {
        return;
    }

    const rail = event.currentTarget as HTMLInputElement;
    const { top, height } = rail.getBoundingClientRect();

    if (!height) {
        return;
    }

    const progress = Math.min(Math.max((event.clientY - top) / height, 0), 1);

    selectService(Math.round(progress * (services.length - 1)));
};
</script>

<template>
    <section id="services" class="services-section site-shell scroll-mt-12">
        <p class="eyebrow">Our Services</p>
        <h2 class="services-heading">
            The Best After Sales
            <span class="text-gold">In Maintenance.</span>
        </h2>
        <p class="services-introduction">
            An excellent After-Sales Maintenance Service with state of the art
            facility and highly skilled After-Sales support team.
        </p>

        <div class="services-panel">
            <img
                src="/assets/shapes-line/bg-service.png"
                alt=""
                class="services-panel-shape"
                loading="lazy"
                decoding="async"
            />
            <div
                class="services-panel-accent"
                :style="{
                    '--service-progress': `${
                        (activeIndex / (services.length - 1)) * 100
                    }%`,
                }"
            >
                <span class="services-panel-scrollbar-track" aria-hidden="true">
                    <span class="services-panel-scrollbar-progress"></span>
                    <span class="services-panel-scrollbar-thumb"></span>
                </span>
                <input
                    v-model.number="activeIndex"
                    type="range"
                    min="0"
                    :max="services.length - 1"
                    step="1"
                    class="services-panel-scrollbar"
                    aria-label="Choose an after-sales service"
                    :aria-valuetext="services[activeIndex].title"
                    @keydown="navigateServiceRail"
                    @pointerdown.prevent="selectServiceFromPointer"
                    @pointermove="selectServiceFromPointer"
                />
            </div>

            <p class="services-panel-copy">
                We will assign a dedicated After-Sales Representative to cater
                to your servicing needs. A highly skilled mechanics are always
                ready to assist in all technical concerns.
            </p>

            <div class="services-content">
                <img
                    src="/assets/images/img-services.png"
                    alt="Archon technicians servicing a truck engine"
                    class="services-image"
                    loading="lazy"
                    decoding="async"
                />

                <div class="services-accordion">
                    <article
                        v-for="(service, index) in services"
                        :key="service.title"
                        class="services-accordion-item"
                    >
                        <h3>
                            <button
                                type="button"
                                class="services-accordion-button"
                                :aria-label="service.title"
                                :aria-expanded="activeIndex === index"
                                :aria-controls="`service-panel-${index}`"
                                @click="selectService(index)"
                            >
                                <span>
                                    <strong
                                        v-if="index < 4"
                                        class="mr-2 text-gold"
                                        >{{ service.title.split(' ')[0] }}
                                    </strong>
                                    <span v-if="index < 4" class="sr-only">
                                        {{ ' ' }}
                                    </span>
                                    <span>
                                        {{
                                            index < 4
                                                ? service.title
                                                      .split(' ')
                                                      .slice(1)
                                                      .join(' ')
                                                : service.title
                                        }}
                                    </span>
                                </span>
                                <svg
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    stroke="currentColor"
                                    :class="[
                                        activeIndex === index
                                            ? '-rotate-45'
                                            : 'rotate-45',
                                        'services-accordion-arrow',
                                    ]"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M4 14h20m-7-7 7 7-7 7"
                                        stroke-width="1.8"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>
                        </h3>
                        <div
                            v-show="activeIndex === index"
                            :id="`service-panel-${index}`"
                            class="services-accordion-panel"
                        >
                            <p
                                v-if="service.description"
                                class="services-accordion-description"
                            >
                                {{ service.description }}
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.services-section {
    padding-block: 8.5rem 9rem;
    color: #fff;
}

.services-heading {
    margin-top: 1.25rem;
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.035em;
}

.services-introduction {
    max-width: 49rem;
    margin-top: 1.75rem;
    color: rgb(255 255 255 / 85%);
    font-size: 1rem;
    line-height: 1.7;
}

.services-panel {
    position: relative;
    min-height: 43rem;
    margin-top: 2rem;
    overflow: hidden;
    border-radius: 2.75rem;
    background: #272727;
    padding: 1.75rem;
}

.services-panel-shape {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left top;
}

.services-panel-accent {
    position: absolute;
    z-index: 1;
    top: 7.5rem;
    right: 2.2%;
    display: none;
    width: 1.25rem;
    height: 35rem;
}

.services-panel-scrollbar {
    position: absolute;
    z-index: 2;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    cursor: ns-resize;
    opacity: 0;
    appearance: slider-vertical;
    -webkit-appearance: slider-vertical;
    touch-action: none;
}

.services-panel-scrollbar-track {
    position: absolute;
    top: 0;
    left: 50%;
    width: 0.3rem;
    height: 100%;
    transform: translateX(-50%);
    border-radius: 999px;
    background: #fff;
    pointer-events: none;
}

.services-panel-scrollbar-progress {
    display: block;
    width: 100%;
    height: var(--service-progress);
    border-radius: inherit;
    background: #9d0211;
}

.services-panel-scrollbar-thumb {
    position: absolute;
    top: var(--service-progress);
    left: 50%;
    width: 1.05rem;
    height: 1.05rem;
    transform: translate(-50%, -50%);
    border-radius: 999px;
    background: #9d0211;
}

.services-panel-accent:has(.services-panel-scrollbar:focus-visible)
    .services-panel-scrollbar-track {
    outline: 2px solid #cb9f53;
    outline-offset: 0.3rem;
}

.services-panel-copy,
.services-content {
    position: relative;
    z-index: 1;
}

.services-panel-copy {
    max-width: 47rem;
    color: rgb(255 255 255 / 88%);
    font-size: 1rem;
    line-height: 1.7;
}

.services-content {
    display: grid;
    gap: 2rem;
    margin-top: 2.5rem;
}

.services-image {
    width: 100%;
    height: 20rem;
    border-radius: 2.25rem;
    object-fit: cover;
}

.services-accordion {
    border-top: 1px solid rgb(255 255 255 / 20%);
    border-bottom: 1px solid rgb(255 255 255 / 20%);
}

.services-accordion-item {
    border-bottom: 1px solid rgb(255 255 255 / 20%);
}

.services-accordion-item:last-child {
    border-bottom: 0;
}

.services-accordion-button {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 1.25rem;
    padding-block: 1.45rem;
    color: #fff;
    text-align: left;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.25;
    transition: color 160ms ease;
}

.services-accordion-button:hover {
    color: #cb9f53;
}

.services-accordion-button:focus-visible {
    outline: 2px solid #cb9f53;
    outline-offset: -2px;
}

.services-accordion-arrow {
    width: 2rem;
    height: 2rem;
    flex: none;
    transition: transform 180ms ease;
}

.services-accordion-panel {
    padding-bottom: 1.6rem;
}

.services-accordion-description {
    max-width: 32rem;
    color: rgb(255 255 255 / 78%);
    line-height: 1.65;
}

@media (min-width: 1024px) {
    .services-section {
        padding-block: 8.5rem 10.5rem;
    }

    .services-heading {
        font-size: 3rem;
    }

    .services-introduction {
        margin-top: 2rem;
        font-size: 1.0625rem;
    }

    .services-panel {
        width: calc(100% + 9.125rem);
        min-height: 67rem;
        margin-top: 1.25rem;
        margin-left: -6.125rem;
        overflow: visible;
        border-radius: 0;
        background: transparent;
        padding: 2rem 6.25rem 0;
    }

    .services-panel-shape {
        object-fit: fill;
    }

    .services-panel-accent {
        display: block;
    }

    .services-panel-copy {
        max-width: 44rem;
        font-size: 1.0625rem;
    }

    .services-content {
        grid-template-columns: 49.8125rem minmax(0, 1fr);
        column-gap: 6.0625rem;
        align-items: start;
        margin-top: 2rem;
    }

    .services-image {
        width: 49.8125rem;
        height: 40.1875rem;
        border-radius: 2.375rem;
    }

    .services-accordion-button {
        padding-block: 1.9rem;
        font-size: 1.625rem;
    }

    .services-accordion-panel {
        padding-bottom: 2rem;
    }

    .services-accordion-description {
        max-width: 34rem;
        font-size: 1.0625rem;
    }
}

@media (max-width: 1200px) {
    .services-content {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        column-gap: 3.5rem;
    }

    .services-image {
        width: 100%;
        height: 33rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .services-accordion-button,
    .services-accordion-arrow {
        transition: none;
    }
}
</style>
