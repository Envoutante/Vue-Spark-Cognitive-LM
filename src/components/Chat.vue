<template>
  <div class="container">
    <div class="list" id="list" ref="list">
      <ul>
        <li v-for="(item, index) in msglist" :key="index">
          <RightItem
            :id="item.id"
            :type="item.type"
            :content="item.content"
            v-if="item.me"
          ></RightItem>

          <LeftItem
            :id="item.id"
            :type="item.type"
            :content="item.content"
            v-else
          ></LeftItem>
          <div v-scroll style="height: 0"></div>
        </li>
      </ul>
    </div>

    <div class="bottom">
      <div class="line"></div>
      <div class="input-send">
        <van-field
          v-model="text"
          placeholder="请输入提问内容..."
          class="input"
          @keyup.enter="send"
          type="textarea"
          rows="1"
          autosize
        />
        <van-button type="primary" class="send" @click="send">发送</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { getChatResponse } from '@/api/ApiChat'
import LeftItem from '@/components/LeftItem'
import RightItem from '@/components/RightItem'
import dayjs from 'dayjs'
import request from '@/api/base/request'

Vue.directive('scroll', {
  inserted(el) {
    el.scrollIntoView()
  },
})

export default {
  name: 'Chat',
  components: { LeftItem, RightItem },

  data: () => {
    return {
      text: '',
      msglist: [
        {
          id: 1,
          type: 1,
          content: '欢迎使用智能医生助手！请问有什么可以帮助您的吗😊？',
          me: false,
        },
      ],
    }
  },

  methods: {
    // 提交问题
    send() {
      if (this.text) {
        this.msglist.push({
          id: this.msglist[this.msglist.length - 1].id + 1,
          type: 1,
          content: this.text,
          me: true,
        })

        if (this.text === '图片') {
          this.msglist.push({
            id: this.msglist[this.msglist.length - 1].id + 1,
            type: 2,
            content: 'http://6emm.hxzdhn.com/img/2020/06/28/jausoellbtf.jpg',
            me: false,
          })
        } else {
          this.getResponse(this.text)
        }
        this.text = ''
      }
    },

    // 获取GPT答案
    getResponse(text) {
      this.msglist.push({
        id: this.msglist[this.msglist.length - 1].id + 1,
        type: 1,
        content: '请稍等片刻😊，我需要一点思考时间...',
        me: false,
      })

      getChatResponse(text).then((res) => {
        console.log('打印' + res)
        this.saveQA(text, res)
        this.msglist.push({
          id: this.msglist[this.msglist.length - 1].id + 1,
          type: 1,
          content: res,
          me: false,
        })
      })
    },

    // 后端保存问题和回复
    saveQA(question, answer) {
      let currentDate = new Date()
      let date = dayjs(currentDate).format('YYYY-MM-DD')
      let time = dayjs(currentDate).format('HH:mm:ss')

      // userId: this.getQueryString('userId'),
      request({
        url: '/receive_answer',
        method: 'post',
        data: {
          userId: this.getQueryString('userId'),
          question: question,
          answer: answer,
          date: date,
          time: time,
        },
      })
    },

    // 获取地址栏参数
    getQueryString(variable) {
      var index = window.location.href.indexOf('?') // 获取地址栏路径并进行分割
      var query = window.location.href.substr(
        index + 1,
        window.location.href.length
      )
      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] == variable) {
          return pair[1]
        }
      }
      return false // 如果没有参数就返回false值，就不会出现上边报错的情况了
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
  }

  .list {
    width: 100%;
    height: 100%;
    margin-bottom: 45px;
  }

  .bottom {
    width: 100%;
    position: fixed;
    bottom: 0;

    .line {
      width: 100%;
      height: 1px;
      background-color: #ddd;
    }

    .input-send {
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      padding-bottom: 15px;

      .input {
        padding-right: 10px;
        font-size: 16px;
      }

      .send {
        width: 80px;
        height: 30px;
        margin-top: 7px;
        margin-right: 10px;
        margin-left: 5px;
        border-radius: 10px;
        font-size: 16px;
      }
    }
  }
}
</style>
