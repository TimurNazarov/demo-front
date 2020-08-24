<template>
  <div class="demo-loader-component">
    <transition name="fade-slow">
      <div v-if="show && background" class="demo-loader" :style="{backgroundColor: background}"></div>
    </transition>
    <transition name="fade-fast">
      <div v-if="show" class="demo-loader-animation" :style="style"></div>
    </transition>
  </div>
</template>

<script>

// mixins

export default {
  name: 'Loader',
  computed: {
    style() {
      return {
        height: this.size + 'px',
        width: this.size + 'px',
        marginLeft: -(this.size / 2) + 'px',
        marginTop: -(this.size / 2) + 'px',
      }
    }
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    size: {
      type: Number,
      default: 100
    },
    background: {
      type: [String, Boolean],
      default: false
    }
  }
}
</script>
