const url = "https://www.dailyprincetonian.com/article/2024/05/princeton-opinion-column-keep-final-exam-schedule-mental-health-dolan";


const cheerio = require('cheerio');
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const dotenv = require("dotenv");
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// set safety settings
settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_LOW"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_LOW"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_LOW"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_LOW"
  },
]

// keeps input below 32k tokens
function truncateText(text, maxLength = 75000) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...'; // Add ellipsis to indicate truncation
  } else {
    return text;
  }
}

// fetches HTML
async function fetchHTML(url) {
    const { data } = await axios.get(url);
    return cheerio.load(data);
}

// calls fetchHTML
async function getBodyText(url) {
    console.log("\nSummarizing...\n");
    const $ = await fetchHTML(url);
    const bodyText = $('body').text().trim();
    return truncateText(bodyText.trim());
}

// prompts Gemini API with text from website
async function generateSummary() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro", safety_settings: settings});

    const bodyText = await getBodyText(url);
    const prompt = "Summarize the text on this website. Ignore all unimportant information." + bodyText;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log(response.text().trim());
}

generateSummary()
