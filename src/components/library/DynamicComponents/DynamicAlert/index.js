import { createVNode, render } from 'vue'
import DynamicAlert from './DynamicAlert.vue'

const vessel = document.createElement('div')
vessel.setAttribute('class', 'DyAlert')
document.body.appendChild(vessel)

export default ({ title, context, titleSize = 24 }) => {
  render(null, vessel)
  const Vnode = createVNode(DynamicAlert, { title, context, titleSize })

  render(Vnode, vessel)
}
