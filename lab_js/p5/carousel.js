function getDescendantsOfType(ancestor, type) {
    type = type.toUpperCase();
    let children = ancestor.childNodes
    if (children.length == 0)
        return []
    let descendants = []
    for (let i = 0; i < children.length; i++) {
        if (children[i].tagName == type)
            descendants.push(children[i])
    }
    for (let i = 0; i < children.length; i++) {
        descendants = descendants.concat(getDescendantsOfType(children[i], type))
    }
    return descendants
}

function interpolate(a, b, alpha) {
    return a + (b - a) * alpha
}

var carousels = document.getElementsByClassName("carousel");
for (let i = 0; i < carousels.length; i++) {
    let carousel = carousels[i]
    let images = getDescendantsOfType(carousel, "ol")[0]
    images.style.left = "0";
    let n = getDescendantsOfType(images, "li").length - 1
    let k = 0
    let carouselWidth = 320
    let prevButton = getDescendantsOfType(carousel, "a")[0]
    let nextButton = getDescendantsOfType(carousel, "a")[1]
    let debounce = false

    prevButton.innerHTML = "◄"
    nextButton.innerHTML = "►"

    function incrementK() {
        if (k >= n) {
            k = 0
        } else {
            k++
        }
    }

    function decrementK() {
        if (k <= 0) {
            k = n
        } else {
            k--
        }
    }

    function transition() {
        debounce = true;
        let startLeft = parseFloat(images.style.left)
        setTimeout(function() {
            let leftValue = parseFloat(images.style.left)
            if (Math.abs(leftValue + k*carouselWidth) > 1) {
                images.style.left = interpolate(leftValue, -k * carouselWidth, 0.1).toString() + "px"
            } else {
                images.style.left = (-(k * carouselWidth)).toString() + "px"
                debounce = false;
                return;
            }
            transition()
        }, 16)
    }

    let next = function() {
        if (debounce)
            return;
        incrementK()
        transition()
    }

    let delay = 5000
    let autoIncrementID
    let autoIncrement = function() {
        next()
        autoIncrementID = setTimeout(autoIncrement, delay + 1000)
    }
    autoIncrementID = setTimeout(autoIncrement, delay)

    nextButton.onclick = function() {
        next()
        clearTimeout(autoIncrementID)
        autoIncrementID = setTimeout(autoIncrement, delay + 1000)
    }

    prevButton.onclick = function() {
        if (debounce)
            return;
        decrementK()
        transition()
        clearTimeout(autoIncrementID)
        autoIncrementID = setTimeout(autoIncrement, delay + 1000)
    }

    let cards = getDescendantsOfType(carousel, "li")
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i]
        let cardImage = getDescendantsOfType(card, "img")[0]
        let link = getDescendantsOfType(card, "a")[0]
        cardImage.onclick = function() {
            let modal = document.createElement("div")
            modal.className = "modal"
            document.body.appendChild(modal)
            let modalBackground = document.createElement("div")
            modalBackground.className = "modal-background"
            modal.appendChild(modalBackground)
            let img = document.createElement("img")
            img.width = 320
            img.height = 320
            img.src = cardImage.src
            img.style.zIndex = 4;
            modal.appendChild(img)
            let a = document.createElement("a")
            a.href = link.href
            a.innerHTML = link.innerHTML
            modal.appendChild(a)
            modal.onclick = function() {
                document.body.removeChild(modal)
            }
            img.onclick = function() {
                document.location = link.href
            }
        }
    }
}