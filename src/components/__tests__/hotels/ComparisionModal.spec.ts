import { describe, it, expect, vi, test } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import ComparisionModal from '../../hotels/ComparisionModal.vue'

let wrapper: any
describe('ComparisionModal', () => {
  it('renders properly', async () => {
    wrapper = mount(ComparisionModal, {
      props: {
        isActive: false,
        hotelsStore: {
          hotels: [
            {
              id: 1
            },
            {
              id: 3
            }
          ]
        },
        selectedHotels: [1, 2]
      },
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn() })],
        stubs: {
          'v-rating': { template: '<div></div>' },
          'v-checkbox': { template: '<div></div>' },
          'v-card': { template: '<div></div>' },
          'v-overlay': { template: '<div></div>' },
          'v-btn': { template: '<div></div>' },
          'v-icon': { template: '<div></div>' },
          'v-empty-state': { template: '<div></div>' },
          'v-dialog': { template: '<div></div>' }
        }
      }
    })
  })
  test('ComparisionModal component test wrapper.', () => {
    expect(wrapper).toBeTruthy()
  })
  test('Computed isActiveModal test.', async () => {
    expect(wrapper.vm.isActiveModal).toBe(false)
  })
  test('Computed getSelectedHotels test, props wrapper property rules.', async () => {
    expect(wrapper.vm.getSelectedHotels.length).toBe(1)
    //Inserir um novo ID válido para aumentar a quantidade de selecionados para comparação
    wrapper.vm.props.selectedHotels.push(3)
    expect(wrapper.vm.getSelectedHotels.length).toBe(2)
  })
})
