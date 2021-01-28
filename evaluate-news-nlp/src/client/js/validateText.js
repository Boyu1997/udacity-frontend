const regex = new RegExp("^[A-z0-9!\"#$%&'()*\+, -.\/:;<=>?@\[\\\]^_`{|}~\ ]+$")

function validateText(txt) {
    if (regex.test(txt)) {
        return true
    }
    else {
        alert("invalid input text, alphanumeric and punctuation only")
        return false
    }
}

export { validateText }