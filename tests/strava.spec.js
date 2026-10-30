const { test, expect } = require('@playwright/test');
test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
test('app loads and all primary tabs remain responsive', async ({ page }) => {
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/index.html');
 await expect(page.locator('#tabs')).toBeVisible();
 const tabs=await page.locator('#tabs [data-tab]').allTextContents();
 expect(tabs.length).toBeGreaterThan(5);
 for(const tab of tabs){
  await page.locator('#tabs [data-tab]').filter({hasText:tab}).first().click();
  await expect(page.locator('#view')).toBeVisible();
  await expect(page.locator('#tabs [data-tab].active')).toHaveCount(1);
 }
 expect(errors).toEqual([]);
});
test('live sign colors match serialized prompt colors after text edits', async ({ page }) => {
 await page.goto('http://127.0.0.1:8765/index.html');
 const result=await page.evaluate(()=>{
  const sign={signText:'ROT WEISS\n\nBLAU',wordColors:{0:'#ff3434',2:'#ffffff',4:'#00aaff'}};
  const x=window.stravaSignColorMap318(sign);
  if(!x.lines.includes('LINE 2: [EMPTY]'))throw Error('missing empty line');
  if(x.words[2].color!=='#00AAFF')throw Error('wrong color');
  const check=window.stravaColorAudit318(sign);
  if(!check.pass)throw Error('invalid audit');
  return {words:x.words.length,lines:x.lines.split('\n').length};
 });
 expect(result).toEqual({words:3,lines:3});
});
test('prompt generation and Premium filter audit do not throw',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/index.html');
 const result=await page.evaluate(()=>{
  const audit=window.stravaPremiumFilterAudit3166?.();
  if(audit&&audit.issues.length)throw Error('Premium filter failures: '+JSON.stringify(audit.issues.slice(0,3)));
  const output=buildPrompt();
  if(!output||!output.trim())throw Error('Empty prompt');
  return {size:output.length,auditTests:audit?.tested||0};
 });
 expect(result.size).toBeGreaterThan(100);
 expect(errors).toEqual([]);
});
