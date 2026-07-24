import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { reactive } from 'vue';
import QuoteSection from '@/components/Home/QuoteSection.vue';

vi.mock('@inertiajs/vue3', () => ({
    usePage: () => ({
        props: {
            flash: {
                quoteSuccess: null,
            },
        },
    }),
    useForm: (fields: Record<string, unknown>) =>
        reactive({
            ...fields,
            processing: false,
            errors: {
                full_name: 'The full name field is required.',
                privacy_accepted: 'The privacy terms must be accepted.',
            },
            post: vi.fn(),
            reset: vi.fn(),
        }),
}));

describe('QuoteSection', () => {
    it('associates validation messages with their fields', () => {
        const wrapper = mount(QuoteSection);
        const nameInput = wrapper.get('input[name="full_name"]');
        const privacyInput = wrapper.get('input[name="privacy_accepted"]');

        expect(nameInput.attributes('aria-invalid')).toBe('true');
        expect(nameInput.attributes('aria-describedby')).toBe(
            'full-name-error',
        );
        expect(privacyInput.attributes('aria-invalid')).toBe('true');
        expect(privacyInput.attributes('aria-describedby')).toBe(
            'privacy-error',
        );
        expect(wrapper.findAll('[role="alert"]')).toHaveLength(2);
    });
});
