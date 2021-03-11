const quoteCntnr = document.getElementById('quoteCnt');
const quotetxt = document.getElementById('quote');
const author = document.getElementById('author');
const btnTwitt = document.getElementById('twitter');
const btnNew = document.getElementById('newQuote');
const loader = document.getElementById('loader');


function loading() {
	loader.hidden = false;
	quoteCntnr.hidden = true;
}

function complete() {
	if(!loader.hidden) {
		loader.hidden = true;
		quoteCntnr.hidden = false;
	}
}
async function Quote() {
	loading();

	const apiUrl = 'https://goquotes-api.herokuapp.com/api/v1/random?count=1';
	try{
		const response = await fetch(apiUrl);
		const data = await response.json();
		if(data)
		quotetxt.innerHTML = data.quotes[0].text;
		author.innerHTML = data.quotes[0].author;
	}catch(error){
		Quote();
		console.log(error);
	}
	complete();
}

function tweetQuote() {
	const quote = quotetxt.innerText;
	const autor = author.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${autor}`;
	window.open(twitterUrl, '-blank');
}
Quote();
btnNew.addEventListener('click', Quote);
btnTwitt.addEventListener('click', tweetQuote);


