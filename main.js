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
    "neso-academy-website": "/neso.html"
}

async function handleLocation() {
    const path = window.location.pathname
    const route = routes[path] || route["404"]
    const html = await fetch(route).then((data) => data.text())
    document.getElementById("body").innerHTML = html
}

window.onpopstate = handleLocation
window.route = route

handleLocation()