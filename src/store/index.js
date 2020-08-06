import Vue from 'vue'
import Vuex from 'vuex'
import { createStore } from 'vuex-extensions'

Vue.use(Vuex)

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
	backend_api_url: 'http://demo-back/api',
	user_info_initialized: null, // promise
	pusher_initizlized: false,
	user: {
		loaded: false,
		notifications: {
			loaded: [],
			new: []
		}
	},
	friendable_users: {
		loaded: [],
		new: []
	},
	messaging: {
		active_contact: false,
		contacts: {
			loaded: [],
			new: []
		},
		messages: {}
	},
	modals: {
		notifications: false
	},
	message_popup: {
		show: false,
		message: 'Hello'
	},
}

export default createStore(Vuex.Store,{
  state,
  getters,
  mutations,
  actions
})
