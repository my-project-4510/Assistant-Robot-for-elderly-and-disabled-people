// Fetch joke from JokeAPI (https://jokeapi.dev)
async function fetchJoke() {
    const jokeDisplay = document.getElementById('jokeDisplay');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const getJokeBtn = document.getElementById('getJokeBtn');
    const newJokeBtn = document.getElementById('newJokeBtn');
    
    // Show loading state
    loading.style.display = 'block';
    jokeDisplay.style.display = 'none';
    error.style.display = 'none';
    getJokeBtn.disabled = true;
    newJokeBtn.disabled = true;
    
    try {
        // Fetch joke from free JokeAPI
        const response = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode');
        
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }
        
        const data = await response.json();
        
        // Format the joke based on type
        let jokeText = '';
        if (data.type === 'single') {
            jokeText = data.joke;
        } else if (data.type === 'twopart') {
            jokeText = `${data.setup}\n\n${data.delivery}`;
        }
        
        // Display the joke
        const jokeTextElement = jokeDisplay.querySelector('.joke-text');
        jokeTextElement.textContent = jokeText;
        jokeDisplay.style.display = 'flex';
        loading.style.display = 'none';
        
        // Show the "Next Joke" button instead of "Get Joke"
        getJokeBtn.style.display = 'none';
        newJokeBtn.style.display = 'inline-block';
        newJokeBtn.disabled = false;
        
    } catch (err) {
        // Show error message
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = `Oops! Failed to load joke: ${err.message}. Please try again.`;
        error.style.display = 'block';
        loading.style.display = 'none';
        jokeDisplay.style.display = 'none';
        
        // Re-enable buttons
        getJokeBtn.disabled = false;
        newJokeBtn.disabled = false;
    }
}

// Add keyboard support
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const getJokeBtn = document.getElementById('getJokeBtn');
            const newJokeBtn = document.getElementById('newJokeBtn');
            
            if (getJokeBtn.style.display !== 'none' && !getJokeBtn.disabled) {
                fetchJoke();
            } else if (newJokeBtn.style.display !== 'none' && !newJokeBtn.disabled) {
                fetchJoke();
            }
        }
    });
});
