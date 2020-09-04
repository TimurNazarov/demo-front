import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
import english from './languages/en'
import russian from './languages/ru'

Vue.use(MLInstaller)

export default new MLCreate({
  initial: 'en',
  save: true,
  // save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('en').create(english),
    new MLanguage('ru').create(russian)
  ]
})