const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
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

const url = "https://www.washingtonpost.com/opinions/2024/05/02/campus-protests-israel-democrats-gaza/";

// keeps input below 32k tokens
function truncateText(text, maxLength = 75000) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...'; // Add ellipsis to indicate truncation
  } else {
    return text;
  }
}

async function getBodyText(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const html = await page.content();
    await browser.close();

    // Cheerio on the entire HTML
    const $ = cheerio.load(html);
    let targetedText = '';

    $('p').each((_, element) => {
      targetedText += $(element).text().trim() + '\n'; 
    });

    return truncateText(targetedText); 
  }
  catch (error) {
    console.error("An error occurred while fetching text:", error);
  }
  
}


// prompts Gemini API with text from website
async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro", safety_settings: settings});

  const bodyText = await getBodyText(url);
  const prompt = "Summarize the text on this website. Ignore all unimportant information." + bodyText;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log('\n' + text);
}

run();