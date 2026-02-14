import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PageNav from '../PageNav.vue'

describe('PageNav', () => {
  it('renders properly', () => {
    const wrapper = mount(PageNav)
    expect(wrapper.text()).toContain('Powrót do listy')
  })
})
