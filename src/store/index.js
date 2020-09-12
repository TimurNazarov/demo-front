import Vue from 'vue'
import Vuex from 'vuex'
import { createStore } from 'vuex-extensions'

Vue.use(Vuex)

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
	user_info_initialized: null, // promise
	pusher_initizlized: false,
	user: {
		loaded: false
	},
	friendable_set: false,
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
	show: {
		loader: true,
		profile_menu: false,
		chat_module: false,
		notifications: false
	},
	message_popup: {
		timeout: null,
		show: false,
		message: ''
	},
}

export default createStore(Vuex.Store,{
  state,
  getters,
  mutations,
  actions
})
