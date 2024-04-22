import { mount } from '@vue/test-utils';
import PokemoList from './PokemonList.vue';

describe('PokemoList', () => {
  it('renders pokemon name and type correctly', () => {
    const wrapper = mount(PokemoList, {
      props: {
        name: 'Pikachu',
        ids: 25,
        type: 'Electric'
      }
    });

    expect(wrapper.find('.text-center').text()).toBe('Pikachu');
    expect(wrapper.find('.styleType').text()).toBe('Electric');
  });

  it('changes background color on hover', async () => {
    const wrapper = mount(PokemoList, {
      props: {
        name: 'Bulbasaur',
        ids: 1,
        type: 'Grass/Poison'
      }
    });

    await wrapper.trigger('mouseenter');
    expect(wrapper.classes()).toContain('cardListPokemonHover');
    
    await wrapper.trigger('mouseleave');
    expect(wrapper.classes()).not.toContain('cardListPokemonHover');
  });
});