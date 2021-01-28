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
    if (Client.validateText(txt)) {
        fetch(`http://localhost:8081/data?txt=${txt}`)
        .then(res => res.json())
        .then(data => {
            const polarity = sentimentSet[data.score_tag]
            const subjectivity = data.subjectivity.toLowerCase()
            const text = data.sentence_list[0].text

            document.getElementById('polarityResult').innerHTML = polarity
            document.getElementById('subjectivityResult').innerHTML = subjectivity
            document.getElementById('textSnippet').innerHTML = text
        })
    }
}

export { handleSubmit }
