# Tracker 简介

自检测 window上是否存在 soj 或者 wmda 的埋点方法, 在此基础上提供埋点统一入口, 满足多种埋点需求

  1. Tracker 主要提供两个方法 send 和 track
    - Tracker.send 即发送埋点方法
    - Tracker.track 用来装饰类方法
  2. Tracker 还面向 ant design vue2.0 版本的 Form 表单提供一个 form方法, 用来观测表单数据变更(未来会面向3.0版本提供)

# 安装

# 开发

提供三个demo, react-tracker / vue2-tracker / vue3-tracker

1. 在根目录下执行 yarn link
2. 进入到 react-tracker下 执行 yarn link tracker

3. 在根目录下执行 yarn dev 进行观测打包
4. 进入到 react-tracker下 执行 yarn dev

# 使用方式

##

## 使用实例

```js 一般用法
import Tracker from 'tracker'

// 通过 new 预先缓存额外参数, 这些参数会在之后的send动作中一并发送出去
new Tracker({ from: 'shanghai', name: 'page_wangzi' })

// 一般性用法
Tracker.send('uniquecode111')

// 附加新的额外参数
Tracker.send({ Key: 'uniquecode111', name: 'page_wangzi' })
```

```js 在 react class  语法中的使用
import React from 'react'

class VueComponent extend React.Component {
  /*
   * 在支持wmda的页面上发送 eventid: uniquecode111
   * 在支持soj的页面上发送 action: uniquecode111
   */
  @Tracker.track('uniquecode111')
  handleClick = ()=>{ }

  /*
   * 可以是一个方法, 该方法入参是原函数的返回值
   * 在支持wmda的页面上发送 eventid: uniquecode111-handleClick222
   * 在支持soj的页面上发送 action: uniquecode111-handleClick222
   */
  @Tracker.track(function(result){ return { Key: 'uniquecode111-handleClick222' } })
  handleClick222(){}
}
```

```js 在 vue 或 react class 语法中的使用
import Tracker from 'tracker'

@Component
class VueComponent extend Vue {

  /*
   * 在支持wmda的页面上发送 eventid: uniquecode111
   * 在支持soj的页面上发送 action: uniquecode111
   */
  @Tracker.track('uniquecode111')
  handleClick(){}

  /*
   * 可以是一个方法, 该方法入参是原函数的返回值
   * 在支持wmda的页面上发送 eventid: uniquecode111
   * 在支持soj的页面上发送 action: uniquecode111
   */
  @Tracker.track(function(result){ return 'uniquecode111' })
  handleClick(){}

  /*
   * 在支持wmda的页面上发送 eventid: uniquecode222, 额外参数包括 anotherEventFlag: shanghai
   * 在支持soj的页面上发送 action: uniquecode222, 额外参数ep中包括 anotherEventFlag: shanghai
   */
  @Tracker.track({Key: 'uniquecode222', anotherEventFlag: 'shanghai'})
  handleEvent(){}

  /*
   * 在支持wmda的页面上发送 eventid: uniquecode222, 额外参数包括 anotherEventFlag: qingdao
   * 在支持soj的页面上发送 额外参数ep中包括 EventId: uniquecode222, anotherEventFlag: shanghai
   */
  @Tracker.track({EventId: 'uniquecode222', anotherEventFlag: 'qingdao'})
  handle(){}
}
```

```js 面向 ant design vue 2.0版本
import { Component, Vue } from ''
import { Form } from 'ant-design-vue'
import Tracker from 'tracker'

@Component
class VueComponent extend Vue {
  created() {
    this.form = Form.createForm(this)
    Tracker.form(this.form, {
      onValuesChange(name, action, event) {

      },
      fieldsMapping: {
        field1: 'event_id0123',
        field2: {
          // Key: 'event_id022222',
          EventId: 1234567',
          Action: 'click_button'
        },
      }
    })
  }
}

```


# 帮助


# 联系

