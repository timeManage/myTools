<template>
    <div @dblclick="dblclick" @mousemove="onMouseMove" class="book" ref="book">
        <Row v-if="content" type="flex" justify="center">
            <Col span="16" id="articleName">
                <p>{{articleName}}</p>
            </Col>
            <Col id="content" span="16" v-html="content">
            </Col>
        </Row>
        <Drawer title="输入书名或作者名" placement="left" :closable="false" v-model="left" width="40">
            <Row type="flex" justify="center" align="middle">
                <Col span="24">
                    <Input @on-enter="enter" v-model="value" placeholder="输入书名或作者名" size="large" autofocus/>
                    <Table @on-row-click="onRowClick" v-if="list.length>0" :columns="books" :data="list"/>
                </Col>
            </Row>
        </Drawer>
        <Drawer title="小说目录" placement="right" :closable="false" v-model="right" width="25">
            <Row type="flex" justify="center" align="middle">
                <Col span="24">

                    <Card :bordered="false">
                        <p slot="title">{{info.bookName}}</p>
                        <Row>
                            <Col span="8">
                                <img class="cover" :src="info.cover" alt=""/></Col>
                            <Col span="16">
                                <p>{{info.author}}</p>
                                <p>{{info.date}}</p>
                                <p>最新章节：{{info.newArticle}}</p>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span="22">
                    <p class="ivu-select-item" v-for="(item,index) in info.list" @click="getContent(item.link)" :key="index">{{item.name}}</p>
                </Col>
            </Row>
        </Drawer>
    </div>
</template>
<script>
    export default {
        head() {
            return {
                title: '日常用到的小工具-小说搜索阅读',
                link: [
                    {rel: "stylesheet", href: "./css/book/index.css"},

                ]
            }
        },
        data() {
            return {
                value: '',
                books: [
                    {
                        title: '书名',
                        render: (h, params) => {
                            return h('span', params.row.name.bookName);
                        }
                    },
                    {
                        title: '最新章节',
                        render: (h, params) => {
                            return h('span', params.row.new.articleName);
                        }
                    },
                    {
                        title: '作者',
                        key: 'author'
                    },
                    {
                        title: '最近更新',
                        key: 'date'
                    },
                ],
                list: [],
                info: '',
                articleName: '',
                content: '',
                nextArticleLink: '',
                left: false,
                right: false,
                loading: true,
            }
        },
        mounted() {
            //window.addEventListener("scroll", this.handleScroll, true); // 监听（绑定）滚轮滚动事件
            //this.$refs.content.addEventListener("scroll",this.scroll,true);
            //this.scroll();
        },
        methods: {
            enter() {
                let _this = this;
                let keyWord = _this.value.trim();
                if (keyWord) {
                    _this.$axios.get("myTools/api/search", {params: {searchkey: keyWord}}).then(res => {
                        console.log(_this.list);
                        if (res.data) {
                            _this.list = res.data;
                        }
                    })
                } else {
                    _this.list.length = 0;
                }
            },
            onRowClick(row, index) {
                this.$axios.get("myTools/api/info", {params: {link: row.name.link}}).then(res => {
                    console.log(res.data);
                    if (res.data.bookName) {
                        this.info = res.data;
                        this.right = true;
                    }
                })
            },
            getContent(link) {
                this.$axios.get("myTools/api/article", {params: {link: link}, timeout: 10000}).then(res => {
                    console.log(res.data);
                    if (res.data) {
                        this.articleName = res.data.articleName;
                        if (this.loading)
                            this.content = res.data.articleContent;
                        else
                            this.content += res.data.articleContent;
                        this.nextArticleLink = res.data.nextArticleLink;
                        this.$nextTick(() => {
                            this.$refs.book.addEventListener('scroll', this.handleScroll, false);
                            this.$refs.book.addEventListener('resize', this.handleScroll, false);
                        });
                        this.loading = true;
                        /* this.$el.querySelector('#content').addEventListener('scroll',this.scroll,false);
                         this.$el.querySelector('#content').addEventListener('resize',this.scroll,false);*/
                    }
                });

            },
            onMouseMove(e) {
                /*console.log(e.clientX);*/
                if (e.clientX < 2) {
                    this.left = true;
                }
            },
            handleScroll(e) {
                if (this.loading && e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 300) {
                    this.loading = false;
                    this.getContent(this.nextArticleLink);
                }
            },
            dblclick() {
                this.right = true;
            }
        }
    }
</script>