<template>
    <div class="layout" :style="{backgroundImage: 'url('+url+')'}">
        <Menu mode="horizontal" theme="dark" active-name="0" style="height: auto;">
            <MenuItem name="1" to="linuxCommand">
                <Icon type="logo-tux"/>
                Linux命令查询
            </MenuItem>
            <MenuItem name="2" to="schedule">
                <Icon type="ios-time-outline"/>
                任务定时计划
            </MenuItem>
            <MenuItem name="3" to="book">
                <Icon type="ios-book-outline"/>
                小说搜索阅读
            </MenuItem>
        </Menu>
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
                /*console.log(data.data.images[0].urlbase);*/
                this.url = 'http://s.cn.bing.net' + data.data.images[0].urlbase + '_UHD.jpg';
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