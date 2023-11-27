document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
});

document.getElementById('trivia-form').addEventListener('submit', function(event){
    event.preventDefault();
    const category = document.getElementById('category-select').value;
    fetch(`https://opentdb.com/api.php?amount=10&category=${category}`)
        .then(response => response.json())
        .then(data => displayQuestions(data.results));
});

function fetchCategories() {
    fetch('https://opentdb.com/api_category.php')
        .then(response => response.json())
        .then(data => populateCategories(data.trivia_categories));
}

function populateCategories(categories) {
    const select = document.getElementById('category-select');
    categories.forEach(category => {
        select.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    });
}

function displayQuestions(questions) {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    questions.forEach(question => {
        container.innerHTML += `
            <article class="card ${question.difficulty}">
                <h2>${question.category}</h2>
                <p>${question.question}</p>
                <button>Show Answer</button>
                <p class="hidden">${question.correct_answer}</p>
            </article>
        `;
    });

    document.querySelectorAll('.card button').forEach(button => {
        button.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('hidden');
        });
    });
}