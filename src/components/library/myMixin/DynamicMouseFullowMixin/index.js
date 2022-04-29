export default {
  created () {
    window.addEventListener('mousedown', () => {
      const mouseBG = document.querySelector('.mouseBG')
      const mouseBG2 = document.querySelector('.secondMouseBG')
      mouseBG.classList.add('BGdown')
      mouseBG2.classList.add('BGdown2')
    })

    window.addEventListener('mouseup', () => {
      const mouseBG = document.querySelector('.mouseBG')
      const mouseBG2 = document.querySelector('.secondMouseBG')
      mouseBG.classList.remove('BGdown')
      mouseBG2.classList.remove('BGdown2')
    })
  }
}
