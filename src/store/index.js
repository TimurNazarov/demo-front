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
	message_popup: {
		show: false,
		message: 'Hello'
	},
	modals: {
		notifications: false
	},
}

export default createStore(Vuex.Store,{
  state,
  getters,
  mutations,
  actions
})
