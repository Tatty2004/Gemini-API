const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable 
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

// Get HTML using Chrome APIs
async function fetchHTML() {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (activeTab) {
    return new Promise((resolve, reject) => {
        chrome.tabs.executeScript(activeTab.id, {
            code: 'document.documentElement.outerHTML' 
        }, (results) => {
        if (chrome.runtime.lastError) {
          reject(Error(chrome.runtime.lastError.message));
        } else {
          resolve(results[0]);
        }
      });
    });
  } else {
    throw Error("No active tab found");
  }
}

// Prompts Gemini API (modified)
async function generateSummary() {
  document.getElementById("statusMessage").textContent = " "; 
  const model = genAI.getGenerativeModel({ model: "gemini-pro", safety_settings: settings});

  const rawHTML = await fetchHTML();  
  const prompt = "Summarize the text on this website. Ignore all unimportant information." + truncateText(rawHTML);

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