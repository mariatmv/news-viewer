document.onreadystatechange = function () {
    if (document.readyState == "interactive") {   
        document.querySelector('.action-btn').addEventListener("click", sendViewsToArticle)
    }
}

async function sendViewsToArticle(event) {
    let articleUrl = document.querySelector('#articleUrl').value
    let viewsCount = document.querySelector('#viewsCount').value
    let viewsTimeWindow = document.querySelector('#viewsTimeWindow').value
    
    let viewsTimeWindowInSeconds = viewsTimeWindow * 60
    let waitPerRequest = viewsTimeWindowInSeconds / viewsCount 

    document.querySelector('#articleUrl').value = ''
    document.querySelector('#viewsCount').value = ''
    document.querySelector('#viewsTimeWindow').value = ''

    alert('Изпратено!')

    for(let i = 1; i <= viewsCount; i++){
        await fetchArticle(articleUrl, i, waitPerRequest)
    }
}

async function fetchArticle(articleUrl, i, waitPerRequest) {
    fetch(articleUrl, {
        method: 'GET',
        mode: 'no-cors'
        })
    .then((_) => console.log(i))

    await sleep(waitPerRequest * 1000)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}