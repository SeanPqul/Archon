import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HeroSection from '@/components/Home/HeroSection.vue';

describe('HeroSection', () => {
    it('cycles through the supplied truck images in both directions', async () => {
        const wrapper = mount(HeroSection);
        const activeImage = () =>
            wrapper.get('img[alt^="White Archon"], img[alt^="Archon"]');

        expect(activeImage().attributes('src')).toBe(
            '/assets/images/img-banner.png',
        );

        await wrapper
            .get('button[aria-label="Show next truck image"]')
            .trigger('click');
        expect(activeImage().attributes('src')).toBe(
            '/assets/images/truck1.png',
        );

        await wrapper
            .get('button[aria-label="Show previous truck image"]')
            .trigger('click');
        expect(activeImage().attributes('src')).toBe(
            '/assets/images/img-banner.png',
        );

        await wrapper
            .get('button[aria-label="Show previous truck image"]')
            .trigger('click');
        expect(activeImage().attributes('src')).toBe(
            '/assets/images/truck6.png',
        );

        await wrapper
            .get('button[aria-label="Show next truck image"]')
            .trigger('click');
        expect(activeImage().attributes('src')).toBe(
            '/assets/images/img-banner.png',
        );
        expect(wrapper.get('[aria-live="polite"]').text()).toContain(
            'Showing truck image 1 of 7',
        );
    });
});
