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

const chatForm = document.querySelector('.chat-inputarea');
const chatInput = document.querySelector('.chat-input');
const chatBox = document.querySelector('.chat-box');

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const chatText = chatInput.value;
  if (!chatText) return;

  appendMessage('User', 'right', chatText);
  chatInput.value = '';

  chatResponse();
});

// 유저 인풋 저장
function appendMessage(name, side, text) {
  const chatHTML = `
    <div class="chat ${side}-chat">
    <div class="chat-bubble">
      <div class="chat-info">
        <div class="chat-info-name">${name}</div>
      </div>
      <p class="message-text">${text}</p>
    </div>
  </div>
    `;
  chatBox.insertAdjacentHTML('beforeend', chatHTML);
  chatBox.scrollTop += 500;
}

// chatGPT 답변
function chatResponse() {}
