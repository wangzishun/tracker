/*
 * @Author       : wangzishun
 * @Date         : 2021-02-12 23:43:37
 * @LastEditors  : wangzishun
 * @LastEditTime : 2021-02-12 23:46:40
 * @Description  :
 */

import { Component, Vue } from 'vue-property-decorator';

import { Tracker } from 'tracker'
@Component({
  components: {
  },
})
export class TrackerTest extends Vue {
  mounted() {
    console.log(Tracker.form);
    console.warn(this);


  }
  render() {
    return <div>你好</div>
  }
}
