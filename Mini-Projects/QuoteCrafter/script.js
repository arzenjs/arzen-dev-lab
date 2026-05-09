// Selecting DOM elements
const body = document.querySelector('body');
const themeToggle = document.querySelector('.theme-toggle');
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const newQuoteBtn = document.querySelector('.new-quote-btn');
const saveFavBtn = document.querySelector('.save-fav-btn');
const favoritesList = document.querySelector('.favorites-list');
const noFavsMsg = document.querySelector('.no-favs-msg');
const favoritesSection = document.querySelector('.favorites-section');
const toggleFavsBtn = document.querySelector('.toggle-favs-btn');

// Theme setup from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark');
  themeToggle.innerHTML = '☀️';
}

// Toggle theme
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const newTheme = body.classList.contains('dark') ? 'dark' : 'light';
  themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', newTheme);
});

// Fetch random quote from API
newQuoteBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('https://dummyjson.com/quotes/random');
    const data = await res.json();
    quoteText.textContent = `"${data.quote}"`;
    quoteAuthor.textContent = `— ${data.author}`;
  } catch {
    quoteText.textContent = "Failed to fetch quote.";
    quoteAuthor.textContent = "";
  }
});

// Load favorites from localStorage
let savedQuotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];

// Display all saved quotes
function displaySavedQuotes() {
  favoritesList.innerHTML = '';
  noFavsMsg.style.display = savedQuotes.length === 0 ? 'block' : 'none';

  savedQuotes.forEach(q => {
    const li = document.createElement('li');
    li.innerHTML = `
      <p class="quote-text">${q.quote}</p>
      <p class="quote-author">${q.author}</p>
      <button class="delete-btn" title="Delete this quote">🗑️</button>
    `;

    // Delete button logic
    li.querySelector('.delete-btn').addEventListener('click', () => {
      savedQuotes = savedQuotes.filter(savedQuote => savedQuote.quote !== q.quote);
      localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));
      displaySavedQuotes();
      alert('Quote deleted from favorites.');
    });

    favoritesList.appendChild(li);
  });
}

// Save current quote to favorites
saveFavBtn.addEventListener('click', () => {
  const quote = quoteText.textContent;
  const author = quoteAuthor.textContent;

  if (
    quote === "Failed to fetch quote." ||
    quote === "A great quote will appear here..."
  ) {
    alert('Please fetch a quote before saving.');
    return;
  }

  // Avoid duplicate save
  const alreadyExists = savedQuotes.some(q => q.quote === quote);
  if (alreadyExists) {
    alert('This quote is already saved in your favorites.');
    return;
  }

  savedQuotes.unshift({ quote, author });
  localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));
  displaySavedQuotes();
  favoritesSection.classList.remove('hidden');
  favoritesSection.style.height = 'auto'; // Expand section when a quote is saved
  toggleFavsBtn.textContent = '▲'; // Change button to collapse icon
  alert('Quote saved to favorites!');
});

// Initial render
displaySavedQuotes();

toggleFavsBtn.addEventListener('click', () => {
  favoritesSection.classList.toggle('hidden');
  toggleFavsBtn.textContent = favoritesSection.classList.contains('hidden') ? '▼' : '▲';
  favoritesSection.classList.contains('hidden') ? favoritesSection.style.height = '100px' : favoritesSection.style.height = 'auto'
  if (!favoritesSection.classList.contains('hidden')) {
    displaySavedQuotes();
    favoritesList.style.display = 'block';
    noFavsMsg.style.display = savedQuotes.length === 0 ? 'block' : 'none';
  }else {
    favoritesList.style.display = 'none';
    noFavsMsg.style.display = 'none';
  }
});