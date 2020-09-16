export default {
	languages: {
		en: 'English',
		ru: 'Russian'
	},
	home: {
		welcoming: {
			welcome_text: 'Welcome to My Demo!\
			\n\nThis project is based on VueJS[2.6.11](frontend) and Laravel[7.0](backend). \
			It includes: live-chat messaging, friend system, user posts(ElasticSearch) and multilanguage(English, Russian). \
			Some other technologies which were used: SASS(scss), Laravel-Passport API authentication, \
			Vue VUEX, moment.js, Websocket-communication(Laravel-Echo, Laravel-websockets(Pusher based)). \
			\n\nFor testing you can use preregistered test accounts. There are 10 test user accounts with email/password credential pairs like: \
			1(email)/1(password), 2/2, 3/3 and so on up to 10/10. \
			\nYou also can register you own user on "Registration" page. \
			\n\nFor more detailed overview on this demo project you may visit GitHub repositories:',
			links: ['https://github.com/TimurNazarov/demo-front', 'https://github.com/TimurNazarov/demo-back'],
			contacts: {
				text: 'My contacts:',
				telegram: {
					text: 'Telegram',
					link_text: '@t_nazarov',
					link: 'https://t.me/t_nazarov'
				},
				email: {
					text: 'Email',
					value: 'nazarovtim11@gmail.com'
				}
			}
		}
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
			profile_picture: 'Profile picture'
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
		no_contacts: 'You have no available contacts',
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