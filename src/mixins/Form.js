// form modules
import Dropzone from '@/components/layouts/form/Dropzone'
import Input from '@/components/layouts/form/Input'
import Submit from '@/components/layouts/form/Submit'

export default {
  data() {
    return {
      submit_blocked: false,
      display_errors: false,
      backend_error: false
    }
  },
	methods: {
    are_form_fields_valid(...fields) {
      // is every field valid
      return fields.every(field => {
        return field.valid
      })
    }
	},
  components: {
    'dropzone': Dropzone,
    'demo-input': Input,
    'demo-submit': Submit,
  }
}