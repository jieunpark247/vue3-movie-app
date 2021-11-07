<template>
  <RouterLink
    to="/"
    class="logo">
    <span>OMDbAPI</span>.COM
  </RouterLink>
</template>

<script>

</script>
<style lang="scss" scoped>
@import "~/scss/main";
.logo {
    font-family: "Oswald", sans-serif;
    font-size: 20px;
    color: $black;
    text-decoration: none; // 밑줄표시 지움 
    &:hover {
        color: $black;
    }
    span {
        color: $primary;
    }
}
</style>
