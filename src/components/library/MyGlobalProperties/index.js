import { lazyLoad } from './LazyLoad/index.js'
import { onFocus } from './OnFocus/index.js'

export default {
  install (app) {
    lazyLoad(app)
    onFocus(app)
  }
}
