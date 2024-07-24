import { describe, it, expect, vi, test, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import HotelCard from '../../hotels/HotelCard.vue'

let wrapper: any
let vuetify: any
describe('HotelCard', () => {
  it('renders properly', async () => {
    wrapper = mount(HotelCard, {
      props: {
        hotel: {
          imgUrl: 'image10',
          rating: 4
        }
      },
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn() }), vuetify],
        stubs: {
          'v-rating': { template: '<div></div>' },
          'v-checkbox': { template: '<div></div>' },
          'v-card': { template: '<div></div>' },
          'v-overlay': { template: '<div></div>' },
          'v-btn': { template: '<div></div>' }
        }
      }
    })
  })
  test('HotelCard', () => {
    expect(wrapper).toBeTruthy()
  })
  test('Computed hotelRating test, test reactive from "computed" too.', async () => {
    expect(wrapper.vm.hotelRating).toEqual(4)
    wrapper.vm.props.hotel.rating = 5
    expect(wrapper.vm.hotelRating).toEqual(5)
  })
})
