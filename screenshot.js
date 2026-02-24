const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000/support', { waitUntil: 'networkidle' });
    await page.screenshot({ path: '.sisyphus/evidence/task-6-hover-states.png', fullPage: true });
    console.log('Screenshot taken successfully');
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    await browser.close();
  }
})();
