// Get user input values
//   const days = document.getElementById('days-input').value;
//   const age = document.getElementById('age-input').value;
//   const calories = document.getElementById('calories-input').value;
//   const restrictions = document.getElementById('restrictions-input').value;

// TODO: Generate meal plan based on user input

const chatBox = document.querySelector('.chat-box');
const chatForm = document.querySelector('.chat-inputarea');
const chatInput = document.querySelector('.chat-input');

const sendMessage = async function (event) {
  event.preventDefault();

  const chatText = chatInput.value;
  if (!chatText) return;

  appendMessage('User', 'right', chatText);
  chatInput.value = '';

  const response = await fetch('http://localhost:3000/treasureMealPlanner', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: chatInput.value,
    }),
  });

  const data = await response.json();

  const chatGptResponse = `
  <div class="chat left-chat">
    <div class="chat-bubble">
      <div class="chat-info">
        <div class="chat-info-name">Treasure Meal Planner</div>
      </div>
      <p class="message-text">${data.assistant}</p>
    </div>
  </div>
  `;
  chatBox.insertAdjacentHTML('beforeend', chatGptResponse);
  chatBox.scrollTop += 500;
};

chatForm.addEventListener('submit', sendMessage);

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
