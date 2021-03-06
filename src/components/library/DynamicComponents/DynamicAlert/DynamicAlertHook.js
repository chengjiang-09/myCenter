import { createVNode, render } from 'vue'
import DynamicAlert from './index.vue'

const vessel = document.createElement('div')
vessel.setAttribute('class', 'DyAlert')
document.body.appendChild(vessel)

export default ({ title, context, titleSize = 24, contextSize, callback }) => {
  render(null, vessel)
  const Vnode = createVNode(DynamicAlert, { title, context, titleSize, contextSize, callback })

  render(Vnode, vessel)
}
