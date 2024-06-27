const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyCxQoJfIaFajlgVHNIW3rqYBkHikfpZ1w0');

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = "Write an email description in 200 words."
"you are HR manager of Google. you have to right the mail to congratulate the recipient on being short listed. Write that your 'resume has been shortlisted. Fill the info in the given link.' Appreciate the recipient on their skills." 
"The position name is: SDE-2"
"Reciever's name: add designation here like 'Sir/madam'"
"skills to appreciate: Full stack development knowledge, communication skills"
"Date: '28/06/24'."
"Senders name: Christina Cian"
"the tone should be formal.   "

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run(); 