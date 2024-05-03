const puppeteer = require('puppeteer');

async function testPuppeteer() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://cocomelon.com/'); // Your WP article URL

  // Simple check
  const articleTitle = await page.$eval('h1', el => el.textContent); 
  console.log(articleTitle);

  await browser.close();
}

testPuppeteer();


// async function getBodyText(url) {
//     const $ = await fetchHTML(url);

//     let targetedText = '';

//     // Target the article content container
//     $('.article-content').each((_, container) => { 
//         $(container).find('p, h1, h2, h3, h4, h5, h6').each((_, element) => { 
//           targetedText += $(element).text().trim() + '\n'; 
//         });
//       });

//     console.log(targetedText);
//     return targetedText.trim();
// }

// async function getBodyText(url) {
//   const $ = await fetchHTML(url);

//   let targetedText = '';

//   // Iterate through h1 elements first
//   $('h1').each((_, element) => {
//     targetedText += $(element).text().trim() + '\n\n';
//     console.log(targetedText); 
//   });

//   // Then iterate through p elements
//   console.log($('p').length);
//   $('p').each((_, element) => {
//     targetedText += $(element).text().trim() + '\n';
//     //console.log(targetedText + '\n');
//   });

//   return targetedText.trim();
// }