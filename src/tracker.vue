<template>
  <Form :form="form">
    <FormItem>
      <Input v-decorator="['note']" @blur="blurHandle" />
    </FormItem>
    {{}}
  </Form>
</template>

<script>
import Vue from 'vue'
import { Form, Input } from 'ant-design-vue'
// import { Tracker } from '../src'
export default {
  name: 'Tracker',
  components: {
    Form,
    Input,
    FormItem: Form.Item
  },
  data() {
    return {
      form: this.$form.createForm(this, {
        onValuesChange(...rest) {
          // debugger
          console.log(rest)
        }
      })
    }
  },
  methods: {
    blurHandle() {
      console.log('blurHandle')
    }
  },
  beforeCreated() {},
  mounted() {
    // Tracker.form(this.form, Vue)
  },
  props: {
    msg: String
  }
}
</script>
