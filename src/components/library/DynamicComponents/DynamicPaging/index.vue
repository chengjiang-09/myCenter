<template>
  <div class="DynamicPaging">
      <div class="leftBtn" @click="goRight">
          <ArrowLeftBold />
      </div>
      <div class="pageNumList">
          <ul class="DynamicPaging-container" ref="list">
              <li v-for="obj in pageList" :key="obj.id" :class="[{liActive:obj.flag}]" @click="goThis(obj.id)">{{ obj.id }}</li>
          </ul>
      </div>
      <div class="rightBtn" @click="goLeft">
          <ArrowRightBold />
      </div>
  </div>
</template>

<script>
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'
export default {
  name: 'DynamicPaging',
  emits: ['pageNum'],
  components: {
    ArrowLeftBold,
    ArrowRightBold
  },
  props: {
    pageNums: {
      type: [Number, String],
      default: 5
    }
  },
  setup (props, { emit }) {
    const pageList = reactive([])
    onMounted(() => {
      const id = ref(0)
      const flag = ref(false)
      for (let i = 0; i < props.pageNums; i++) {
        id.value = i
        flag.value = false
        if (i === 0) {
          flag.value = true
        }
        pageList.push({
          id: id.value + 1,
          flag: flag.value
        })
      }
    })

    const list = ref(null)
    const translateBase = ref(6)
    const activeID = ref(1)

    const moveList = () => {
      list.value.style.transform = `translate(${translateBase.value}%,${0}%)`
      pageList.forEach(obj => {
        obj.flag = false
        if (obj.id === activeID.value) {
          obj.flag = true
        }
      })
      emit('pageNum', activeID.value)
    }

    const goLeft = () => {
      if (translateBase.value !== 6 - (props.pageNums - 1) * 3) {
        activeID.value += 1
        translateBase.value -= 3
        moveList()
      }
    }

    const goRight = () => {
      if (translateBase.value !== 6) {
        activeID.value -= 1
        translateBase.value += 3
        moveList()
      }
    }

    const goThis = (id) => {
      if (id > activeID.value) {
        translateBase.value -= 3 * (id - activeID.value)
        activeID.value = id
        moveList()
      } else if (id < activeID.value) {
        translateBase.value += 3 * (activeID.value - id)
        activeID.value = id
        moveList()
      }
    }

    onMounted(() => {
      emit('pageNum', activeID.value)
    })

    return {
      pageList, goLeft, goRight, goThis, list
    }
  }
}
</script>

<style scoped lang="less">
.DynamicPaging {
    position: absolute;
    width: 60vw;
    height: 10vh;
    bottom: 5%;
    left: 50%;
    transform: translate(-50%,0%);

    .leftBtn {
        cursor:pointer;
        position: absolute;
        width: 3vw;
        top: 50%;
        left: 20%;
        color: #fff;
        transform: translate(0,-50%);
    }

    .pageNumList {
        position: absolute;
        top: 50%;
        left: 28%;
        color: #fff;
        transform: translate(0%,-50%);
        overflow: hidden;
        height: 6vw;
        width: 30vw;
        line-height: 6vw;
        .DynamicPaging-container {
            position: absolute;
            transform: translate(6%,0%);
            height: 3vw;
            width: 200vw;
            transition: transform .4s;
            li {
                cursor:pointer;
                width: 3vw;
                height: 3vw;
                margin-right: 3vw;
                display: inline-block;
                color: #fff;
                font-size: 2vw;
                text-align: center;
                line-height: 2.5vw;
                border: 2px solid #fff;
                border-radius: 3vw;
                opacity: .7;
                transform: scale(1,1);
                transition: opacity .5s,transform .5s;
            }

            .liActive {
                opacity: 1;
                transform: scale(1.3,1.3);
            }
        }
    }

    .rightBtn {
        cursor:pointer;
        position: absolute;
        width: 3vw;
        top: 50%;
        right: 20%;
        color: #fff;
        transform: translate(0,-50%);
    }
}
</style>
