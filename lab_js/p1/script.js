var list1 = document.getElementById("select1")
var list2 = document.getElementById("select2")

function onClicked(clickEvent) {
    element = clickEvent.target

    if (element.parentNode == list1) {
        list1.removeChild(element)
        list2.appendChild(element)
    } else if (element.parentNode == list2) {
        list2.removeChild(element)
        list1.appendChild(element)
    }
}

for (element of list1.childNodes) {
    element.ondblclick = onClicked
}

for (element of list2.childNodes) {
    element.ondblclick = onClicked
}