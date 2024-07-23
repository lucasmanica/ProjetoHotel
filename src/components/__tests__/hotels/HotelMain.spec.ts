import { describe, it, expect } from 'vitest'
import { createTestingPinia, setActivePinia } from '@pinia/testing'
import { shallowMount, mount } from '@vue/test-utils'
import HotelMain from '../../hotels/HotelMain.vue'
import { beforeEach } from 'node:test'

//let wrapper: any
describe('The Welcome', () => {
  it('Mounts properly', async () => {
    const wrapper = mount(HotelMain)

    expect(wrapper).toBeTruthy()
  })
})
// describe('HotelComponent', () => {
//   beforeEach(() => {
//     wrapper = shallowMount(HotelMain, {
//       global: {
//         plugins: [createTestingPinia()],
//         stubs: {},
//         mocks: {}
//       }
//     })
//   })
//   describe('activeModalPrice', () => {
//     it('Chama o método activeModalPrice e modifica a propriedade modalComparison', () => {
//       wrapper.vm.activeModalPrice()
//       expect(wrapper.vm.modalComparison).toBe(true)
//     })
//   })
// })
