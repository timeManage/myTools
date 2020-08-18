<template>
    <div class="layout" :style="{backgroundImage: 'url('+url+')'}">
        <nuxt/>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                url: '',
            }
        },
        mounted() {
            this.$axios.get('/bing/HPImageArchive.aspx?format=js&idx=0&n=1').then(data => {
                console.log(data.data.images[0].urlbase);
                this.url = 'http://s.cn.bing.net' + data.data.images[0].urlbase+'_UHD.jpg';
            })
        }
    }
</script>
<style>
    .layout {
        height: 100%;
        /*background-image: url("");*/
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: 100%;
    }
</style>