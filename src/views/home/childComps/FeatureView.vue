<template>
    <div class="feature">
      <div class="feature-item" v-for="item in features">
        <a :href="item.link">
          <img :src="getImagePath(item.image)" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
    </div>
</template>

<script>
    export default {
      name: "FeatureView",
      props: {
        features: {
          type: Array,
          default() {
            return []
          }
        }
      },
      data() {
        return {
          root_path: "http://127.0.0.1:8000/media"
        }
      },
      computed: {
        getImagePath() {
          return function (path) {
            return this.root_path + '/' + path;
          }
        }
      },

    }
</script>

<style scoped>
  .feature {
    display: flex;
    width: 100%;
    font-size: 12px;
    text-align: center;
    padding: 10px 0 20px 0;
    border-bottom: 7px solid #DDD;
  }

  .feature-item {
    flex: 1;
  }

  .feature-item img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-bottom: 8px;
  }

</style>
