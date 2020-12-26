<template>
    <vue-json-pretty
            :path="'res'"
            :data="{ key: 'value' }"
            @click="handleClick">
    </vue-json-pretty>
</template>
<script>
    export default {
        head() {
            return {
                title: '日常用到的小工具-Linux命令查询',
                link: [
                    {rel: "stylesheet", href: "./css/json/index.css"},
                ]
            }
        }
    }
</script>