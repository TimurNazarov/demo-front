// form modules
import Dropzone from '@/components/modules/dropzone/Dropzone'
import Input from '@/components/modules/input/Input'

export default {
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
    'demo-input': Input
  }
}