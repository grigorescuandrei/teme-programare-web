var nameTextBox = document.getElementById("nume")
var birthdayDatePicker = document.getElementById("data_nasterii")
var ageSpinner = document.getElementById("varsta")
var emailTextBox = document.getElementById("email")
var resultMessage = document.getElementById("mesaj")

function valideaza() {
    var mesaj = ""
    if (nameTextBox.value == "") {
        nameTextBox.style.borderColor = "red"
        mesaj += "nume, "
    } else {
        nameTextBox.style.borderColor = "rgb(0,255,0)"
    }
    var birthday = birthdayDatePicker.valueAsDate
    if (birthday == null) {
        birthdayDatePicker.style.borderColor = "red"
        mesaj += "data nașterii, "
    } else {
        birthdayDatePicker.style.borderColor = "rgb(0,255,0)"
    }
    var age = parseInt(ageSpinner.value)
    if (isNaN(age) || age < 18 || age > 150) {
        ageSpinner.style.borderColor = "red"
        mesaj += "vârstă, "
    } else {
        ageSpinner.style.borderColor = "rgb(0,255,0)"
    }
    var pattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9._]+\.[a-zA-Z0-9._]+$/i
    if (emailTextBox.value.search(pattern) == -1) {
        emailTextBox.style.borderColor = "red"
        mesaj += "email, "
    } else {
        emailTextBox.style.borderColor = "rgb(0,255,0)"
    }
    if (mesaj != "") {
        mesaj = mesaj.substring(0, mesaj.length - 2)
        resultMessage.innerHTML = `Câmpurile (${mesaj}) nu sunt completate corect`
        resultMessage.style.color = "red"
    } else {
        resultMessage.innerHTML = "Datele sunt completate corect"
        resultMessage.style.color = "green"
    }
    return false;
}