const sentimentSet = {
    'P+': 'strong positive',
    'P': 'positive',
    'NEU': 'neutral',
    'N': 'negative',
    'N+': 'strong negative',
    'NONE': 'without sentiment',
}

function handleSubmit(event) {
    event.preventDefault()

    const txt = document.querySelector('#input').value
    fetch(`http://localhost:8081/data?txt=${txt}`)
    .then(res => res.json())
    .then(data => {
        document.getElementById('results').innerHTML = sentimentSet[data.score_tag]
    })
}

export { handleSubmit }
