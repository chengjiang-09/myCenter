<template>
  <div class="mouseBG" ></div>
  <div class="secondMouseBG" >
    CLICK
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
export default {
  name: 'DynamicMouseFullow',
  setup () {
    const mouseBG = ref(null)
    const secondMouseBG = ref(null)

    const mouseFullow = (e) => {
      const left = e.clientX - 50
      const top = e.clientY - 50

      mouseBG.value.style.transform = `translate3d(${left}px,${top}px,0px)`
      secondMouseBG.value.style.transform = `translate3d(${left}px,${top}px,0px)`
    }

    onMounted(() => {
      mouseBG.value = document.querySelector('.mouseBG')
      secondMouseBG.value = document.querySelector('.secondMouseBG')

      window.addEventListener('mousemove', mouseFullow)
    })

    onBeforeUnmount(() => {
      mouseBG.value = null
      secondMouseBG.value = null

      window.removeEventListener('mousemove', mouseFullow)
    })

    return {
    }
  }
}
</script>

<style scoped lang="less">
.mouseBG {
  pointer-events: none;
  position: fixed;
  z-index: 999;
  transition: transform 0.3s ease-out, width 0.5s ease-out, height 0.5s ease-out,
    margin 0.5s ease-out,background-color .5s ease-out;

  display: block;
  width: 100px;
  height: 100px;
  background-color: transparent;
  border: 3px solid #fff;
  border-radius: 100px;
}
.BGdown {
  width: 20px;
  height: 20px;
  margin: 40px 0px 0px 40px;
  background-color: #000;
}

.secondMouseBG {
  pointer-events: none;
  position: fixed;
  z-index: 999;
  width: 80px;
  height: 80px;
  border-radius: 60px;
  background-color: transparent;
  margin: 10px 0px 0px 10px;
  transition: transform 0.5s ease-out, width 0.5s ease-out, height 0.5s ease-out, margin 0.5s ease-out
  , border .5s ease-out,line-height .5s ease-out,font-size .4s ease-out,color .4s ease-out;
  opacity: .8;
  border: 3px solid #ffffff;
  text-align: center;
  line-height: 75px;
  font-size: 25px;
  color: #fff;
}

.BGdown2 {
  width: 40px;
  height: 40px;
  margin: 30px 0px 0px 30px;
  border: 3px solid #000000;
  line-height: 35px;
  font-size: 0px;
  color:transparent;
}
</style>
