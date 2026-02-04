const {test,expect}=require('@playwright/test');

test("launch practice test application ", async({browser})=>{

   const context = await  browser.newContext();
   const page = await context.newPage();
   await page.goto("https://testautomationpractice.blogspot.com/");
   const pageTitle = await page.title();
   console.log(pageTitle);
   await expect(pageTitle).toBe("Automation Testing Practice")
   
})