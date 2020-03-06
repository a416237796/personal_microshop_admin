<template>
  <editor
    id="tinymce"
    ref="tinymce"
    v-model="myValue"
    :init="init"
  ></editor>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/plugins/image'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/link'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/help'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/toc'

import { uploadImg } from '@/api/goods'
export default {
  name: 'd2-editor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  components: {
    Editor
  },
  data () {
    const self = this
    return {
      myValue: this.value,
      maxSize: 2097152,
      accept: 'image/jpeg, image/png, image/bmp, image/webp, image/gif, image/jpg',
      init: {
        selector: 'tinymce',
        language_url: `${process.env.VUE_APP_PUBLIC_PATH}tinymce/langs/zh_CN.js`, // 语言包的路径
        language: 'zh_CN', // 语言
        skin_url: `${process.env.VUE_APP_PUBLIC_PATH}tinymce/skins/ui/oxide`, // skin路径
        plugins: `lists image table anchor wordcount link pagebreak
        insertdatetime searchreplace fullscreen advlist autoresize
        charmap code emoticons help hr preview textpattern toc `,
        toolbar: `undo redo | formatselect bbcode bold italic forecolor backcolor |
        alignleft aligncenter alignright alignjustify hr pagebreak charmap code emoticons|
        bullist numlist outdent indent toc insertdatetime  |
        lists image table anchor link searchreplace fullscreen |
        removeformat preview help`,
        min_height: 350, // 编辑器的最小高度
        max_height: 600, // 编辑器的最大高度
        branding: true, // 是否禁用“Powered by TinyMCE”
        menubar: false, // 顶部菜单栏显示
        image_dimensions: false,
        default_link_target: '_blank',
        pagebreak_split_block: true,
        paste_word_valid_elements: '*[*]',
        paste_convert_word_fake_lists: false,
        emoticons_database_url: `${process.env.VUE_APP_PUBLIC_PATH}tinymce/js/emojis.js`,
        insertdatetime_formats: ['%H点%M分', '%Y年%m月%d日', '%H:%M:%S', '%Y-%m-%d', '%Y/%m/%d'],
        textpattern_patterns: [
          { start: '*', end: '*', format: 'italic' },
          { start: '**', end: '**', format: 'bold' },
          { start: '#', format: 'h1' },
          { start: '##', format: 'h2' },
          { start: '###', format: 'h3' },
          { start: '####', format: 'h4' },
          { start: '#####', format: 'h5' },
          { start: '######', format: 'h6' },
          { start: '1. ', cmd: 'InsertOrderedList' },
          { start: '* ', cmd: 'InsertUnorderedList' },
          { start: '- ', cmd: 'InsertUnorderedList' },
          { start: '---', replacement: '<hr/>' },
          { start: '--', replacement: '—' },
          { start: '-', replacement: '—' },
          { start: '(c)', replacement: '©' }
        ],
        images_upload_handler: async (blobInfo, success, failure) => {
          if (blobInfo.blob().size > self.maxSize) {
            failure('文件体积过大')
          }
          if (self.accept.indexOf(blobInfo.blob().type) < 0) {
            failure('图片格式错误')
          }
          // const img = `data:${blobInfo.blob().type};base64,${blobInfo.base64()}` // 插入图片base64
          const img = await self.uploadSectionFile(blobInfo) // 异步上传图片
          if (img && img.url) {
            success(img.url)
          } else {
            failure('上传失败！')
          }
        }
      }
    }
  },
  methods: {
    async uploadSectionFile (params) {
      let form = new FormData()
      form.append('image', params.blob())
      let res = await uploadImg(form)
      return res
    }
  },
  mounted () {
    tinymce.init({})
  },
  watch: {
    value (newValue) {
      this.myValue = newValue
    },
    myValue (newValue) {
      this.$emit('input', newValue)
    }
  }

}
</script>

<style lang="scss">
.tox-silver-sink {
  z-index: 3000 !important;
}

.tox .tox-dialog-wrap {
  z-index: 3001 !important;
}

.tox .tox-dialog-wrap__backdrop {
  z-index: 3002 !important;
}

.tox .tox-dialog {
  z-index: 3003 !important;
}

</style>
