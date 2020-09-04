<template>
  <label class="form-label">
    <p v-if="label" class="form-label-message">{{ label }}</p>
    <div :class="{ 'form-input-wrapper': true, 'form-textarea-wrapper': this.type == 'textarea', 'form-input-error': display_errors && !is_valid }">
      <textarea v-if="this.type == 'textarea'" class="form-input" v-model="input_value" @input="$emit('input', input_value)"></textarea>
      <input v-else class="form-input" :type="output_type" v-model="input_value" @input="$emit('input', input_value)">
      <div v-if="type == 'password'" class="form-show-password" @click="show_password = !show_password">
        <i v-if="show_password" class="fas fa-eye"></i>
        <i v-if="!show_password" class="fad fa-eye"></i>
      </div>
    </div>
    <p v-if="display_errors && !is_valid" class="error-message">{{ error_message }}</p>
  </label>
</template>

<script>
import regex from '@/static/regex.json'

export default {
  name: 'Input',
  created() {
    this.input_value = this.value
  },
  data() {
    return {
      input_value: '',
      show_password: false,
      regex: regex
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
      let regex = new RegExp(this.regex[this.field])
      return regex.test(this.input_value)
    },
    output_type() {
      return this.type == 'password' && this.show_password ? 'text' : this.type
    }
  },
  watch: {
    is_valid(valid) {
      this.$emit('valid', valid)
    },
    value(new_value) {
      if(new_value == '') {
        this.input_value = ''
      }
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
    value: String,
  }
}
</script>
