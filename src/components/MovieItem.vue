<template>
  <div 
    :style="{ backgroundImage: `url(${movie.Poster})`}"
    class="movie">
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        movie: {
            type: Object,
            default: () => ({})
            //배열,객체 데이터를 직접적으로 사용하지 않고 함수로 만들어서 반환 (props)
        }
    }
}
</script>
<style lang="scss" scoped>
.movie {
    $width: 168px;
    width: $width;
    height: $width * 3 / 2;

}
</style>