<template>
    <div class="home">
        <div class="home-box">
            <div class="chat-left">
                <div class="A_chat">
                    <div class="A_chat_letf" v-for="(itme,index) in list" :key="itme.id">
                        <div class="left_img">
                            <img src="../../assets/img/touxing.jpg" alt="">
                        </div>
                        <div class="left-text">
                            {{itme.msg}}
                        </div>
                    </div>
                    <div class="A_chat_right">
                        <div class="right_img">
                            <img src="../../assets/img/touxing.jpg" alt="">
                        </div>
                        <div class="right-text">
                            你好吗
                        </div>
                    </div>
                </div>
                <div class="Input_box">
                    <textarea name="" id="" cols="30" rows="10" style="display: block;width: 99%;resize: none;"
                              v-model="contentText"></textarea>
                    <button style="display: block;float: right" @click="sendText()">发送</button>
                </div>
            </div>
            <div class="chat-right">
                <div class="right-box">
                    <div class="box-img">
                        <img src="../../assets/img/touxing.jpg" alt="">
                    </div>
                    <div class="box-name">
                        王柳
                    </div>
                </div>
                <div class="right-box">
                    <div class="box-img">
                        <img src="../../assets/img/touxing.jpg" alt="">
                    </div>
                    <div class="box-name">
                        王库宁
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                ws: null,
                count: 0,
                userId: null, //当前用户ID
                list: [], //聊天记录的数组
                contentText: "" ,//input输入的值
            }
        },
        created() {
            this.getUserID();
        },
        mounted() {
            this.initWebSocket();
        },
        methods: {
            //根据时间戳作为当前用户ID
            getUserID() {
                let time = new Date().getTime();
                this.userId = time;
            },
            //发送聊天信息
            sendText() {
                let _this=this;
                let params = {
                    userId: _this.userId,
                    msg: _this.contentText
                };
                _this.ws.send(JSON.stringify(params)); //调用WebSocket send()发送信息的方法
                _this.contentText = "";
            },
            //进入页面创建websocket连接
            initWebSocket() {
                let _this = this;
                //判断页面有没有存在websocket连接
                if (window.WebSocket) {
                    // 192.168.0.115 是我本地IP地址 端口号 要与后端配置的一致 47.96.150.40:9502 localhost:8888
                    let ws = new WebSocket("ws://localhost:8888");
                    _this.ws = ws;
                    ws.onopen = function (e) {
                        console.log("服务器连接成功");
                    };
                    ws.onclose = function (e) {
                        console.log("服务器连接关闭");
                    };
                    ws.onerror = function () {
                        console.log("服务器连接出错");
                    };
                    ws.onmessage = function (e) {
                        //接收服务器返回的数据
                        let resData = JSON.parse(e.data);
                        _this.list.push(resData)
                    };
                }
            },
        }
    }
</script>

<style scoped>
    .home {
        width: 100%;
    }

    .home-box {
        width: 100%;
        border: 1px solid #333333;
        display: flex;
    }

    .chat-left {
        width: 70%;
        border-right: 1px solid #333333;
    }

    .chat-right {
        width: 30%;
        border-right: 1px solid #333333;
    }

    .A_chat {
        width: 100%;
        height: 400px;
        border-bottom: 1px solid #333333;
    }

    .A_chat_letf {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        padding: 5px 0;
        margin-left: 10px;
    }

    .left_img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }

    .left_img > img {
        width: 100%;
        border-radius: 50%;
    }

    .left-text {
        font-size: 13px;
        margin-left: 10px;
    }

    .A_chat_right {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        padding: 5px 0;
        margin-left: 10px;
    }

    .right_img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }

    .right_img > img {
        width: 100%;
        border-radius: 50%;
    }

    .right-text {
        font-size: 13px;
        margin-left: 10px;
    }

    .Input_box {
        width: 100%;
    }

    .Input_box > textarea {
        border: none;
        background: #eeeeee;
    }

    .Input_box > button {
        width: 80px;
        height: 30px;
        color: white;
        background: blue;
        border-radius: 5px;
        outline: none;
        border: none;
        margin: 5px 0;
    }

    .right-box {
        width: 93%;
        height: 30px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #333333;
        padding: 5px 10px;
    }

    .box-img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }

    .box-img > img {
        width: 100%;
        border-radius: 50%;
    }

    .box-name {
        font-size: 13px;
        margin-left: 10px;
    }
</style>
