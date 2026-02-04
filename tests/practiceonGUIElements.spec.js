const {test,expect} = require('@playwright/test')

test("GUI Elements Practice", async({browser})=>{

   const context = await  browser.newContext();
   const page = await context.newPage();
   const GUI_Elements = page.getByText("GUI Elements");
   const EnterName = page.getByPlaceholder("Enter Name");
   const EnterEmail = page.getByPlaceholder("Enter EMail");
   const EnterMobileNum = page.getByPlaceholder("Enter Phone");
   const Address = page.getByLabel("Address:");
   const SelectMale = page.getByLabel('Male').first();
   const SelectFemale = page.getByLabel('Female').last();
// launching application URL
   await page.goto("https://testautomationpractice.blogspot.com/");
 // Filling  all the required details  
   await GUI_Elements.click();
   await page.waitForEvent("load");
   await EnterName.fill("Gowri Prabhu Kiran");
   await EnterEmail.fill("test.GPK@getMaxListeners.com");
   await EnterMobileNum.pressSequentially("7865287775");
   await Address.pressSequentially("Gachibowli");
  // check male radio button is selected or not if male is not selected select male else female.
   if(!(await SelectMale.isChecked())){
   await SelectMale.click();
   }
   else{
    await SelectFemale.click();
   }
  // checking alternative days 
  const daysCheckBox = page.locator("div.form-group:nth-of-type(4) input[type='checkbox']");
  const countofdays = await daysCheckBox.count();
  await page.pause();

  for( let i =0; i<countofdays; i+=2){
    await daysCheckBox.nth(i).check();
  }




  

});