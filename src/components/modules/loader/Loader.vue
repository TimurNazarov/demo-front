<template>
  <div class="demo-loader-component">
    <transition name="fade-slow">
      <div v-if="show && background" class="demo-loader" :style="window_style"></div>
    </transition>
    <transition name="fade-fast">
      <div v-if="show" class="demo-loader-animation" :style="animation_style"></div>
    </transition>
  </div>
</template>

<script>

// mixins

export default {
  name: 'Loader',
  computed: {
    window_style() {
      return {
        backgroundColor: this.background,
        zIndex: this.z_index
      }
    },
    animation_style() {
      return {
        height: this.size + 'px',
        width: this.size + 'px',
        marginLeft: -(this.size / 2) + 'px',
        marginTop: -(this.size / 2) + 'px',
        // animation over window
        zIndex: this.z_index + 1
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
    },
    z_index: {
      type: Number,
      default: 998
    }
  }
}
</script>
