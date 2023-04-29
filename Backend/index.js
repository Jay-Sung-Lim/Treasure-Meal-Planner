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
  let { userMessages, assistantMessages } = req.body;
  console.log(userMessages);
  console.log(assistantMessages);
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
      content: 'Can you help me my diet?',
    },
  ];

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
