function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    const txt = document.querySelector('#name').value
    
    fetch(`http://localhost:8081/data?txt=${txt}`)
    .then(res => {
        console.log(res)
        res.json()})
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}

export { handleSubmit }
