const cheerio = require('cheerio');

// Access your API key as an environment variable (see "Set up your API key" above)
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

const url = "https://www.bbc.com/news/world-us-canada-68947042";

const slider = document.getElementById("myRange");
const valueDisplay = document.getElementById("valueDisplay");

valueDisplay.textContent = slider.value;

slider.addEventListener('input', function() {
  valueDisplay.textContent = this.value; 
});

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
    const $ = await fetchHTML(url);
    const bodyText = $('body').text().trim();

    console.log(truncateText(bodyText.trim()));
    return truncateText(bodyText.trim());
}

// prompts Gemini API with text from website
async function generateSummary() {
    document.getElementById("statusMessage").textContent = " ";
    const model = genAI.getGenerativeModel({ model: "gemini-pro", safety_settings: settings});

    const bodyText = await getBodyText(url);
    const prompt = "Summarize the text on this website. Ignore all unimportant information." + bodyText;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    document.getElementById("summaryArea").textContent = text;
}

const element = document.getElementById("summarize");
element.addEventListener("click", function() {
  // 1. Show the "Summarizing..." message
  document.getElementById("statusMessage").textContent = "Summarizing...";

  // 2. Call your existing summarization function
  generateSummary();  
});