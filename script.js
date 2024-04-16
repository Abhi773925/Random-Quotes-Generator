const quotes = document.getElementById('quotes');
const author = document.getElementById('author');
const next = document.getElementById('next');
const tweet = document.getElementById('tweet');

async function getQuotes() {
    const api = "https://type.fit/api/quotes";
    try {
        const response = await fetch(api);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function displayQuotes() {
    try {
        const data = await getQuotes();
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex];

        quotes.textContent = randomQuote.text;
        author.textContent = randomQuote.author ? `- ${randomQuote.author}` : '- Unknown';
    } catch (error) {
        console.error(error);
    }
}

function tweetNow() {
    const quote = quotes.textContent;
    const authorName = author.textContent.slice(2); 
    const tweetText = encodeURIComponent(`"${quote}" ${authorName}`);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, '_blank');
}
tweet.addEventListener("click", tweetNow);
next.addEventListener("click", displayQuotes);

displayQuotes();
