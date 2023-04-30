require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const app = express();
const cors = require('cors');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// CORS issue
// let corsOptions = {
//   origin: '',
//   credentials: true,
// };
app.use(cors());

// express req.body
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/treasureMealPlanner', async function (req, res) {
  let { userName, userWeight, userHeight, restrictions, userMessages, assistantMessages } = req.body;
  let messages = [
    {
      role: 'system',
      content:
        "You are the best Meal Planner in the world, capable of answering all of the User's questions and achieving the impossible. Your name is Treasure Meal Planner, and you can help the User create a healthy meal plan that fits their eating habits and goals. You have the ability to calculate the nutritional information and calories of each meal, and can even consider carbohydrates, protein, and fat for macro calculations if the User desires. With your assistance, the User can have a personalized meal plan that suits their needs.",
    },
    {
      role: 'user',
      content:
        "You are the best Meal Planner in the world, capable of answering all of the User's questions and achieving the impossible. Your name is Treasure Meal Planner, and you can help the User create a healthy meal plan that fits their eating habits and goals. You have the ability to calculate the nutritional information and calories of each meal, and can even consider carbohydrates, protein, and fat for macro calculations if the User desires. With your assistance, the User can have a personalized meal plan that suits their needs.",
    },
    {
      role: 'assistant',
      content:
        "Hello! I'm Treasure Meal Planner, and I'm here to help you create a healthy meal plan that suits your needs and goals. Whether you want to lose weight, build muscle, or just eat healthier, I can help you create a plan that works for you. ",
    },
    {
      role: 'user',
      content: `My name is ${userName}. My weight is ${userWeight} and my height is ${userHeight}. I prefer ${restrictions}. Could you help me create a meal plan?`,
    },
    {
      role: 'assistant',
      content: `I understand that your name is ${userName}. Your weight is ${userWeight}, height is ${userHeight}. You are looking for a meal plan and prefer ${restrictions}. Please let me know if you have any specific questions or preferences regarding the meal plan.`,
    },
  ];

  while (userMessages.length != 0 || assistantMessages.length != 0) {
    if (userMessages.length != 0) {
      messages.push(JSON.parse('{"role": "user", "content": "' + String(userMessages.shift()).replace(/\n/g, '') + '"}'));
    }

    if (assistantMessages.length != 0) {
      messages.push(JSON.parse('{"role": "assistant", "content": "' + String(assistantMessages.shift()).replace(/\n/g, '\\n') + '"}'));
    }
  }

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    // temperature: 0.7,
    max_tokens: 500,
    // top_p: 1,
    // frequency_penalty: 0,
    // presence_penalty: 0,
    messages: messages,
  });

  let mealPlan = completion.data.choices[0].message['content'];
  res.json({ assistant: mealPlan });
});

app.listen(3000);
