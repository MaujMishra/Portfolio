const route = (event) => {
    event = event || window.event
    event.preventDefault()
    window.history.pushState({}, "", event.target.href)
    handleLocation()
}

const routes = {
    "/": "/index.html",
    "/event-detection": "/event-detection.html",
    "/driver-drowsiness-detection": "/driver-drowsiness.html",
    "/neso-academy-website": "/neso.html"
}

async function handleLocation() {
    const path = window.location.pathname
    const route_name = routes[path] || routes["404"]
    const html = await fetch(route_name).then((data) => data.text())
    document.getElementById("body").innerHTML = html
}

window.onpopstate = handleLocation
window.route = route

handleLocation()

const tablinks = document.getElementsByClassName("tab-links")
const tabcontents = document.getElementsByClassName("tab-contents")

function opentab(event, tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link")
    }

    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab")
    }

    event.currentTarget.classList.add("active-link")
    document.getElementById(tabname).classList.add("active-tab")
}

const sidemenu = document.getElementById("sidemenu")

function openmenu(e) {
    sidemenu.style.right = "0"
}

function closemenu(e) {
    sidemenu.style.right = "-200px"
}

const scriptURL = "https://script.google.com/macros/s/AKfycbwrriAcGLhppWT6kH6Ak9LFVnIgkgxUELN4uJOfFLc1PMj4f6zbnw7j9j8lvVEhvExO/exec"
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => { 
        msg.innerHTML = "Message Sent Successfully"
        setTimeout(() => msg.innerHTML = "", 5000)
        form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})
