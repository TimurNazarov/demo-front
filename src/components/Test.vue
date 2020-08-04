<template>
  <div>
    <button @click="shuffle">shuffle</button>
    <button @click="add">addd</button>
    <button @click="remove">remove</button>
    <transition-group class="tt" name="test" tag="div">
      <div class="test-item" v-for="item in items" :key="item">{{ item }}</div>
    </transition-group>
  </div>
</template>

<script>

export default {
  name: 'Test',
  data() {
    return {
      items: [1,2,3,4,5,6,7,8,9,10],
      nextNum: 10
    }
  },
  methods: {
    shuffle() {
      this.items = this.items.sort(() => Math.random() - 0.5);
    },
    test2() {
      this.items.splice(0, 1)
    },
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
  }
}
</script>

<style scoped>
  .test-move {
    transition: transform 1s;
    /*display: inline-block;*/
  }
  .tt {
    position: relative;
    display: inline-flex;
    /*justify-content: space-between;*/
    margin: 100px;
  }

  .test-item {
    transition: all 1s;
    /*display: inline-block;*/
  }

  .test-leave-active {
    position: absolute;
  }

  .test-enter, .test-leave-to {
    transform: translateY(100%);
    /*top: -20px;
    left: 0;*/
    /*margin-top: 100px;*/
  }
  ul {
  }
  li {
  }
</style>