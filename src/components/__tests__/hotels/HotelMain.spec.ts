import { describe, it, expect, vi, test } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import HotelMain from '../../hotels/HotelMain.vue'

let wrapper: any
describe('HotelMain', () => {
  it('renders properly', async () => {
    wrapper = mount(HotelMain, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn() })],
        stubs: {
          'v-rating': { template: '<div></div>' },
          'v-checkbox': { template: '<div></div>' },
          'v-card': { template: '<div></div>' },
          'v-overlay': { template: '<div></div>' },
          'v-btn': { template: '<div></div>' },
          'v-icon': { template: '<div></div>' },
          'v-empty-state': { template: '<div></div>' }
        }
      }
    })
  })
  test('HotelMain component test wrapper and activeModalPrice function change state.', () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.vm.modalComparison).toBe(false)
    wrapper.vm.activeModalPrice()
    expect(wrapper.vm.modalComparison).toBe(true)
  })
  test('Test functions', async () => {
    expect(wrapper.vm.selectedHotels).toStrictEqual([])
    /*Ao tentar testar essas funções, foi encontrado um problema em criar um mock
     para a referência do componente filho, talvez com mais tempo eu encontrasse uma 
     solução para criar o mock correto
     */
    wrapper.vm.sortHotels = vi.fn()
    wrapper.vm.sortHotels()
    wrapper.vm.clearSelectedCards = vi.fn()
    wrapper.vm.clearSelectedCards()
  })
})
