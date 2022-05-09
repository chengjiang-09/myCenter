<template>
    <div class="DynamicNowWeather" :class="{DynamicNowWeatherShow:showFlag && placeWeather.forecasts}" >
      <div class="weather">
        <h3 v-show="showFlag">近五天天气情况提醒：</h3>
        <ul>
          <li
            v-for="(obj, index) in placeWeather.forecasts"
            :key="obj.date"
            class="weather-day"
            @mousemove="enterShow(index)"
            @mouseleave="enterClose(index)"
          >
            <p>
              <span v-for="num in obj.date" :key="num">{{ num }}</span>
            </p>
            <p>
              <span> {{ obj.week }}</span>
            </p>
            <p>
              <span>最高气温 {{ obj.high }}℃ 最低气温 {{ obj.low }}℃</span>
            </p>
            <p>
              <span>{{ obj.wd_day }} </span><span> {{ obj.wc_day }}</span>
            </p>
          </li>
        </ul>
        <p class="alertWarn" :class="{ alertWarnShow: alertWarnShow }">
          <span>外出请注意天气情况哟~~~</span>
        </p>
      </div>
    </div>
</template>

<script>
// import { onMounted, ref, reactive } from 'vue'
import { getUserPlaceWeatherAPI } from '@/api'
import { reactive, ref } from 'vue'
import { onBeforeMount, onMounted } from '@vue/runtime-core'
import weather from '@/mock/weather.json'
import { COMPOMENT_SHOW_TIME } from '@/utils/keyWord.js'
export default {
  name: 'DynamicNowWeather',
  setup (props, { emit }) {
    const placeWeather = reactive({
      location: {},
      forecasts: [],
      now: {}
    })

    const alertWarnShow = ref(false)

    const getPlaceOrWeather = async () => {
      try {
        const m = await getUserPlaceWeatherAPI()
        placeWeather.location = m.result.location
        placeWeather.forecasts = m.result.forecasts.map((obj) => {
          obj.date = obj.date.split('-')
          return obj
        })
        placeWeather.now = m.result.now
      } catch (e) {
        placeWeather.location = weather.result.location
        placeWeather.forecasts = weather.result.forecasts.map((obj) => {
          obj.date = obj.date.split('-')
          return obj
        })
        placeWeather.now = weather.result.now
      }
    }

    const enterShow = (index) => {
      if (index === 0) {
        alertWarnShow.value = true
        emit('onMouseMove')
      }
    }

    const enterClose = (index) => {
      if (index === 0) {
        alertWarnShow.value = false
        emit('onMouseLeave')
      }
    }

    const showFlag = ref(false)

    const showComponent = () => {
      // console.log(placeWeather.forecasts)
      if (placeWeather.forecasts) {
        setTimeout(() => {
          showFlag.value = true
        }, COMPOMENT_SHOW_TIME)
      }
    }

    onBeforeMount(() => {
      getPlaceOrWeather()
    })

    onMounted(() => {
      showComponent()
    })

    return {
      placeWeather,
      enterShow,
      enterClose,
      alertWarnShow,
      showFlag
    }
  }
}
</script>

<style scoped lang="less">
@COPONENT_SHOW_TIME: .8s;
.DynamicNowWeatherShow {
  transform: translate(0%, -50%) !important;
}

.DynamicNowWeather {
  position: absolute;
  z-index: 2;
  top: 40%;
  right: 5%;
  transition: transform @COPONENT_SHOW_TIME;
  transform: translate(0%, -200%);
  .weather {
    position: relative;
    h3,
    span {
      color: #fff;
    }
    .alertWarn {
      position: absolute;
      bottom: 20%;
      left: -165%;
      opacity: 0;
      transition: opacity 1s;
      span {
        font-size: 1.375rem;
      }
    }
    .alertWarnShow {
      opacity: 1;
    }

    li {
      border-bottom: 1px solid #fff;
    }

    & li:nth-child(1) {
      cursor: pointer;
      position: absolute;
      border-bottom: none;
      top: 10%;
      left: -185%;
      padding-right: 20px;
      padding-bottom: 40px;
      transform: translate(0, -50%);
      border-right: 1px dashed #fff;
      p {
        span {
          font-size: 24px;
        }
      }

      p:nth-of-type(1) {
        position: relative;
        margin-bottom: -70px;
        span {
          font-size: 36px;
        }

        & span:nth-child(3) {
          font-size: 240px;
        }

        & span:nth-child(1) {
          position: absolute;
          top: 60%;
          right: 0%;
        }

        & span:nth-child(2) {
          position: absolute;
          top: 50%;
          right: 0%;
        }
      }
      p:nth-of-type(2),
      p:nth-of-type(3),
      p:nth-of-type(4) {
        text-align: center;
      }
    }

    &-day {
      margin-bottom: 10px;
      span {
        color: #fff;
      }
    }

    ul > p {
      span {
        font-size: 26px;
      }
    }
  }
}
</style>
