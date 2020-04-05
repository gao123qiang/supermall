<template>
    <div class="detail-size">
      <img :src="imageUrl(detailsizeimage)" alt="" @load="imageSizeLoad">
    </div>
</template>

<script>
    export default {
      name: "DetailSizeInfo",
      props: {
        detailsizeimage: {
          type: String,
          default() {
            return ''
          }
        }
      },
      data() {
        return {
          base_root: "http://127.0.0.1:8000/media"
        }
      },
      computed: {
        imageUrl() {
          return function (imageurl) {
            return this.base_root + "/" + imageurl;
          }
        }
      },
      methods: {
        imageSizeLoad() {
          this.$emit("imageSizeLoad");
        }
      }
    }
</script>

<style scoped>

  .detail-size {
    padding-bottom: 20px;
    border-bottom: 5px solid #f2f5f8;
  }

  .detail-size img {
    width: 100%;
    height: 100%;
  }
</style>
