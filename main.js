document.onreadystatechange = function () {
    if (document.readyState == "interactive") { 
        timestamp = Date.now()  
        document.querySelector('.action-btn').addEventListener("click", sendViewsToArticle)
    
        // if (localStorage.getItem("viewsCounter") == 'visible') {
        //     document.querySelector('#viewsCounter').removeAttribute('hidden')
        // }
    }
}

async function sendViewsToArticle(event) {
    let articleUrl = document.querySelector('#articleUrl').value
    let viewsCount = document.querySelector('#viewsCount').value
    let viewsTimeWindow = document.querySelector('#viewsTimeWindow').value
    
    let viewsTimeWindowInSeconds = viewsTimeWindow * 60
    let waitPerRequest = viewsTimeWindowInSeconds / viewsCount 

    // document.querySelector('#articleUrl').value = ''
    // document.querySelector('#viewsCount').value = ''
    // document.querySelector('#viewsTimeWindow').value = ''

    // alert('Изпратено!')
    let viewsCounter = document.querySelector('#viewsCounter')
    viewsCounter.removeAttribute('hidden')
    // localStorage.setItem(`${timestamp}_viewsCounter`, 'visible');

    for(let i = 1; i <= viewsCount; i++){
        localStorage.setItem(`${timestamp}_viewsCount`, i);
        await fetchArticle(articleUrl, i, waitPerRequest)
    }

    localStorage.setItem(`${timestamp}_viewsCount`, 0);
}

setInterval(function() {
    let viewsCounter = document.querySelector('#viewsCounter h4')
    viewsCounter.innerHTML = localStorage.getItem(`${timestamp}_viewsCount`)
}, 2000)

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