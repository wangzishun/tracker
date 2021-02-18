/*
 * @Author       : wangzishun
 * @Date         : 2021-02-13 11:06:15
 * @LastEditors  : wangzishun
 * @LastEditTime : 2021-02-18 11:23:48
 * @Description  :
 */
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Form, Input, FormModel } from 'ant-design-vue'
import Hello from './hello.vue'
@Component
export class TrackerTest extends Vue {
  form: any
  beforeCreate() {
    this.form = this.$form.createForm(this, {})

    // formTrackerForAntdVueV1(this.form)
    const mapping = { note222: 11111 }
    Tracker.form(this.form, {
      onValuesChange(name) {
        return { }
      },
      fieldsMapping: mapping
    })
    // Tracker.form(this.form, () => ({}), {})
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

// const TestDefaultVue = {
//   data() {
//     return {
//       name: 'wangzi',
//       form: { name: 1 }
//     }
//   },
//   created() {
//     console.log(this)
//   },
//   render() {
//     return (
//       <FormModel model={this.form}>
//         {this.name}
//         <FormModel.Item >
//           {/* <Input v-model={this.form.name} onClick onChange={console.log}></Input> */}
//           <input type="text" v-model={this.form.name}/>
//         </FormModel.Item>
//       </FormModel>
//     )
//   }
// }
