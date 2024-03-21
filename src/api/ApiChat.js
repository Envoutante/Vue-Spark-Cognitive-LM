// import request from '@/api/base/request'
import CryptoJS from 'crypto-js'

// 接口地址
let httpUrl = new URL('wss://spark-api.xf-yun.com/v1.1/chat')
let modelDomain

// 个人的应用信息
const APPID = '8373bf37'
const API_SECRET = 'OTNiOTllMWI3Y2Y4YmZmNWI4MzY3ZTRi'
const API_KEY = '6f8dc8141b2304e336f94f7ef0f7f8d1'

// 用于存放模型的答案
var question_text = ''
var total_res = ''

// 拼接请求地址
function getWebsocketUrl() {
  // 解析httpUrl以动态获取domain信息
  switch (httpUrl.pathname) {
    case '/v1.1/chat':
      modelDomain = 'general'
      break
    case '/v2.1/chat':
      modelDomain = 'generalv2'
      break
    case '/v3.1/chat':
      modelDomain = 'generalv3'
      break
    case '/v3.5/chat':
      modelDomain = 'generalv3.5'
      break
  }

  return new Promise((resolve) => {
    // 拼接各种信息以完成接口鉴权
    var apiKey = API_KEY
    var apiSecret = API_SECRET

    var url = 'wss://' + httpUrl.host + httpUrl.pathname

    var host = location.host
    var date = new Date().toGMTString()
    var algorithm = 'hmac-sha256'
    var headers = 'host date request-line'
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${httpUrl.pathname} HTTP/1.1`
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
    var signature = CryptoJS.enc.Base64.stringify(signatureSha)
    var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
    var authorization = btoa(authorizationOrigin)

    // 拼接为url
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
    resolve(url)
  })
}

class TTSRecorder {
  constructor({ appId = APPID } = {}) {
    this.appId = appId
    this.status = 'init'
  }

  // 修改状态
  setStatus(status) {
    this.onWillStatusChange && this.onWillStatusChange(this.status, status)
    this.status = status
  }

  start() {
    total_res = '' // 请空回答历史
    return this.connectWebSocket().finally(() => {
      console.log('start函数执行完毕')
    })
  }

  // 连接websocket
  connectWebSocket() {
    return new Promise((resolve) => {
      this.setStatus('ttsing')
      return getWebsocketUrl().then((url) => {
        let ttsWS
        if ('WebSocket' in window) {
          ttsWS = new WebSocket(url)
        } else if ('MozWebSocket' in window) {
          // ttsWS = new MozWebSocket(url)
        } else {
          alert('浏览器不支持WebSocket')
          return
        }

        this.ttsWS = ttsWS
        ttsWS.onopen = () => {
          this.webSocketSend()
        }

        ttsWS.onmessage = (e) => {
          this.result(e.data).then(() => {
            resolve()
          })
        }

        ttsWS.onerror = () => {
          clearTimeout(this.playTimeout)
          this.setStatus('error')
          alert('WebSocket报错，请f12查看详情')
          console.error(`详情查看：${encodeURI(url.replace('wss:', 'https:'))}`)
        }

        ttsWS.onclose = (e) => {
          console.log(e)
        }
      })
    })
  }

  // websocket发送数据
  webSocketSend() {
    console.log(modelDomain)
    var params = {
      header: {
        app_id: this.appId,
        uid: 'fd3f47e4-d',
      },

      parameter: {
        chat: {
          domain: modelDomain,
          temperature: 0.5,
          max_tokens: 1024,
        },
      },

      payload: {
        message: {
          text: [
            {
              role: 'user',
              content: question_text,
            },
          ],
        },
      },
    }
    console.log(JSON.stringify(params))
    this.ttsWS.send(JSON.stringify(params))
  }

  // websocket接收数据的处理
  result(resultData) {
    return new Promise((resolve) => {
      let jsonData = JSON.parse(resultData)
      total_res += jsonData.payload.choices.text[0].content
      if (jsonData.payload.choices.status === 2) {
        console.log('回答：' + total_res)
        resolve(total_res)
      }

      // 提问失败
      if (jsonData.header.code !== 0) {
        alert(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`)
        console.error(`${jsonData.header.code}:${jsonData.header.message}`)
        return
      }

      if (jsonData.header.code === 0 && jsonData.header.status === 2) {
        this.ttsWS.close()
        bigModel.setStatus('init')
      }
    })
  }
}

let bigModel = new TTSRecorder()
export function getChatResponse(text) {
  return new Promise((resolve) => {
    question_text = text
    total_res = '' // 请空历史回答
    bigModel.start().then(() => {
      console.log('start()方法执行完毕')
      console.log('返回值：' + total_res)
      resolve(total_res)
    })
  })
}
