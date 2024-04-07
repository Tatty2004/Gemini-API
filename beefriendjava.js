// export API_KEY = AIzaSyCZVU4WBA9-W7uTAGFosex95I6gaUqVgbc
//npm install @google/generative-ai
let slider = document.getElementById("myRange");
let output = document.getElementById("val");
//let summ = document.getElementById("summaryArea");
            
output.innerHTML = slider.value;
 
slider.oninput = function() {
   output.innerHTML = this.value;
}

function clicked() {
   //console.log("Summarizing..."); 
   document.getElementById("summaryArea").innerHTML = "Beefriend:";
                
}