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

    nextButton.onclick = function() {
        if (debounce)
            return;
        incrementK()
        transition()
    }

    prevButton.onclick = function() {
        if (debounce)
            return;
        decrementK()
        transition()
    }
}