let rawData

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(e => console.log('oh fuck'))