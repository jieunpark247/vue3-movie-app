<template>
    <div 
    :style="{
        width: `${size}rem`,
        height: `${size}rem`,
        zIndex // 자동으로 카멜케이스를 데쉬케이스로 변환 가능하다.
    }"
    :class="{ 
        absolute, 
        fixed
    }" 
    class="spinner-border text-primary"></div>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: 2 // 기본 2로 출력
        },
        absolute: { //각각 값에 true 값을 넣으면 position을 변경해준다.
            type: Boolean,
            default: false
        },
        fixed: {
            type: Boolean,
            default: false
        },
        zIndex: {
            type: Number,
            default: 0
        },
    }
}
</script>
<style lang="scss" scoped>
.spinner-border {
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    &.absolute {
        position: absolute;
    }
    &.fixed {
        position: fixed;
    }
}
</style>