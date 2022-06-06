<template>
  <div
    class="balloonLayout"
    :class="[
      { balloonLayoutShow: showFlag && Poetry.length !== 0 },
      { balloonLayoutClose: !showFlag },
    ]"
  >
    <!-- <div class="balloonLayout"> -->
    <DynamicBalloon
      class="ballon"
      v-for="obj in Poetry"
      :key="obj.id"
      :str1="obj.name"
      :str2="obj.context"
      @click="readPoetry(obj.id)"
    />
  </div>
  <i
    class="back"
    :class="[{ backShow: !showFlag }, { backClose: showFlag }]"
    @click="backPoetry"
  >
    <span class="back-warn">返回</span>
    <svg width="192" height="61">
      <path
        d="M190.67 59.618c-3.755-6.474-8.055-8.114-15.08-12.037-29.012-16.203-60.856-27.41-93.698-33.032-23.62-4.042-47.563-3.598-70.249 3.098.924 1.042 2.057.631 3.013 1.476.703.62 1.135 1.93 1.81 2.68 1.814 2.007 10 9.118 12.865 7.498-2.329-1.766-5.88-3.105-8.504-4.314-5.608-2.583-11.812-7.142-17.819-8.491 2.17-2.823 19.724-19.765 22.96-12.718"
        stroke="#FFF"
        stroke-width="3"
        fill="none"
        fill-rule="evenodd"
      ></path>
    </svg>
  </i>
  <div
    class="poetryDate"
    :class="[{ poetryDateShow: !showFlag }, { poetryDateClose: showFlag }]"
  >
    <div v-if="poetryData">
      <h3 class="poetryDate-title">《{{ poetryData.name }}》</h3>
      <h5 class="poetryDate-author">{{ poetryData.author }}</h5>
      <p
        class="poetryDate-data"
        v-for="(str, index) in poetryData.data"
        :key="index"
      >
        {{ str }}。
      </p>
    </div>
  </div>
</template>

<script>
import { COMPOMENT_SHOW_TIME } from '@/utils/keyWord.js'
import { computed, nextTick, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'balloonLayout',
  emits: ['oneClose'],
  setup (props, { emit }) {
    const store = useStore()
    store.dispatch('center/updateAncientPoetry')

    const Poetry = computed({
      get () {
        return store.state.center.ancientPoetry
      }
    })

    const showFlag = ref(false)

    const poetryData = ref(null)

    onMounted(() => {
      nextTick(() => {
        setTimeout(() => {
          showFlag.value = true
        }, COMPOMENT_SHOW_TIME)
      })
    })

    const readPoetry = (id) => {
      Poetry.value.forEach((obj) => {
        if (obj.id === id) {
          emit('oneClose', true)
          showFlag.value = false
          poetryData.value = obj
          poetryData.value.data = poetryData.value.data
            .split('。')
            .reduce((arr, val) => {
              if (val !== '') {
                arr.push(val)
              }
              return arr
            }, [])
        }
      })
    }

    const backPoetry = () => {
      emit('oneClose', false)
      showFlag.value = !showFlag.value
    }

    return {
      Poetry,
      showFlag,
      readPoetry,
      poetryData,
      backPoetry
    }
  }
}
</script>

<style scoped lang="less">
@COPONENT_SHOW_TIME: 0.4s;
.balloonLayoutShow {
  transform: translate(0%, 0%) !important;
  opacity: 1 !important;
}

.balloonLayoutClose {
  transform: translate(-200%, 0%);
  opacity: 0;
}

.balloonLayout {
  display: flex;
  position: absolute;
  width: 60vw;
  height: 30vh;
  // overflow: hidden;
  flex-wrap: wrap;
  top: 25%;
  left: 2%;
  transition: transform @COPONENT_SHOW_TIME, opacity @COPONENT_SHOW_TIME;
}
.poetryDateShow {
  transform: translate(0%, 0%) !important;
  opacity: 1 !important;
}

.poetryDateClose {
  transform: translate(-200%, 0%);
  opacity: 0;
}

.backShow {
  transform: translate(0%, 0%) !important;
  opacity: 1 !important;
}

.backClose {
  transform: translate(100%, 0%);
  opacity: 0;
  pointer-events: none;
}

.back {
  position: absolute;
  top: 15%;
  left: 0%;
  cursor: pointer;
  margin-left: 1vw;
  transition: transform @COPONENT_SHOW_TIME, opacity @COPONENT_SHOW_TIME;

  &-warn {
    position: absolute;
    top: 26%;
    left: 25%;
    font-size: 3vw;
    color: #fff;
  }
}

.poetryDate {
  position: absolute;
  width: 45vw;
  height: 50vh;
  // overflow: hidden;
  top: 24%;
  left: 0%;
  // background-color: #000;
  transition: transform @COPONENT_SHOW_TIME, opacity @COPONENT_SHOW_TIME;
  &-author {
    text-align: center;
    font-size: 3vw;
    color: #fff;
  }

  &-title {
    text-align: center;
    font-size: 5vw;
    color: #fff;
  }
  &-data {
    text-align: center;
    color: #fff;
    font-size: 3vw;
  }
}
</style>
