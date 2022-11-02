import { shallowMount } from '@vue/test-utils'
import Logo from '@/components/Logo.vue'

describe('Logo.vue', () => {
  it('renders props.title when passed', () => {
    const title = 'WTF'
    const wrapper = shallowMount(Logo, {
      propsData: { title }
    })
    expect(wrapper.text()).toMatch(title)
  })
})
