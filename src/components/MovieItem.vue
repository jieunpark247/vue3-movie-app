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
@import "~/scss/main";

.movie {
    $width: 168px;
    width: $width;
    height: $width * 3 / 2;
    margin: 10px;
    background-color: $gray-400;
    background-size: cover; //배경이미지 요소에 더 넓은 너비에 맞춰서 출력 
    overflow: hidden;
    position: relative;
    &:hover::after { // 마우스 갖다대었을 떄 가상요소 만든다.
       content: "";
       position: absolute;
       top: 0;
       bottom: 0;
       left: 0;
       right: 0;
       border: 6px solid $primary;
    }
    .info {
      background-color: rgba($black,.3);
      width: 100%;
      padding: 14px;
      font-size: 14px;
      text-align: center;
      position: absolute; // 부모요소 기준으로 배치
      left: 0;
      bottom: 0;
      backdrop-filter: blur(10px); // 블러처리 하기 [그외 다양한 효과가 있다.] (firefox에서는 적용이 안되는 이슈가 있음)
      .year {
        color: $primary;
      }
      .title {
        color: $white;
        white-space: nowrap; //한줄로 표시되게 만든다. (이게 없으면 자동으로 박스 크기에 맞춰 줄바꿈 처리된다.)
        overflow: hidden;
        text-overflow: ellipsis; // 텍스트 크기가 넘으면 ...으로 생략 가능
      }
  }
}

</style>