import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import ServicesSection from '@/components/Home/ServicesSection.vue';

describe('ServicesSection', () => {
    it('exposes a single accessible accordion state', async () => {
        const wrapper = mount(ServicesSection);
        const buttons = wrapper.findAll('button[aria-controls]');

        expect(buttons[0].attributes('aria-expanded')).toBe('true');
        expect(buttons[1].attributes('aria-expanded')).toBe('false');

        await buttons[1].trigger('click');

        expect(buttons[0].attributes('aria-expanded')).toBe('false');
        expect(buttons[1].attributes('aria-expanded')).toBe('true');
        expect(wrapper.get('#service-panel-1').isVisible()).toBe(true);
    });

    it('uses the visual service rail as an accessible service navigator', async () => {
        const wrapper = mount(ServicesSection);
        const rail = wrapper.get('input[type="range"]');
        const buttons = wrapper.findAll('button[aria-controls]');

        expect(rail.attributes('aria-label')).toBe(
            'Choose an after-sales service',
        );
        expect(rail.attributes('aria-valuetext')).toBe(
            'Preventive Maintenance Services',
        );

        await rail.trigger('keydown', { key: 'End' });

        expect(buttons[4].attributes('aria-expanded')).toBe('true');
        expect(rail.attributes('aria-valuetext')).toBe('Overhauling');

        await rail.setValue('3');

        expect(buttons[3].attributes('aria-expanded')).toBe('true');
        expect(wrapper.get('#service-panel-3').isVisible()).toBe(true);
        expect(rail.attributes('aria-valuetext')).toBe('Repair or Replace');

        Object.defineProperty(rail.element, 'getBoundingClientRect', {
            value: () => ({ top: 100, height: 400 }),
        });

        rail.element.dispatchEvent(
            new MouseEvent('pointerdown', { bubbles: true, clientY: 300 }),
        );
        await nextTick();

        expect(buttons[2].attributes('aria-expanded')).toBe('true');
        expect(rail.attributes('aria-valuetext')).toBe('On-Site Rescue');
    });
});
