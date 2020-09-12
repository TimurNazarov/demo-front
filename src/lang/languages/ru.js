export default {
	languages: {
		en: 'Английский',
		ru: 'Русский'
	},
	home: {
		welcoming: {
			welcome_text: 'Добро пожаловать в Моё Демо!\
			Этот проект базирован на VueJS[2.6.11](frontend) и Laravel[7.0](backend). \
			Он включает в себя: live-chat переписку, систему друзей, пользовательские публикации(ElasticSearch) и мультиязычность(Английский, Русский). \
			Другие технологии, которые были использованы: SASS(scss), Laravel-Passport API аутентификация, \
			Vue VUEX, moment.js, Websocket-общение(Laravel-Echo, Laravel-websockets(на базе Pusher\'а)). \
			Для более детальной информации Вы можете посетить GitHub репозитории:',
			links: ['https://github.com/TimurNazarov/demo-front', 'https://github.com/TimurNazarov/demo-back'],
			contacts: {
				text: 'Мои контакты:',
				telegram: {
					text: 'Телеграм',
					link_text: '@t_nazarov',
					link: 'https://t.me/t_nazarov'
				},
				email: {
					text: 'Email',
					value: 'timur.nazarou@gmail.com'
				}
			}
		}
	},
	form: {
		dropzone: {
			drop_single: 'Перетащите файл сюда',
			drop_multiple: 'Перетащите файлы сюда',
			error_extension: 'Неверное расширение файла. Разрешены: jpg, png',
		},
		input: {
			name: 'Имя',
			email: 'Email',
			password: 'Пароль',
			profile_picture: 'Изображение профиля'
		},
		validation: {
			name: {
				error: 'Должно содержать от 3 до 36 символов. Пробелы и тире разрешены'
			},
			email: {
				error: 'Должно содержать корректный email адрес'
			},
			password: {
				error: 'Должно содержать от 8 до 42 символов'
			},
			title: {
				error: 'Должно содержать от 1 до 50 символов'
			},
			content: {
				error: 'Должно содержать от 1 до 10000 символов'
			},
			string: {
				error: 'Пожалуйста, введите корректные данные'
			}
		},
		button: {
			submit: 'Подтвердить',
			post: 'Опубликовать',
			login: 'Войти',
			register: 'Зарегистрироваться',
			search: 'Поиск',
			load_more: 'Загрузить ещё'
		}
	},
	messages: {
		friends: {
			add: 'Запрос дружбы пользователю {user} отправлен',
			cancel: 'Запрос дружбы пользователю {user} отменён',
			accept: 'Запрос дружбы от {user} принят',
			decline: 'Запрос дружбы от {user} отклонён',
			remove: '{user} был удалён из Вашего списка друзей',
			remove_confirm: 'Вы уверены что хотите удалить {name} из Вашего списка друзей?'
		},
		notifications: {
			empty: 'У Вас нет уведомлений'
		},
		banners: {
			registration_success: 'Регистрация прошла успешно. Теперь Вам необходимо подтвердить свой email',
			verify_success: 'Вы успешно подтвердили свой email. Теперь Вы можете авторизроваться'
		},
		'404': {
			redirect: 'Вы будете перенаправлену на главную страницу через'
		}
	},
	pages: {
		default: 'Demo',
		page_not_found: 'Страница не найдена',
		home: 'Главная',
		friends: 'Друзья',
		friend_requests: 'Запросы в друзья',
		register: 'Регистрация',
		login: 'Вход',
		logout: 'Выход',
		my_profile: 'Мой профиль',
		posts_search: 'Публикации',
		banner_message: 'Сообщение'
	},
	chat: {
		is_typing: 'печатает',
		no_messages: 'Нет сообщений',
		no_contacts: 'У вас нет доступных контактов',
		select_contact: 'Выберите контакт',
		send: 'Отправить'
	},
	friends: {
		friends: 'Друзья',
		requests: 'Запросы',
		friendable_users: 'Возможные друзья',
		send_message: 'Отправить сообщение',
		sent: 'Запрос отправлен',
		add: 'Добавить в друзья',
		remove: 'Убрать из друзей',
		cancel: 'Отменить запрос',
		accept: 'Принять',
		decline: 'Отклонить',
		incoming: 'Входящие',
		outgoing: 'Исходящие'
	},
	notifications: {
		message_for_type: {
			'IncomingFriendRequest': 'Вы получили запрос дружбы от {name}',
			'FriendRequestAccepted': '{name} принял Ваш запрос дружбы'
		}
	},
	messaging: {
		date: {
			today: 'Сегодня',
			yesterday: 'Вчера',
			'1': 'Января',
			'2': 'Февраля',
			'3': 'Марта',
			'4': 'Апреля',
			'5': 'Мая',
			'6': 'Июня',
			'7': 'Июля',
			'8': 'Августа',
			'9': 'Сентября',
			'10': 'Октября',
			'11': 'Ноября',
			'12': 'Декабря',
		}
	},
	profile: {
		friends: 'Друзья',
		posts: 'Публикации',
		no_posts: 'У этого пользователя пока нет публикаций',
		no_friends: 'У этого пользователя пока нет друзей',
		logged_as: 'Авторизован как:',
		form: {
			title: 'Название',
			content: 'Содержание'
		}
	},
	search: {
		search_label: 'Искать публикации',
		no_posts_found: 'Публикации не найдены'
	},
	// custom error codes(frontend translatable errors)
	demo_errors: {
		900: 'Что-то пошло не так',
		901: 'Пользователь не найден(Неверные email или пароль)',
		902: 'Чтобы войти, вы сначала должны подтвердить ваш email адрес',
		903: 'Этот email адрес уже зарегистрирован'
	}
}