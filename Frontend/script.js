const chatBox = document.querySelector('.chat-box');
const chatForm = document.querySelector('.chat-inputarea');
const chatInput = document.querySelector('.chat-input');
let userMessages = [];
let assistantMessages = [];

const sendMessage = async function (event) {
  event.preventDefault();

  const chatText = chatInput.value;
  if (!chatText) return;

  appendMessage('User', 'right', chatText);

  const response = await fetch('http://localhost:3000/treasureMealPlanner', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: chatInput.value,
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
  userMessages.push(chatInput.value);
}
