<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>


<style lang="scss"> //scoped에서는 App.vue에서만 적용된다. 모든 컴포넌트에 적용하녀면 scope 지우기
@import "~/scss/main"; //main.scss쓰겠다 

</style>