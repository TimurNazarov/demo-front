<template>
  <label class="form-label">
    <p class="form-label-message">{{ label }}</p>
    <div :class="{ 'form-input-wrapper': true, 'form-input-error': display_errors && !is_valid }">
      <input class="form-input" :type="output_type" :value="value" v-model="input_value" @input="$emit('input', input_value)">
      <div v-if="type == 'password'" class="form-show-password" @click="show_password = !show_password">
        <i v-if="show_password" class="fas fa-eye"></i>
        <i v-if="!show_password" class="fad fa-eye"></i>
      </div>
    </div>
    <p v-if="display_errors && !is_valid" class="error-message">{{ error_message }}</p>
  </label>
</template>

<script>

// mixins

export default {
  name: 'Input',
  created() {
    this.input_value = this.value
  },
  data() {
    return {
      input_value: '',
      show_password: false
    }
  },
  methods: {
    validate_input() {
      this.$emit('valid')
    }
  },
  computed: {
    error_message() {
      return this.$ml.get('form.validation.' + this.field + '.error')
    },
    is_valid() {
      let regex = this.$ml.get('form.validation.' + this.field + '.regex')
      return regex.test(this.input_value)
    },
    output_type() {
      return this.type == 'password' && this.show_password ? 'text' : this.type
    }
  },
  watch: {
    is_valid(valid) {
      this.$emit('valid', valid)
    }
  },
  props: {
    field: {
      type: String,
      default: 'string'
    },
    display_errors: {
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Boolean],
      default: false
    },
    type: {
      type: String,
      default: 'text' 
    },
    value: String
  }
}
</script>
