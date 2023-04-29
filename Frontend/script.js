// Get user input values
//   const days = document.getElementById('days-input').value;
//   const age = document.getElementById('age-input').value;
//   const calories = document.getElementById('calories-input').value;
//   const restrictions = document.getElementById('restrictions-input').value;

// TODO: Generate meal plan based on user input

async function getMealPlan() {
  try {
    const response = await fetch('http://localhost:3000/treasureMealPlanner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Jaesung' }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

채ㅜㄴㅅ;
