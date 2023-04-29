// User Input
const userName = document.querySelector('#user-input');
const numDays = document.querySelector('#days-input');
const userAge = document.querySelector('#age-input');
const userWeight = document.querySelector('#weight-input');
const userHeight = document.querySelector('#height-input');
const calories = document.querySelector('#calories-input');
const restrictions = document.querySelector('#restrictions-input');

const chatBox = document.querySelector('.chat-box');
const chatForm = document.querySelector('.chat-inputarea');
const chatInput = document.querySelector('.chat-input');
let userMessages = [];
let assistantMessages = [];

const sendMessage = async function (event) {
  event.preventDefault();

  const chatText = chatInput.value;
  if (!chatText) return;

  appendMessage(userName.value, 'right', chatText);
  chatInput.value = '';

  const response = await fetch('http://localhost:3000/treasureMealPlanner', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName: userName,
      numDays: numDays,
      userAge: userAge,
      userWeight: userWeight,
      userHeight: userHeight,
      calories: calories,
      restrictions: restrictions,
      userMessages: userMessages,
      assistantMessages: assistantMessages,
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
  assistantMessages.push(data.assistant);
};

chatForm.addEventListener('submit', sendMessage);

// functions
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
  userMessages.push(chatInput.value);
}

function submit() {
  if (userName.value === '') {
    alert('Enter your name');
  } else {
    document.querySelector('.home-page').style.display = 'none';
    document.querySelector('.chat-container').style.display = 'flex';
  }
}
