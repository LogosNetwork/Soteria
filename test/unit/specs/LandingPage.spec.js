import Vue from 'vue'
import Navigator from '@/components/Navigator'

describe('Navigator.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Navigator)
    }).$mount()

    expect(vm.$el.querySelector('.title').textContent).to.contain('Welcome to your new project!')
  })
})
