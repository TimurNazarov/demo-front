<template>
  <div :class="{'dropzone': true, 'dropzone-dragging-over': is_dragging_over, 'dropzone-error': error}"
    @dragover.prevent="is_dragging_over = true"
    @dragleave.prevent="is_dragging_over = false"
    @drop.prevent="process_files($event.dataTransfer.files)">
    <label class="dropzone-label">
      <span v-if="error" class="dropzone-message">{{ error }}</span>
      <span v-else class="dropzone-message">{{ $ml.get('form.dropzone.drop_' + (multiple ? 'multiple' : 'single')) }}</span>
      <i class="dropzone-icon far fa-cloud-download"></i>
      <input class="dropzone-input" 
        :name="multiple ? 'dropzone_files[]' : 'dropzone_file'" 
        type="file" 
        @change="process_files($event.target.files)" 
        :multiple="multiple">
    </label>
  </div>
</template>

<script>

// mixins

export default {
  name: 'Dropzone',
    data() {
      return {
        is_dragging_over: false,
        error: false,
        error_timeout: null
      }
    },
    methods: {
      add_file(array, file) {
        file.preview = URL.createObjectURL(file)
        array.push(file)
      },
      process_files(files) {
        this.is_dragging_over = false
        if(!this.valid_files(files)) {
          this.error = this.$ml.get('form.dropzone.error_extension')
          clearTimeout(this.error_timeout)
          this.error_timeout = setTimeout(() => {
            this.error = false
          }, 2000)
          return
        }
        if(this.multiple) {
          files.forEach(file => {
            this.add_file(this.populate_files, file)
          })
        } else {
          // single file
          let file = files[0]
          file.preview = URL.createObjectURL(file)
          this.$emit('file_added', file)
        }
      },
      valid_files(files) {
        var allowed_type = false
        files.forEach(file => {
          if(this.allowed_types.includes(file.type)) {
            allowed_type = true
          }
        })
        return allowed_type
      }
    },
    props: {
      populate_files: {
        type: Array
      },
      multiple: {
        type: Boolean,
        default: false
      },
      allowed_types: {
        type: Array,
        // images
        default: () =>  ['image/jpeg', 'image/png']
      }
    }
}
</script>
