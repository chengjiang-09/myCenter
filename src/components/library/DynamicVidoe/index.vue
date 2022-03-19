<!--
 * @Author: chengjiang_09
 * @Date: 2022-03-17 11:13:00
 * @LastEditTime: 2022-03-19 11:00:31
-->
<template>
  <div>
    <video
      ref="dyVideo"
      :src="src"
      :autoplay="autoplay"
      :loop="loop"
      muted
    ></video>
    <h2 class="provenance">@{{ author }}{{ provenance }}</h2>
  </div>
</template>

<script>
import defualtVideo from '@/assets/videos/wuxia.mp4'

export default {
  name: 'DynamicVidoe',
  props: {
    src: {
      type: String,
      default: defualtVideo
    },
    autoplay: {
      type: String,
      default: 'autoplay'
    },
    loop: {
      type: String,
      default: 'loop',
      require: true
    },
    provenance: {
      type: String,
      default:
        'https://steamcommunity.com/sharedfiles/filedetails/?id=2065059443',
      require: true
    },
    author: {
      type: String,
      default: '大污师！'
    }
  }
}
</script>

<style scoped lang="less">
  video {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 89%;
    height: auto;
  }
  .provenance {
    display: none;
  }
</style>
