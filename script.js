window.onload = () => redirect('home')

const container = document.querySelector('#app') // заносим в переменную div
const navList = document.querySelectorAll('[data-link]') // берем все элементы по атрибуту

navList.forEach((el) => {
  // добавляем на ссылки с атрибутом data-link "навигацию"
  el.addEventListener('click', () => {
    const attr = el.getAttribute('data-link')
    redirect(attr)
  })
})

const components = {
  // создаем шаблонные компоненты
  create(element, value, attrs) {
    // components.input.create('button', "Кнопочка", {type: 'button})) // example
    const el = document.createElement(element)
    value && (el.innerHTML = value)
    attrs &&
      Object.entries(attrs).forEach(([key, value]) =>
        el.setAttribute(key, value)
      )
    return el
  },
  input: {
    get email() {
      // readonly
      const el = document.createElement('input')
      el.setAttribute('type', 'email')
      el.setAttribute('placeholder', 'email')
      return el
    },
    get pass() {
      const el = document.createElement('input')
      el.setAttribute('type', 'password')
      el.setAttribute('placeholder', 'password')
      return el
    },
  },
  button(value, type) {
    const el = document.createElement('button')
    el.innerText = value
    el.setAttribute('type', type)
    return el
  },
}

const values = {
  home: () => {
    const main = components.create('div', '')
    const title = components.create('h1', 'Home')
    const subtitle = components.create('div', 'Пример текста', {
      style: 'margin-top:10px;',
    })
    main.appendChild(title)
    main.appendChild(subtitle)
    return main
  },
  about: () => {
    const main = components.create('div', '')
    const title = components.create('h1', 'About')
    const subtitle = components.create(
      'div',
      'Сочные картинки в корпоративных цветах, дополненные популярной сегодня абстракцией. Фотографии руководителей, много анимации, инфографики и крупной типографики. Рассказали ребята о себе все, но тезисно, а еще добавили кнопку отправки брифа, увеличив тем самым шансы роста конверсии. Продающая страница “О компании” сегодня? Примерно такая.',
      {
        style: 'margin-top:10px; max-width:300px;',
      }
    )
    main.appendChild(title)
    main.appendChild(subtitle)
    return main
  },
  form: () => {
    const main = components.create('form', 'Форма', { class: 'form' })
    const list = [
      components.input.email,
      components.input.pass,
      components.create('button', 'Submit', { type: 'submit' }),
    ]

    list.forEach((element) => main.appendChild(element)) // цикл для примера
    return main
  },
  live: () => {
    const play = '?autoplay=1'
    const main = components.create('iframe', '', {
      src: `https://www.youtube.com/embed/PY8f1Z3nARo${play}`, // live stream
      // src: `https://www.youtube.com/embed/Klt1EBFjt1g${play}`, // YT video require "embed"
      autoplay: true,
      frameborder: '0',
      allowfullscreen: true,
    })
    return main
  },
  contact: () => {
    const list = [
      'Телефон : 8-800-999-99-99',
      'Директор : Иван Иванович',
      'Адрес : г. Москва ул.Пушкина д.Калатушкина',
    ]
    const ul = components.create('ul')
    list
      .map((el) => components.create('li', el))
      .forEach((element) => ul.appendChild(element))

    return ul
  },
}

let current
const redirect = (link) => {
  current !== link && // проверка против повторного рендера
    ((current = link),
    (container.innerHTML = ''), // очищаем предыдущее содержимое
    container.appendChild(values[link]())) // присваиваем новое отслеживая ссылку и вызываем функцию
}
