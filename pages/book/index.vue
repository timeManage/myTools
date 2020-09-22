<template>
    <div @dblclick="dblclick" @mousemove="onMouseMove" class="book" ref="book">
        <Row v-if="content" type="flex" justify="center">
            <Col span="16" id="articleName">
                <p align="right">{{articleName}}</p>
            </Col>
            <Col id="content" span="16" v-html="content">
            </Col>
        </Row>
        <Drawer title="输入书名或作者名" placement="left" :closable="false" v-model="left" width="40">
            <Row type="flex" justify="center" align="middle">
                <Col span="24">
                    <Input @on-enter="enter" v-model="value" placeholder="输入书名或作者名" size="large" autofocus/>
                </Col>
                <Col v-if="list.length>0" span="24">
                    <Table @on-row-click="onRowClick" :loading="loading" :columns="books" :data="list"/>
                </Col>
                <Col v-if="history.length>0" span="24">
                    <Card dis-hover v-for="(item,index) in history" :key="index">
                        <p slot="title">{{item.bookName}}
                            <Icon @click="removeHistory(index)" size="22" style="cursor: pointer;float: right;" type="ios-trash-outline"/>
                        </p>
                        <p class="ivu-select-item" @click="getHistory(item)">{{item.articleName }}</p>
                    </Card>
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
                    <p class="ivu-select-item" v-for="(item,index) in info.list" @click="getContent(item.link)" :key="index"
                       :id="item.link===thisArticleLink?'select':''">{{++index +' '+item .name}}</p></Col>
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
                bookLink: '',
                articleName: '',
                content: '',
                thisArticleLink: '',
                nextArticleLink: '',
                left: false,
                right: false,
                scroll: true,
                loading: false,
                history: []
            }
        },
        mounted() {
            //添加监听滚动事件和窗口大小
            this.$nextTick(() => {
                this.$refs.book.addEventListener('scroll', this.handleScroll, false);
                this.$refs.book.addEventListener('resize', this.handleScroll, false);
            });
            const record = window.localStorage.getItem('record');
            if (record) {
                this.history = JSON.parse(record);
                this.$store.dispatch('book/setRead', this.history);
            }
        },
        methods: {
            enter() {
                let _this = this;
                let keyWord = _this.value.trim();
                if (keyWord) {
                    _this.$axios.get("myTools/api/search", {params: {searchkey: keyWord}}).then(res => {
                        console.log(res.data);
                        if (res.data.length > 0) {
                            _this.list = res.data;
                        } else {
                            _this.$Message.warning('查无此书！');
                        }
                    })
                } else {
                    _this.list.length = 0;
                }
            },
            onRowClick(row, index) {
                this.loading = true;
                this.getInfo(row.name.link, true);
            },
            getInfo(link, type) {
                this.$axios.get("myTools/api/info", {params: {link: link}}).then(res => {
                    console.log(res.data);
                    if (res.data.bookName) {
                        this.info = res.data;
                        this.bookLink = link;
                    }
                    this.loading = false;
                    if (type)
                        this.right = true;
                })
            },
            getContent(link) {
                let _this = this;
                if (_this.scroll && _this.content) {
                    this.$nextTick(() => {
                        document.getElementById('content').scrollIntoView();
                    })
                }
                _this.$axios.get("myTools/api/article", {params: {link: link}}).then(res => {
                    console.log(res.data);
                    if (res.data.articleContent) {
                        _this.articleName = res.data.articleName;
                        if (_this.scroll) {
                            _this.content = res.data.articleContent;
                        } else
                            _this.content += res.data.articleContent;
                        _this.nextArticleLink = res.data.nextArticleLink;
                        _this.thisArticleLink = link;
                        if (_this.info.bookName) {
                            const data = {bookName: _this.info.bookName, bookLink: _this.bookLink, articleName: _this.articleName, articleLink: link};
                            _this.$store.dispatch('book/pushRead', data);
                        }
                    } else {
                        _this.$Message.warning('获取下一章节内容失败！');
                    }
                    _this.scroll = true;
                });

            },
            onMouseMove(e) {
                /*console.log(e.clientX);*/
                if (e.clientX < 2) {
                    this.left = true;
                }
            },
            handleScroll(e) {
                if (this.scroll && e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop === 0) {
                    this.scroll = false;
                    this.getContent(this.nextArticleLink);
                }
            },
            dblclick() {
                if (this.info.list) {
                    this.right = true;
                    //元素节点平滑smooth 滚动到可视化窗口 中间center
                    this.$nextTick(() => {
                        document.getElementById('select').scrollIntoView({behavior: 'smooth', block: 'center'});
                    })
                } else
                    this.$Message.warning('目录过长正在加载中！')
            },
            getHistory(data) {
                this.getContent(data.articleLink);
                this.getInfo(data.bookLink);
            },
            removeHistory(index) {
                this.$store.dispatch('book/removeRead', index);
            }
        }
    }
</script>