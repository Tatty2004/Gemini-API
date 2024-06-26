const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv")
dotenv.config()
const readline = require("readline")

// Access your API key as an environment variable (see "Set up your API key" above) hello bee
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const userInterface = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
})

userInterface.prompt()

userInterface.on("line", async input => {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  

  const result = await model.generateContent(input);
  const response = await result.response;
  const text = response.text();
  console.log(text);
})
//function clicked() {
  //console.log("Summarizing..."); 
  //chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
  // let url = tabs[0].url;
    
  //});
 // document.getElementById("summaryArea").innerHTML = "summary";
  
               
//}