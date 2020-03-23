<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.url">
        <img :src="getImgUrl(item.image)" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

    export default {
      name: "HomeSwiper",
      props: {
        banners: {
          type: Array,
          default() {
            return []
          }
        }
      },
      data(){
        return {
          root_url: "http://127.0.0.1:8000/media",
        }
      },
      components: {
        Swiper,
        SwiperItem
      },
      computed: {
        getImgUrl() {
          return function (path) {
            return this.root_url + "/" + path;
          }
        }
      }
    }
</script>

<style scoped>

</style>
