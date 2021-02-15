/*
 * @Author       : wangzishun
 * @Date         : 2021-02-13 11:06:15
 * @LastEditors  : wangzishun
 * @LastEditTime : 2021-02-15 21:28:44
 * @Description  :
 */
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Tracker, formTrackerForAntdVueV1 } from 'tracker'
import { Form, Input } from 'ant-design-vue'
import Hello from './hello.vue'
@Component
export class TrackerTest extends Vue {
  form: any
  beforeCreate() {
    this.form = this.$form.createForm(this, {})

    // formTrackerForAntdVueV1(this.form)
    Tracker.form(this.form)
    console.log(this.form)
  }

  mounted() {}

  list = []

  handleClickForAddField() {
    this.list.push(`field-${this.list.length}`)
  }
  render() {
    return (
      <Form form={this.form} selfUpdate>
        TrackerTest 1
        <Form.Item>
          <Input v-decorator={['note']}></Input>
        </Form.Item>
        <Form.Item>
          <Input v-decorator={['note222']}></Input>
        </Form.Item>
        {this.list.map((field) => {
          return (
            <Form.Item>
              <Input v-decorator={[field]}></Input>
            </Form.Item>
          )
        })}
        <button onClick={this.handleClickForAddField}>点我</button>
        {/* <TestDefaultVue /> */}
        {/* <Hello /> */}
      </Form>
    )
  }
}

const TestDefaultVue = {
  data() {
    return {
      name: 'wangzi'
    }
  },
  created() {
    console.log(this)
  },
  render() {
    return <div>{this.name}</div>
  }
}
