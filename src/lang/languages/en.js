export default {
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
			password: 'Password',
		},
		validation: {
			name: {
				error: 'Must contain between 3 and 36 characters. Spaces and dashes are allowed'
			},
			email: {
				error: 'Must contain a valid email address'
			},
			password: {
				error: 'Must contain between 8 and 42 characters'
			},
			title: {
				error: 'Must contain between 1 and 50 characters'
			},
			content: {
				error: 'Must contain between 1 and 10000 characters'
			},
			string: {
				error: 'Please enter a valid input'
			}
		},
		button: {
			submit: 'Submit',
			post: 'Post',
			login: 'Login',
			register: 'Register',
			search: 'Search',
			load_more: 'Load more'
		}
	},
	messages: {
		friends: {
			add: 'Friend request to {user} is sent',
			cancel: 'Friend request to {user} is cancelled',
			accept: 'Friend request from {user} is accepted',
			decline: 'Friend request from {user} is declined',
			remove: '{user} is removed form your friendlist',
			remove_confirm: 'Are you sure you want to remove {name} from your friend list?'
		},
		notifications: {
			empty: 'You have no notifications'
		},
		banners: {
			registration_success: 'Registration is successful. You need to confirm your email now',
			verify_success: 'You have verified your account. Now you can login'
		},
		'404': {
			redirect: 'You will be redirected to home page in'
		}
	},
	pages: {
		default: 'Demo',
		page_not_found: 'Page not found',
		home: 'Home',
		friends: 'Friends',
		friend_requests: 'Friend requests',
		register: 'Register',
		login: 'Login',
		logout: 'Logout',
		my_profile: 'View profile',
		posts_search: 'Posts',
		banner_message: 'Message'
	},
	chat: {
		is_typing: 'is typing',
		no_messages: 'No messages',
		select_contact: 'Select contact',
		send: 'Send'
	},
	friends: {
		friends: 'Friends',
		requests: 'Requests',
		friendable_users: 'Friendable users',
		send_message: 'Send Message',
		sent: 'Request sent',
		add: 'Add friend',
		remove: 'Remove friend',
		cancel: 'Cancel request',
		accept: 'Accept',
		decline: 'Decline',
		incoming: 'Incoming',
		outgoing: 'Outgoing'
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
	profile: {
		friends: 'Friends',
		posts: 'Posts',
		no_posts: 'This user has no posts yet',
		no_friends: 'This user has no friends yet',
		logged_as: 'Logged as:',
		form: {
			title: 'Title',
			content: 'Content',
			submit: 'Post'
		}
	},
	search: {
		search_label: 'Search for posts',
		no_posts_found: 'No posts found'
	},
	// custom error codes(frontend translatable errors)
	demo_errors: {
		900: 'Something went wrong',
		901: 'User was not found(Wrong credentials)',
		902: 'You must verify your email address first in order to be able to login',
		903: 'This email address already exists'
	}
}