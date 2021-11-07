<template>
  <div class="container"> 
    <!-- bootstrap에서 자동으로 뷰 크기에 따라 조절해준다. -->
    <h1> 
      <span>OMDb API</span><br />
      THE OPEN<br /> 
      MOVIE DATABASE
    </h1>
    <p>
      The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.<br /> 
      If you find this service useful, please consider making a one-time donation or become a patron.
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main";
.container {
    padding-top: 40px;
}
h1 {
    line-height: 1;
    font-family: "Oswald", sans-serif;
    font-size: 80px;
    span {
        color: $primary;
    }
}
p {
    margin: 30px 0;
    color: $gray-600;
}

</style>