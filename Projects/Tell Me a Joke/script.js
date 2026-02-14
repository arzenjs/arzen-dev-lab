const button = document.querySelector('button');
const joke = document.querySelector('.joke');
// const url = 'https://api.chucknorris.io/jokes/random';
const url = 'https://official-joke-api.appspot.com/random_joke';

async function getJoke() {
    try {
        let response = await fetch(url)
        let data = await response.json()
        // joke.innerHTML = data.value
        joke.innerHTML = `${data.setup} - ${data.punchline}`;
        console.log("Data fetched successfully!");
    } catch (error) {
        console.error('Error fetching joke:', error);
        alert("Sorry, we couldn't fetch a joke at this time. Please try again later.");
    }
}

async function main() {
        await getJoke()
}

button.addEventListener('click', () => {
    main()
})