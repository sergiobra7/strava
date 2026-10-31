const {test,expect}=require('@playwright/test');
test.use({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
async function openStudio(page){
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/test/index.html?v=ci',{waitUntil:'domcontentloaded'});
 await page.locator('[data-world="sign"]').click();
 console.log('NAV DIAG',await page.evaluate(()=>({world:state.world,tab:state.tab,tabs:document.querySelector('#tabs')?.innerText,view:document.querySelector('#view')?.innerText.slice(0,250)})),errors.slice(0,5));
 await page.locator('#tabs [data-tab="Plakat"]').click({timeout:3000});
 await expect(page.locator('#signStudio')).toBeVisible();
 return errors;
}
test('all primary tabs and studio load without exceptions',async({page})=>{
 const errors=await openStudio(page);
 const tabs=await page.locator('#tabs [data-tab]').allTextContents();
 expect(tabs.slice(0,5)).toEqual(['Smart Director','Plakat','Hauptfigur','Kamera & Ort','Prompt']);
 await expect(page.locator('#studioPoster')).toBeVisible();
 expect(errors).toEqual([]);
});
test('multi-select colors, deselect, reset, and prompt serialization',async({page})=>{
 const errors=await openStudio(page);
 await page.locator('#studioText').fill('ROT ROT\nBLAU');
 await page.locator('#studioWords [data-token="0"]').click();
 await page.locator('#studioWords [data-token="4"]').click();
 await page.locator('#studioColors [data-color="#FF0000"]').click();
 await expect(page.locator('#studioPoster [data-token="0"]')).toHaveCSS('color','rgb(255, 0, 0)');
 await expect(page.locator('#studioPoster [data-token="4"]')).toHaveCSS('color','rgb(255, 0, 0)');
 await expect(page.locator('#studioPoster [data-token="2"]')).toHaveCSS('color','rgb(255, 255, 255)');
 const prompt=await page.evaluate(()=>buildPrompt());
 expect(prompt).toContain('[1|ROT|#FF0000]');
 expect(prompt).toContain('[2|ROT|#FFFFFF]');
 expect(prompt).toContain('[3|BLAU|#FF0000]');
 await page.locator('#studioWords [data-token="0"]').click();
 await page.locator('#studioResetSelected').click();
 await expect(page.locator('#studioPoster [data-token="4"]')).toHaveCSS('color','rgb(255, 255, 255)');
 await expect(page.locator('#studioPoster [data-token="0"]')).toHaveCSS('color','rgb(255, 0, 0)');
 await page.locator('#studioClear').click();
 await expect(page.locator('#studioWords [aria-pressed="true"]')).toHaveCount(0);
 await page.locator('#studioResetAll').click();
 await expect(page.locator('#studioPoster [data-token="0"]')).toHaveCSS('color','rgb(255, 255, 255)');
 expect(errors).toEqual([]);
});
test('font alignment, save, reload and color prompt',async({page})=>{
 const errors=await openStudio(page);
 await page.locator('#studioText').fill('EINS ZWEI\nDREI');
 await page.locator('#studioFont').selectOption('oswald');
 await page.locator('#studioAlign').selectOption('left');
 await page.locator('#studioWords [data-token="2"]').click();
 await page.locator('#studioColors [data-color="#FFFF00"]').click();
 let prompt=await page.evaluate(()=>buildPrompt());
 expect(prompt).toContain('Typeface Oswald Condensed');
 expect(prompt).toContain('Text alignment LEFT');
 expect(prompt).toContain('[2|ZWEI|#FFFF00]');
 await page.reload();
 await page.locator('#tabs [data-tab="Plakat"]').click();
 await expect(page.locator('#studioText')).toHaveValue('EINS ZWEI\nDREI');
 await expect(page.locator('#studioFont')).toHaveValue('oswald');
 await expect(page.locator('#studioAlign')).toHaveValue('left');
 await expect(page.locator('#studioPoster [data-token="2"]')).toHaveCSS('color','rgb(255, 255, 0)');
 expect(errors).toEqual([]);
});

test('direct preview selection and custom colors survive tab switches',async({page})=>{
 const errors=await openStudio(page);
 await page.locator('#studioText').fill('LAUFEN GEHT\nGEHT WEITER');
 await page.locator('#studioPoster [data-token="0"]').click();
 await page.locator('#studioPoster [data-token="4"]').click();
 await expect(page.locator('#studioWords [aria-pressed="true"]')).toHaveCount(2);
 await page.locator('#studioCustom').fill('#aa22bb');
 await expect(page.locator('#studioPoster [data-token="0"]')).toHaveCSS('color','rgb(170, 34, 187)');
 await expect(page.locator('#studioPoster [data-token="4"]')).toHaveCSS('color','rgb(170, 34, 187)');
 await page.locator('#tabs [data-tab="Hauptfigur"]').click();
 await page.locator('#tabs [data-tab="Plakat"]').click();
 await expect(page.locator('#studioPoster [data-token="0"]')).toHaveCSS('color','rgb(170, 34, 187)');
 const prompt=await page.evaluate(()=>buildPrompt());
 expect(prompt).toContain('[1|LAUFEN|#AA22BB]');
 expect(prompt).toContain('[3|GEHT|#AA22BB]');
 expect(errors).toEqual([]);
});
test('empty lines and text changes keep correct prompt positions',async({page})=>{
 const errors=await openStudio(page);
 await page.locator('#studioText').fill('ROT WEISS\n\nBLAU');
 await page.locator('#studioPoster [data-token="4"]').click();
 await page.locator('#studioColors [data-color="#00AAFF"]').click();
 const prompt=await page.evaluate(()=>buildPrompt());
 expect(prompt).toContain('LINE 2: [EMPTY]');
 expect(prompt).toContain('LINE 3: [3|BLAU|#00AAFF]');
 await page.locator('#studioText').fill('ROT WEISS\n\nBLAU GRUEN');
 await expect(page.locator('#studioPoster [data-token="4"]')).toHaveCSS('color','rgb(0, 170, 255)');
 expect(errors).toEqual([]);
});
test('Prompt tab displays current colors and copy control',async({page})=>{
 const errors=await openStudio(page);
 await page.locator('#studioText').fill('SCHNELL LANGSAM');
 await page.locator('#studioWords [data-token="0"]').click();
 await page.locator('#studioColors [data-color="#FF0000"]').click();
 await page.locator('#tabs [data-tab="Prompt"]').click();
 await expect(page.locator('#restoredPromptText')).toBeVisible();
 await expect(page.locator('#restoredPromptText')).toHaveValue(/\[1\|SCHNELL\|#FF0000\]/);
 await expect(page.locator('#restoredPromptCopy')).toBeVisible();
 expect(errors).toEqual([]);
});

test('Turkish letters preserve word identity, colors, and reload export',async({page})=>{
 const errors=await openStudio(page);
 await page.locator('#studioText').fill('İĞÜŞÖÇ ıgüşöç\nÇAĞRI TÜRKİYE');
 await page.locator('#studioWords [data-token="0"]').click();
 await page.locator('#studioWords [data-token="4"]').click();
 await page.locator('#studioColors [data-color="#FF0000"]').click();
 await expect(page.locator('#studioPoster [data-token="0"]')).toHaveText('İĞÜŞÖÇ');
 await expect(page.locator('#studioPoster [data-token="4"]')).toHaveCSS('color','rgb(255, 0, 0)');
 await page.reload();
 await page.locator('#tabs [data-tab="Plakat"]').click();
 await expect(page.locator('#studioText')).toHaveValue('İĞÜŞÖÇ ıgüşöç\nÇAĞRI TÜRKİYE');
 const prompt=await page.evaluate(()=>buildPrompt());
 expect(prompt).toContain('[1|İĞÜŞÖÇ|#FF0000]');
 expect(prompt).toContain('[3|ÇAĞRI|#FF0000]');
 expect(errors).toEqual([]);
});
