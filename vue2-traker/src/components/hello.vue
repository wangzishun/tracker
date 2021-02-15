<!--
 * @Author       : wangzishun
 * @Date         : 2021-02-14 12:21:38
 * @LastEditors  : wangzishun
 * @LastEditTime : 2021-02-14 12:22:09
 * @Description  :
-->

<template>
  <div class="container">
    template
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'zhang'
    }
  },
  created() {
    console.log(this.name, this)
  },
  computed: {},
  methods: {
    init() {}
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss" scoped></style>
