<template>
  <div class="container">
    <img class="head" src="@/assets/doctor.png" />

    <div class="content">
      <div class="text" v-if="type === 1">
        <!-- <vue-markdown :source="resText" /> -->
        {{ resText }}
      </div>

      <img
        class="img"
        :src="content"
        v-else-if="type === 2"
        @click="preview(content)"
      />
    </div>
  </div>
</template>

<script>
import ImagePreview from 'vant/lib/image-preview'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'LeftItem',
  props: ['id', 'type', 'content'],

  components: {
    'vue-markdown': VueMarkdown,
  },

  data() {
    return {
      resText: '',
    }
  },

  created() {
    this.printText()
  },

  methods: {
    async printText() {
      const data = this.content
      let text = ''
      for (let i = 0; i < data.length; i++) {
        text += data.charAt(i)
        await new Promise((resolve) => {
          setTimeout(resolve, 50)
        })
        this.resText = text
      }
    },

    preview(url) {
      ImagePreview([url])
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  padding: 10px 15px;
  margin-right: 60px;

  .head {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #eee;
    box-shadow: 0 1px 5px 0 #2c5845;
  }

  .content {
    margin-left: 10px;
    margin-top: 10px;

    .text {
      background-color: #438584;
      border-radius: 10px;
      padding: 5px;
      font-size: 14px;
      color: #fff;
      // line-height: 0;
    }

    .img {
      width: 100px;
      border-bottom-right-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }
}
</style>
