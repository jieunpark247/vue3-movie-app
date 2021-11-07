<template>
  <div class="container">
    <input
      class="form-control"
      v-model="title"
      type="text"
      placeholder="Search for Movies, Series & more"
      @keyup.enter="apply" />
    <!-- 엔터키 누르면 apply 메소드 실행 -->
    <div class="selects">
      <!-- v-model: data안에 type/number/year찾아서 넣어준다. -->
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]" 
        :key="filter.name"
        class="form-select">
        <option 
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>

export default {
    data(){
        return {
            title: '',
            type: 'movie',
            number: 10,
            year: '',
            filters: [
                {
                    name: 'type',
                    items: ['movie', 'series', 'episode']
                },
                {
                    name: 'number',
                    items: [10, 20, 30]
                },
                {
                    name: 'year',
                    items: (() => { //즉시 실행함수
                        const years =[];
                        const thisYear = new Date().getFullYear();
                        for(let i =thisYear; i >= 1985; i-=1){
                            years.push(i);
                        }
                        return years;
                    })()
                },
            ]
        }
    },
    methods: {
        apply() {
            //search movie
            //'movie 는 스토어의 모듈의  movie를 의미한다.
            this.$store.dispatch('movie/searchMovies', {
                title: this.title,
                type: this.type,
                number: this.number,
                year: this.year
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child { //자식요소들 중에 마지막에 있는애 margin은 0으로 하겠다.
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    //   얘는 flex 적용되지않고 브라우저 크기에 따라서 감소하지 않게 설정 
      width: 120px;
      height: 50px;
      font-weight: 700;
      flex-shrink: 0; //감소하지 않는다. 너비 무조건 120px
  }
}
</style>