export default {
	test: 'test text',
	languages: {
		en: 'English',
		ru: 'Russian'
	},
	form: {
		dropzone: {
			drop_single: 'Drop your file here',
			drop_multiple: 'Drop your files here',
			error_extension: 'Forbidden file extension. Allowed: jpg, png',
		},
		input: {
			name: 'Name',
			email: 'Email',
			password: 'Password'
		},
		validation: {
			name: {
						regex: /^[a-zA-Zа-яА-Я\- ]{3,36}$/,
						error: 'Must contain between 3 and 36 characters. Spaces and dashes are allowed'
			},
			email: {
						regex: /^[\w._]+@\w+\.\w+$/,
						error: 'Must contain a valid email address'
			},
			password: {
						regex: /^[\w!@#$%^&*]{8,42}$/,
						error: 'Must contain between 8 and 42 characters'
			},
			string: {
						regex: /^[\w!@#$%^&*]{1,500}$/,
						error: 'Please enter a valid input'
			},
		},
	},
	messages: {
		friends: {
			add: 'Friend request to {user} is sent',
			remove: '{user} is removed form your friendlist',
			cancel: 'Friend request to {user} is cancelled',
			accept: 'Friend request from {user} is accepted',
			decline: 'Friend request from {user} is declined'
		},
		notifications: {
			empty: 'You have no notifications'
		},
		banners: {
			registration_success: 'Registration is successful. You need to confirm your email now',
			verify_success: 'You have verified your account. Now you can login'
		}
	},
	pages: {
		home: 'Home',
		friends: 'Friends',
		requests: 'Friend requests',
		register: 'Register',
		login: 'Login',
		logout: 'Log out'
	},
	friends: {
		friends: 'Friends',
		requests: 'Requests',
		send_message: 'Send Message',
		sent: 'Request sent',
		add: 'Add friend',
		remove: 'Remove friend',
		cancel: 'Cancel request',
		accept: 'Accept',
		decline: 'Decline'
	},
	notifications: {
		message_for_type: {
			'IncomingFriendRequest': 'You received a friend request from {name}',
			'FriendRequestAccepted': '{name} has accepted your friend request'
		}
	},
	messaging: {
		date: {
			today: 'Today',
			yesterday: 'Yesterday',
			'1': 'January',
			'2': 'February',
			'3': 'March',
			'4': 'April',
			'5': 'May',
			'6': 'June',
			'7': 'July',
			'8': 'August',
			'9': 'September',
			'10': 'October',
			'11': 'November',
			'12': 'December',
		}
	},
	// custom error codes(frontend translatable errors)
	demo_errors: {
		900: 'Something went wrong',
		901: 'User was not found(Wrong credentials)',
		902: 'You must verify your email address first in order to be able to login',
		903: 'This email address already exists'
	}
}