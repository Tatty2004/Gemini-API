// export API_KEY = AIzaSyCZVU4WBA9-W7uTAGFosex95I6gaUqVgbc
//npm install @google/generative-ai
let slider = document.getElementById("myRange");
let output = document.getElementById("val");
//let summ = document.getElementById("summaryArea");
            
output.innerHTML = slider.value;
 
slider.oninput = function() {
   output.innerHTML = this.value;
}

document.getElementById("summarize").addEventListener("click", () => {
    document.getElementById("summaryArea").innerHTML = "SUMMARY HERE";
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#input").addEventListener("keydown", function(e) {
      if (e.code === "Enter") {
        let input = inputField.value;
        inputField.value = "";
        output(input);
      }
    });
  });


function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
    text = text
      .replace(/ a /g, " ")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "");
   
    if (compare(utterances, answers, text)) {
      product = compare(utterances, answers, text);
    } 
    else {
      product = alternatives[Math.floor(Math.random() * alternatives.length)];
    }
   
    //update  DOM
    addChatEntry (input, product);
  }
  function addChatEntry(input, product) {
    const messagesContainer = document.getElementById("messages");
    
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.className = "user response";
    userDiv.innerHTML = `${input}`;
    messagesContainer.appendChild(userDiv);
   
    let botDiv = document.createElement("div");
    let botText = document.createElement("span");
    botDiv.id = "bot";
    botDiv.className = "bot response";
    botText.innerText = "Typing...";
    botDiv.appendChild(botText);
    messagesContainer.appendChild(botDiv);
   
                        
   
    setTimeout(() => {
      botText.innerText = `${product}`;
    }, 2000); }