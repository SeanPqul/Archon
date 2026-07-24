import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import SiteHeader from '@/components/Home/SiteHeader.vue';

describe('SiteHeader', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('links every supplied homepage section', () => {
        const wrapper = mount(SiteHeader);
        const hrefs = wrapper
            .findAll('nav a')
            .map((link) => link.attributes('href'));

        expect(hrefs).toEqual([
            '#about',
            '#products',
            '#services',
            '#articles',
            '#quote',
        ]);
    });

    it('closes the mobile menu on Escape and restores toggle focus', async () => {
        const wrapper = mount(SiteHeader, { attachTo: document.body });
        const menuButton = wrapper.get(
            'button[aria-controls="primary-navigation"]',
        );

        await menuButton.trigger('click');
        expect(menuButton.attributes('aria-expanded')).toBe('true');

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        await nextTick();

        expect(menuButton.attributes('aria-expanded')).toBe('false');
        expect(document.activeElement).toBe(menuButton.element);

        wrapper.unmount();
    });
});
