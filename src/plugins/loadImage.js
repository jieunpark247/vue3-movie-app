//다른 컴포넌트에서도 사용 가능 
export default {
    install(app){ //매개변수로 객체데이터로 내려준다.
        //비동기로 동작한다.
        app.config.globalProperties.$loadImage = src => {
            return new Promise(resolve => {
                const img = document.createElement('img') //메모리상에 이미지 태그를 만든다.
                img.src = src
                img.addEventListener('load', () => {
                  //완료!
                  resolve()
                })
            })
        }

    }
}