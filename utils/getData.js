const puppeteer = require("puppeteer");
const getData = async (url) => {
  try {
    //Headless browser başlatma
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });
    const page = await browser.newPage(); //Browserda yeni sayfa oluşturma
    await page.goto(url); //Oluşan yeni sayfa verilen apiye gider
    const dataAsText = await page.evaluate(() => {
      // Apiden gelen veriyi text olarak alır
      return document.querySelector("body pre").innerText;
    });
    const dataAsJson = await JSON.parse(dataAsText); //Text veriyi json formatına dönüştürür
    await browser.close(); //Browserımızı kapatır
    return dataAsJson; //Json verimizi döner
  } catch (error) {
    return null;
  }
};
module.exports = getData;
