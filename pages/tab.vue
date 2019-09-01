<template>
  <div class="tabs">
      <div>
          <span v-for="(item,index) in ['新闻','体育','娱乐']" :key="index" @click="handleClick(index)" :class="{hall:current === index }">{{ item }}</span>
      </div>
      <div v-show="current === 0">
          <ul>
              <li>腾讯新闻</li>
              <li>网易新闻</li>
              <li>新浪新闻</li>
          </ul>
      </div>
      <div v-show="current === 1">
          <ul>
              <li>中国男篮世界杯</li>
              <li>中国男篮世界杯</li>
              <li>中国男篮世界杯</li>
          </ul>
      </div>
      <div v-show="current === 2">
          <ul>
              <li>没什么娱乐新闻</li>
              <li>没什么娱乐新闻</li>
              <li>没什么娱乐新闻</li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return{
            current:0
        }
    },
    methods:{
        handleClick(index) {
            this.current = index
        }
    }
}
</script>

<style lang='less' scoped>
 .tabs {
     padding: 100px;
     margin-bottom:40px;
 }
 span {
     cursor: pointer;
     margin-right: 15px;
 }
 .hall {
     color: pink;
 }
</style>