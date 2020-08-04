/*
vue transition-group has a bug with flexbox which causes removed from list element to 
lose its xAxis position thus floating to the left side of the relative
fix source: https://forum.vuejs.org/t/transition-group-leave-transition-w-position-absolute-jumping-to-top-left-flip/12258
*/
export default {
	methods: {
    before_leave(el) {
      const {marginLeft, marginTop, width, height} = window.getComputedStyle(el)
      el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`
      el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`
      el.style.width = width
      el.style.height = height
    }
	}
}