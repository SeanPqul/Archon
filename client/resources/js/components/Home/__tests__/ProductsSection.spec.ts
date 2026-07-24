import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import ProductsSection from '@/components/Home/ProductsSection.vue';

describe('ProductsSection', () => {
    beforeEach(() => {
        const modalRoot = document.createElement('div');
        modalRoot.id = 'modal-root';
        document.body.appendChild(modalRoot);
    });

    afterEach(() => {
        document.body.style.overflow = '';
        document.body.innerHTML = '';
    });

    it('limits comparison selection to two products', async () => {
        const wrapper = mount(ProductsSection);

        for (const productCard of wrapper.findAll('article').slice(0, 3)) {
            await productCard.trigger('mouseenter');
            await productCard
                .findAll('button')
                .find((button) => button.text().trim() === 'Compare')!
                .trigger('click');
        }

        expect(wrapper.text()).toContain('2 of 2 products selected');

        wrapper.unmount();
    });

    it('shows the supplied active-card treatment on hover or tap', async () => {
        const wrapper = mount(ProductsSection);
        const cards = wrapper.findAll('article');

        expect(
            wrapper.findAll('[src="/assets/shapes-line/bg-truck-shape.png"]'),
        ).toHaveLength(0);

        await cards[1].trigger('mouseenter');

        expect(cards[1].attributes('data-active')).toBe('true');
        expect(
            cards[1]
                .find('[src="/assets/shapes-line/bg-truck-shape.png"]')
                .exists(),
        ).toBe(true);
        expect(cards[1].text()).toContain('Quick View');
        expect(cards[1].text()).toContain('Compare');

        await cards[2].trigger('click');

        expect(cards[1].attributes('data-active')).toBe('false');
        expect(cards[2].attributes('data-active')).toBe('true');

        wrapper.unmount();
    });

    it('focuses the dialog and restores focus to its opener', async () => {
        const wrapper = mount(ProductsSection, { attachTo: document.body });
        await wrapper.findAll('article')[0].trigger('mouseenter');

        const opener = wrapper
            .findAll('button')
            .find((button) => button.text().trim() === 'Quick View');

        expect(opener).toBeDefined();
        await opener!.trigger('click');
        await nextTick();

        const closeButton = document.querySelector<HTMLButtonElement>(
            '[aria-label="Close quick view"]',
        );

        expect(closeButton).not.toBeNull();
        expect(document.activeElement).toBe(closeButton);

        closeButton!.click();
        await nextTick();

        expect(document.activeElement).toBe(opener!.element);

        wrapper.unmount();
    });
});
