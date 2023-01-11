const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = [];

//Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Hide Loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
function newQuote(){
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quote.author?quote.author:'Unknown';
    
    // Check Quote length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Quote
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
        // Catch Error Here
        console.log(error);
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes();