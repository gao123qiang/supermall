<template>
    <div>
      <coments-item v-for="(item, index) in commentsInfo" :comments-item="item"></coments-item>
    </div>
</template>

<script>

  import ComentsItem from './comentsItem'

    export default {
        name: "comentsInfo",
        props: {
          commentsInfo: {
            type: Array,
            default() {
              return []
            }
          }
        },
        components: {
          ComentsItem
        }
    }
</script>

<style scoped>

</style>
