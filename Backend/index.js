const { Configuration, OpenAIApi } = require('openai');
const OPENAI_API_KEY = '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';

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function apiCall() {
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'Hello world',
  });
  console.log(completion.data.choices[0].text);
}

apiCall();
