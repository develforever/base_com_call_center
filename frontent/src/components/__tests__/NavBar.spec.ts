import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NavBar from '../NavBar.vue'

describe('NavBar', () => {

  it('renders default title', () => {
    const wrapper = mount(NavBar)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Call Center')
  })

  it('renders title prop', () => {
    const wrapper = mount(NavBar, {
      props: {
        title: 'Test Title',
      },
    })
    expect(wrapper.text()).toContain('Test Title')
  })
})
