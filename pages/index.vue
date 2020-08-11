<template>
    <div class="demo-split">
        <Row>
            <Col span="6">
                <Input @on-change="change" v-model="value" placeholder="Linux命令搜索" size="large" autofocus/>
                <li @click="click(item.name)" v-for="(item,index) in list" :key="index" v-html="item.html"
                    class="ivu-select-item"></li>
            </Col>
            <Col id="content" span="18" v-html="content"></Col>
        </Row>
    </div>
</template>
<script>
    export default {
        head() {
            return {
                link: [
                    {rel: "stylesheet", href: "//lib.baomitu.com/prism/latest/themes/prism-tomorrow.min.css"},
                    {rel: "stylesheet", href: "./css/index.css"},

                ]
            }
        },
        data() {
            return {
                comm: [],
                value: "",
                list: [],
                content: "",
            }
        },
        mounted() {
            this.comm = require("linux-command");
        },
        methods: {
            change() {
                let _this = this;
                let keyWord = _this.value.trim().toLowerCase();
                if (keyWord) {
                    let tem = _this.comm;
                    let name = [], description = [];
                    let value;
                    let nameIndex, descriptionIndex;
                    let result = [];
                    Object.keys(tem).map(key => {
                        value = tem[key];
                        nameIndex = value.n.toLowerCase().indexOf(keyWord);
                        if (nameIndex > -1) {
                            value.index = nameIndex;
                            name.push(value);
                        }
                        descriptionIndex = value.d.toLowerCase().indexOf(keyWord);
                        if (descriptionIndex > -1) {
                            value.index = descriptionIndex;
                            description.push(value);
                        }
                    });
                    if (name) {
                        name.sort(function (a, b) {
                            return a.index - b.index;
                        });
                    }
                    if (description) {
                        description.sort(function (a, b) {
                            return a.index - b.index;
                        });
                    }
                    if (name || description) {
                        result = name.concat(description);
                        if (result.length > 10) {
                            result = result.slice(0, 10);
                        }
                        let regExp = new RegExp("(" + keyWord + ")", "ig");
                        let regExpName, regExpDescription, html;
                        _this.list.length = 0;
                        result.forEach(item => {
                            regExpName = item.n.replace(regExp, "<i>" + keyWord + "</i>");
                            regExpDescription = item.d.replace(regExp, "<i>" + keyWord + "</i>");
                            html = "<strong>" + regExpName + "</strong> - " + regExpDescription;
                            let list = {};
                            list.name = item.n;
                            list.html = html;
                            _this.list.push(list);
                        });
                    }
                } else {
                    _this.list.length = 0;
                }
            },
            click(name) {
                /*import x from "linux-command/command/alias.md";
                let alias=require("linux-command/command/alias.md");*/
                this.$axios.get("myTools/command/html/" + name + ".html").then(res => {
                    this.content = res.data;
                })
            }
        },

    }
</script>

<style>
    li {
        color: #555;
        display: block;
        padding: 5px 0;
    }

    li i {
        color: #ed4014;
        font-style: inherit;
    }
</style>