import { describe, it, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount, shallowMount } from '@vue/test-utils'
import HotelComponent from '../../HotelComponent.vue'
import { afterEach, beforeEach } from 'node:test'
let wrapper: any
describe('HotelComponent', () => {
  beforeEach(() => {
    const pinia = createTestingPinia()
    wrapper = shallowMount(HotelComponent, {
      global: {
        plugins: [pinia]
      }
    })
    // wrapper = mount(HotelComponent, {
    //   global: {
    //     plugins: [createTestingPinia()]
    //   }
    // })
    afterEach(() => {
      if (wrapper) {
        wrapper.unmount()
      }
    })
    expect(wrapper).toBeTruthy()
    describe('activeModal')
  })
})
