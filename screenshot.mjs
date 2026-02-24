import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  // Wait a bit for images and animations
  await page.waitForTimeout(2000);
  
  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  
  // Screenshot the footer
  const footer = await page.locator('footer');
  
  // Ensure directory exists
  const evidenceDir = path.join(process.cwd(), '.sisyphus', 'evidence');
  if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
  }
  
  await footer.screenshot({ path: path.join(evidenceDir, 'task-8-footer-icons.png') });
  
  await browser.close();
  console.log('Screenshot taken!');
})();
