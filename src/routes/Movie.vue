<template>
  <div class="container">
  <template v-if="loading">
        <!-- 로딩중에 표시 -->
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <!-- html에는 데쉬케이스 써야한다. -->
      <!-- :fixed="true" 이걸 명시하는것만으로 true가된다. -->
      <Loader
        :size="3"
        :z-index="9"
        fixed/>
  </template>
    <!-- 로딩끝나면 데이터 갖고와서 표시-->
      <div 
        v-else 
        class="movie-details">
        <div
        :style="{ backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)})` }"
        class="poster">
        <Loader 
        v-if="imageLoading"
        absolute />
        </div>
        <div class="specs">
          <div class="title">
            {{ theMovie.Title }}
          </div>
          <div class="labels">
            <span>{{ theMovie.Released }}</span>
            <span>{{ theMovie.Runtime }}</span>
            <span>{{ theMovie.Country }}</span>
          </div>
          <div class="plot">
            {{ theMovie.Plot }}
          </div>
          <div class="ratings">
            <h3>Ratings</h3>
            <div class="rating-wrap">
              <div 
                v-for="{ Source: name , Value: score } in theMovie.Ratings"
                :key="name"
                :title="name"
                class="rating">
                <img 
                  :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`" 
                  alt="name" />
                  <span>{{ score }}</span>
              </div>
            </div>
          </div>
          <div>
            <h3>Actors</h3>
            {{ theMovie.Actors }}
          </div>
          <div>
            <h3>Director</h3>
            {{ theMovie.Director }}
          </div>
          <div>
            <h3>Production</h3>
            {{ theMovie.Production }}
          </div>
          <div>
            <h3>Genre</h3>
            {{ theMovie.Genre }}
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Loader from '~/components/Loader'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Loader
  },
  data(){
    return {
      imageLoading: true
    }
  },
  computed: {
      ...mapState('movie', [
        'theMovie',
        'loading'
      ]),
  },
  created(){
    console.log(this.$route)
    //  this.searchMoviesWithId { //mapActions등록해서 써도 된다.
    this.$store.dispatch('movie/searchMoviesWithId', {
      id: this.$route.params.id
    })
  },
  methods: {
    // ...mapActions('movie', [
    //   'searchMoviesWithId'
    // ]),
    requestDiffSizeImage(url, size = 700){
      if(!url || url === 'N/A'){
        this.imageLoading = false
        return ''
      }else{
        const src = url.replace('SX300', `SX${size}`)
        this.$loadImage(src)
          .then(() => {
            this.imageLoading = false
          })
        return src;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding-top: 40px;
}
.skeletons {
  display: flex;
  .poster {
    flex-shrink: 0; //화면 줄어들어도 감소너비를 사용하지 않겠다.
    width: 500px;
    height: 500px * 3 / 2;
    margin-right: 70px;

  }
  .specs {
    //flex는 가로의 너비가 최소로 되려는 성질을 갖고있다.
    flex-grow: 1; //증가 너비율이 바뀌어 최대 너비를 사용하려고한다.
  }
  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;
    &.title {
      width: 80%;
      height: 70px;
    }
    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }
    &.etc{
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }
  }
}
.movie-details {
  display: flex;
  color: $gray-600;
  .poster {
    width: 500px;
    height: 500px * 3/2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover;
    background-position: center;
    position: relative;
    flex-shrink: 0;
    position: relative;
  }
  .specs {
    flex-grow: 1;
    .title {
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }
    .labels {
      color: $primary;
      span {
        &::after{
          content: "\00b7"; // 각각 span에 .표시 하고싶을때 가상요소로 넣기
          margin: 0 6px;
        }
        &:last-child::after {
          //마지막 span태그에 .표시 제거 
          display: none;
        }
      }
    }
    .plot {
      margin-top: 20px;
    }
    .ratings {
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;
          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      margin: 24px 0 6px;
      color: $black;
      font-family: 'Oswald', sans-serif;
      font-size: 20px;
    }
  }
  @include media-breakpoint-down(xl) {
    .poster {
      width: 300px;
      height: 300px * 3/2;
      margin-right: 40px;
    }
  }
  @include media-breakpoint-down(lg) {
    display: block;
    .poster {
      margin-bottom: 40px;
    }
  }
  @include media-breakpoint-down(md) {
    .specs {
      .title {
        font-size: 50px;
      }
      .ratings {
        .rating-wrap {
          display: block;
          .rating {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
