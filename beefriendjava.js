// export API_KEY = AIzaSyCZVU4WBA9-W7uTAGFosex95I6gaUqVgbc
//npm install @google/generative-ai
let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
//let summ = document.getElementById("summaryArea");
            
output.innerHTML = slider.value;
 
slider.oninput = function() {
output.innerHTML = this.value ;
}

function click() {
   // console.log("Summarizing...");
                
}