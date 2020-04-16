<template>
    <div class="profile">
      <scroll class="profile-content">
        <profile-head></profile-head>
        <profile-order></profile-order>
        <profile-content></profile-content>
      </scroll>
    </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll';


  import ProfileHead from './childComps/ProfileHead'
  import ProfileOrder from './childComps/ProfileOrder'
  import ProfileContent from './childComps/PrfileContent'

  export default {
    name: "Profile",
    components: {
      ProfileHead,
      ProfileOrder,
      ProfileContent,
      Scroll
    }
  }
</script>

<style scoped>
  .profile {
    height: 100vh;
  }

  .profile-content {
    overflow: hidden;
    height: 100%;
  }
</style>
