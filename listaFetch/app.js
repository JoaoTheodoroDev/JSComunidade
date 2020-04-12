function ContentBox(itens = []) {
    this.element = document.createElement('div')
    this.element.setAttribute('class', 'content-box')

    itens.forEach(item => {
        this.element.appendChild(item)
    });

    return this.element
}

function ContentBoxItem(data = {}) {
    this.element = document.createElement('div')
    this.element.setAttribute('class', 'item')

    const img = document.createElement('img')
    img.setAttribute('src', data.avatar_url ? data.avatar_url :
        'https://dc-bikes.nl/wp-content/uploads/2018/10/1-no-image.png')

    const avatar = document.createElement('div')
    avatar.setAttribute('class', 'avatar')
    avatar.appendChild(img)

    const devInfo = document.createElement('div')
    devInfo.setAttribute('class', 'content')
    devInfo.innerHTML = `
        <h4>${data.login ? data.login : 'John Doe'}</h4>
        <p>${data.repos_url ? data.repos_url : 'Dev infos!'}</p>
    `

    this.element.appendChild(avatar)
    this.element.appendChild(devInfo)

    return this.element
}

function FloatButton() {
    this.element = document.createElement('div')
    this.element.setAttribute('class', 'float-btn')

    const upArrow = document.createElement('div')
    upArrow.setAttribute('class', 'up')

    const link = document.createElement('a')
    link.setAttribute('href', '#')

    link.appendChild(upArrow)
    
    this.element.appendChild(link)

    return this.element
}

const userArr = []
const app = document.querySelector('div#app')

document.body.appendChild(new FloatButton())

fetch('https://api.github.com/users')
 .then(data => data.json())
    .then(resp => {
        const getUser = user => {
            const { login, avatar_url, repos_url } = user
            userArr.push(new ContentBoxItem({
                login,
                avatar_url,
                repos_url
            }))
        }
        resp.map(getUser)
        app.appendChild(new ContentBox(userArr))
    })