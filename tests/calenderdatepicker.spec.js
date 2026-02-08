const { test, expect } = require('@playwright/test');

test("calendar date picker", async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  // ===== Test data =====
  const targetMonthAndYear = "May 2026";
  const targetDate = "1";

  // ===== Locators =====
  const datePicker = page.locator('#datepicker').first();
  const calendarHeader = page.locator('.ui-datepicker-title');
  const nextMonth = page.locator('.ui-datepicker-next');
  const prevMonth = page.locator('.ui-datepicker-prev');

  // ===== Launch app =====
  await page.goto('https://testautomationpractice.blogspot.com/');
  await datePicker.click();

  // ===== Helper =====
  function toDate(monthYear) {
    return new Date(`${monthYear} 1`);
  }

  // ===== Calendar navigation =====
  let attempts = 0;
await page.pause();
  while (attempts < 24) {
    const rawText = await calendarHeader.textContent();
    if (!rawText) throw new Error('Calendar header not found');

    const displayedMonth = rawText.replace(/\s+/g, ' ').trim();

    // If month matches → select date and exit
    if (displayedMonth === targetMonthAndYear) {
      await page
        .locator('.ui-state-default').last()
        .filter({ hasText: new RegExp(`^${targetDate}$`) })
        .click();
      break;
    }

    // Compare months properly
    const displayedDate = toDate(displayedMonth);
    const targetDateObj = toDate(targetMonthAndYear);

    if (targetDateObj < displayedDate) {
      await prevMonth.click();   // go backward
    } else {
      await nextMonth.click();   // go forward
    }

    attempts++;
  }

  // ===== Safety check =====
  expect(attempts).toBeLessThan(24);

});
