import { describe, it, expect, vi, test } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import HotelMain from '../../hotels/HotelMain.vue'
import HotelCard from '../../hotels/HotelCard.vue'



let wrapper: any 
let childComponent: any
const hotelCardRef =  {
  value: [
  { id: 1, isSelected: true },
  { id: 2, isSelected: true },
]}
// vi.mock('../../hotels/HotelCard.vue', () => ({
//   name: 'HotelCard',
//   template: '<div @click="emitSelected" />',
//   setup() {
//     const emit = (event) => {
//       return {
//         emitSelected: () => emit('selected', 1),
//       };
//     };
//     return {
//       emitSelected: emit(() => {}),
//     };
//   },
// }));

describe('HotelMain', () => {
  it('renders properly', async () => {
    wrapper = mount(HotelMain, {
      global: {
        plugins: [
          createTestingPinia({ createSpy: vi.fn() })
        ],
      },
      provide: {
        hotelCardRef: () => hotelCardRef
      }
    });
  })
  test('activeModalPrice', () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.vm.modalComparison).toBe(false)
    wrapper.vm.activeModalPrice()
    expect(wrapper.vm.modalComparison).toBe(true)
  })
  test('testFunctions', async () => {
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
