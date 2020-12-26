<template>
    <div @mousemove="onMouseMove" class="clock">
        <Row type="flex" justify="center" style="height:100%">
            <Col v-if="times1.length>0" span="11" style="height: 50%">
                <Card>
                    <p slot="title">
                        <Icon type="ios-clock-outline"/>
                        半小时内
                    </p>
                    <Table stripe :columns="columns" :data="times1" size="small"/>
                </Card>
            </Col>
            <Col v-if="times2.length>0" span="11" style="height: 50%">
                <Card>
                    <p slot="title">
                        <Icon type="ios-clock-outline"/>
                        一小时内
                    </p>
                    <Table stripe :columns="columns" :data="times2" size="small"/>
                </Card>
            </Col>
            <Col v-if="times3.length>0" span="11" style="height: 50%">
                <Card>
                    <p slot="title">
                        <Icon type="ios-clock-outline"/>
                        三小时内
                    </p>
                    <Table stripe :columns="columns" :data="times3" size="small"/>
                </Card>
            </Col>
            <Col v-if="times4.length>0" span="11" style="height: 50%">
                <Card>
                    <p slot="title">
                        <Icon type="ios-clock-outline"/>
                        三小时之后
                    </p>
                    <Table stripe :columns="columns" :data="times4" size="small"/>
                </Card>
            </Col>
        </Row>
        <Drawer title="使用说明" placement="left" :closable="false" v-model="left" width="20">
            <Row type="flex" justify="center" align="middle">
                <Col>
                    <Button type="primary" @click="test">测试</Button>
                </Col>
            </Row>
            <br>
            <Row type="flex" justify="center" align="middle">
                <Col span="22">
                    <Form :model="formItem" :label-width="80">
                        <FormItem label="主题">
                            <Input v-model="formItem.title" placeholder="可以为空"/>
                        </FormItem>
                        <FormItem label="描述">
                            <Input v-model="formItem.body" placeholder="可以为空"/>
                        </FormItem>
                        <FormItem label="小时">
                            <Input type="number" v-model="formItem.hour">
                                <span slot="append">小时（h）</span>
                            </Input></FormItem>
                        <FormItem label="分钟">
                            <Input type="number" v-model="formItem.minutes">
                                <span slot="append">分钟（m）</span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="setTimeout">添加</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </Drawer>
    </div>
</template>
<script>
    export default {
        head() {
            return {
                title: '日常用到的小工具-任务定时计划',
                link: [
                    {rel: "stylesheet", href: "./css/schedule/index.css"},
                ]
            }
        },
        data() {
            return {
                left: false,
                formItem: {
                    title: '',
                    body: '',
                    hour: 0,
                    minutes: 0
                },
                times: [],
                times1: [],
                times2: [],
                times3: [],
                times4: [],
                columns: [
                    {
                        title: '标题',
                        key: 'title',
                        align: 'center',
                    },
                    {
                        title: '描述',
                        key: 'body',
                        align: 'center',
                    },
                    {
                        title: '倒计时',
                        align: 'center',
                        render: (h, params) => {
                            return h('Time', {
                                props: {
                                    time: params.row.timeStamp,
                                    interval: 1
                                }
                            })
                        }
                    },
                    {
                        title: '状态',
                        align: 'center',
                        render: (h, params) => {
                            return new Date().getTime() - params.row.timeStamp > 0 ? h('Tag', {props: {color: 'success'}}, '已完成') : h('Tag', {props: {color: 'primary'}}, '等待中')

                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
                            return h('Icon', {
                                props: {
                                    type: 'ios-trash-outline',
                                    size: 26
                                },
                                style: {
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.deleteTime(params.row.timeStamp);
                                    }
                                }
                            })
                        }
                    }
                ],
            }
        },
        methods: {
            onMouseMove(e) {
                console.log(e.clientX);
                if (e.clientX < 2) {
                        this.left = true;
                }
            },
            test() {
                if (process.client) {
                    if (window.Notification) {
                        if (window.Notification.permission === "granted") {
                            this.notification('test');
                        } else if (window.Notification.permission === "default") {
                            window.Notification.requestPermission();
                            this.$Message.warning("请允许网站通知。");
                        } else {
                            this.$Message.warning("请检查是否禁止网站通知。");
                        }
                    } else {
                        this.$Message.error("测试失败，该浏览器不支持通知。");
                    }
                }
            },
            notification(timeStamp) {
                console.log(timeStamp);
                let time = this.times.find(value => {
                    return value.timeStamp === timeStamp;
                });
                if (!time){
                    time={title:'',body:''};
                    time.title='测试通知';
                    time.body= '这是一个测试通知';
                }
                new Notification(time.title, {
                    body: time.body,
                    icon: ''
                });
                this.timesGroup();
            },
            setTimeout() {
                const timeLength = this.formItem.hour * 3600000 + this.formItem.minutes * 60000;
                const timeStamp = new Date().getTime() + timeLength;
                const timer = setTimeout(this.notification, timeLength, timeStamp);
                const time = {title: '', body: '', timeStamp: 0, function: null};
                time.title = this.formItem.title;
                time.body = this.formItem.body;
                time.timeStamp = timeStamp;
                time.function = timer;
                this.times.push(time);
                this.timesGroup();

            },
            timesGroup() {
                this.times1 = [];
                this.times2 = [];
                this.times3 = [];
                this.times4 = [];
                this.times.forEach(value => {
                    const timeLength = value.timeStamp - new Date().getTime();
                    if (timeLength <= 1800000) {
                        this.times1.push(value);
                        this.timesSort(this.times1);
                    } else if (timeLength <= 3600000) {
                        this.times2.push(value);
                        this.timesSort(this.times2);
                    } else if (timeLength <= 10800000) {
                        this.times3.push(value);
                        this.timesSort(this.times3);
                    } else {
                        this.times4.push(value);
                        this.timesSort(this.times4);
                    }
                })
            },
            timesSort(times) {
                times.sort((a, b) => {
                    return a.timeStamp - b.timeStamp;
                });
            },
            deleteTime(timeStamp) {
                const index = this.times.findIndex((value) => {
                    return value.timeStamp === timeStamp;
                });
                if (timeStamp > new Date().getTime()) {
                    clearTimeout(this.times[index].function);
                }
                this.times.splice(index, 1);
                this.timesGroup();
            }
        },

    }
</script>