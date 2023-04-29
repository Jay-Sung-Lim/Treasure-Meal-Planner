// Get the form element
const form = document.querySelector('form');

// Add event listener for form submit
form.addEventListener('submit', (event) => {
  // Prevent default form submission
  event.preventDefault();

  // Get user input values
  const days = document.getElementById('days-input').value;
  const age = document.getElementById('age-input').value;
  const calories = document.getElementById('calories-input').value;
  const restrictions = document.getElementById('restrictions-input').value;

  // TODO: Generate meal plan based on user input

  // Clear the form inputs
  form.reset();
});
