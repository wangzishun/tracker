/*
 * @Author       : wangzishun
 * @Date         : 2021-02-13 11:06:15
 * @LastEditors  : wangzishun
 * @LastEditTime : 2021-02-14 10:45:06
 * @Description  :
 */
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Tracker } from 'tracker'
@Component
export class TrackerTest extends Vue {
  @Prop() private msg!: string
  render() {
    console.log(Tracker)
    return <div>TrackerTest 1</div>
  }
}
