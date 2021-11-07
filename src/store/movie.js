import axios from "axios"
import _uniqBy from 'loadsh/uniqBy'

export default {
    // module화 되어서 사용할수있음 true면 index.js에서 모듈로 사용 가능함
    // 현재 파일(movie.js)을 Store 모듈로 활용하려면 다음 옵션이 필요합니다.
    namespaced: true,
    // data
    state: () => ({
        movies: [],
        message: '',
        loading: false,
      }),
    // computed! 계산된 상태를 만들어 낸다.
    /* getters: {
        movieIds(state) {
            return state.movies.map(m => m.imdbID)
        }
    },*/
    // methods!
    // 변이, 데이터를 변경할 수 있음
    mutations: {
        updateState(state, payload) {
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        resetMovies(state){
            state.movies = []
        }
    },
    // 데이터를 직접적으로 수정 못함 
    // 비동기로 동작을 한다.
    actions: {
        async searchMovies({ state, commit }, payload) {
            try{
                const res = await _fetchMovie({
                    ...payload, 
                    page: 1
                })    
    
                const { Search ,totalResults } = res.data
                commit('updateState',{
                    movies: _uniqBy(Search, 'imdbID') //imdbID 속성의 이름으로 고유화 시켜준다. 
                }) 
                console.log(totalResults)
                console.log(typeof totalResults)
    
                const total = parseInt(totalResults, 10)
                const pageLength = Math.ceil(total / 10)
    
                //추가 요청!
                if(pageLength > 1){
                    for(let page = 2; page <= pageLength; page += 1){
                        if(page > payload.number / 10) break
                        // number 의 페이지만큼만 가져온다.
                        const res = await _fetchMovie({
                            ...payload, 
                            page
                        })
                        const { Search } = res.data
                        commit('updateState',{
                            movies: [...state.movies, ..._uniqBy(Search, 'imdbID')] //Search를 기존 배열에 추가한다. 
                        }) 
                    }
                }
            }catch (message){
                commit('updateState', {
                    movies: [], //초기화 해주기
                    message
                })
            }
        }
    }
}
function _fetchMovie(payload){
    const { title, type, year, page } = payload
    const OMDB_API_KEY = 'c94166af'
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}$page=${page}`

    return new Promise((resolve, reject) => {
        axios.get(url)
        .then(res =>{
            resolve(res)
            //error 인데 status 200이라면?? 따로 reject 처리 해주기
            console.log(res)
            if(res.data.Error){
                reject(res.data.Error)
            }
        })
        .catch(err => {
            console.log(err.message)
            reject(err.message);
        })
    })
}