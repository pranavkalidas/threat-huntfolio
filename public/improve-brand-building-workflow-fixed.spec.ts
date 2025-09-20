import { test, expect } from '@playwright/test';

test.describe('Improve Brand Building Workflow Tests', () => {
  // Increase timeout for complex workflows
  test.setTimeout(120000);

  test('Complete workflow: Login, Search, View, Edit Mode, and Add Analytical Output with Trend Analysis', async ({ page }) => {
    // Step 1: Navigate to the application
    await page.goto('https://eoc.mu-sigma.com/aops/eoc/mu-obi?from=All&sort=4', { 
      waitUntil: 'networkidle',
      timeout: 60000 
    });
    
    // Step 2: Login into the app
    await page.getByRole('textbox', { name: 'Username' }).fill('consumption.user1');
    await page.getByRole('textbox', { name: 'Password' }).fill('Labs@2025');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Wait for navigation after login with longer timeout
    await page.waitForURL('**/mu-obi?from=All&sort=4', { timeout: 30000 });
    
    // Verify login success by checking for user elements
    await expect(page.locator('text=consumption user1')).toBeVisible({ timeout: 15000 });
    
    // Step 3: Search for "Improve Brand Building"
    await page.getByRole('textbox', { name: 'Search Artifacts' }).fill('Improve Brand Building');
    await page.keyboard.press('Enter');
    
    // Wait for search results to load
    await page.waitForURL('**/mu-obi?search=Improve%20Brand%20Building*', { timeout: 15000 });
    
    // Verify search results are displayed
    await expect(page.locator('text=Improve Brand Building').first()).toBeVisible({ timeout: 10000 });
    
    // Step 4: Click on "Improve Brand Building" (first occurrence)
    await page.locator('p:has-text("Improve Brand Building")').first().click();
    
    // Step 5: Click on "View" button (first occurrence)
    await page.locator('strong:has-text("VIEW")').first().click();
    
    // Wait for the page to load
    await page.waitForURL('**/waves?m=0', { timeout: 15000 });
    
    // Step 6: Get the 'View Only' popover button and click on it to get the dropdown
    await page.locator('.modeTitle, [class*="mode"]').filter({ hasText: 'View Only' }).click();
    
    // Step 7: Select the 'Editing Mode'
    await page.locator('text=Editing Mode').click();
    
    // Wait for editing mode to be activated
    await page.waitForURL('**/waves?m=1', { timeout: 15000 });
    
    // Verify we're in editing mode
    await expect(page.locator('text=Editing')).toBeVisible({ timeout: 10000 });
    
    // Step 8: Scroll down to find the "Explore Akasa" section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(2000);
    
    // Step 9: Click on "Explore Akasa" first occurrence
    const exploreAkasaButton = page.locator('text=Explore Akasa').first();
    await expect(exploreAkasaButton).toBeVisible({ timeout: 10000 });
    await exploreAkasaButton.click();
    
    // Wait for the Explore Akasa modal/section to load
    await page.waitForTimeout(3000);
    
    // Step 10: Click on "Add Analytical Output" button
    const addAnalyticalOutputButton = page.locator('text=Add Analytical Output');
    await expect(addAnalyticalOutputButton).toBeVisible({ timeout: 10000 });
    await addAnalyticalOutputButton.click();
    
    // Wait for the analytical output modal to appear
    await page.waitForTimeout(2000);
    
    // Step 11: Look for Trend Analysis and click on it
    const trendAnalysisOption = page.locator('text=Trend Analysis');
    await expect(trendAnalysisOption).toBeVisible({ timeout: 10000 });
    await trendAnalysisOption.click();
    
    // Wait for the selection to be processed
    await page.waitForTimeout(1000);
    
    // Step 12: Click on "D" (Descriptive) option beside Trend Analysis
    // Look for the DIPP options that appear after selecting Trend Analysis
    const descriptiveOption = page.locator('[title="Descriptive"]:has-text("D")').first();
    await expect(descriptiveOption).toBeVisible({ timeout: 5000 });
    await descriptiveOption.click();
    
    // Step 13: Click on "Confirm" button
    const confirmButton = page.locator('button:has-text("Confirm"), button:has-text("Add Analytical Output")').first();
    await expect(confirmButton).toBeVisible({ timeout: 5000 });
    await confirmButton.click();
    
    // Verify the analytical output was added successfully
    await page.waitForTimeout(2000);
    
    // Check if we're back to the main page and the analytical output was added
    await expect(page.locator('text=Trend Analysis')).toBeVisible({ timeout: 10000 });
    
    console.log('✅ Complete workflow test completed successfully!');
  });

  test('Login functionality validation', async ({ page }) => {
    test.setTimeout(60000);
    
    await page.goto('https://eoc.mu-sigma.com/aops/eoc/mu-obi?from=All&sort=4', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Test login with valid credentials
    await page.getByRole('textbox', { name: 'Username' }).fill('consumption.user1');
    await page.getByRole('textbox', { name: 'Password' }).fill('Labs@2025');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Verify successful login by checking for user profile text instead of image
    await expect(page.locator('text=consumption user1')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('text=Mu Sigma')).toBeVisible({ timeout: 5000 });
    
    console.log('✅ Login validation test completed successfully!');
  });

  test('Search functionality for Improve Brand Building', async ({ page }) => {
    test.setTimeout(60000);
    
    // Login first
    await page.goto('https://eoc.mu-sigma.com/aops/eoc/mu-obi?from=All&sort=4', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    await page.getByRole('textbox', { name: 'Username' }).fill('consumption.user1');
    await page.getByRole('textbox', { name: 'Password' }).fill('Labs@2025');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL('**/mu-obi?from=All&sort=4', { timeout: 15000 });
    
    // Test search functionality
    await page.getByRole('textbox', { name: 'Search Artifacts' }).fill('Improve Brand Building');
    await page.keyboard.press('Enter');
    
    // Verify search results - use first() to avoid strict mode violation
    await expect(page.locator('text=Improve Brand Building').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=1 - 5 of 5')).toBeVisible({ timeout: 5000 });
    
    console.log('✅ Search functionality test completed successfully!');
  });

  test('View mode toggle functionality', async ({ page }) => {
    test.setTimeout(90000);
    
    // Login and navigate to the artifact
    await page.goto('https://eoc.mu-sigma.com/aops/eoc/mu-obi?from=All&sort=4', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    await page.getByRole('textbox', { name: 'Username' }).fill('consumption.user1');
    await page.getByRole('textbox', { name: 'Password' }).fill('Labs@2025');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL('**/mu-obi?from=All&sort=4', { timeout: 15000 });
    
    await page.getByRole('textbox', { name: 'Search Artifacts' }).fill('Improve Brand Building');
    await page.keyboard.press('Enter');
    await page.locator('p:has-text("Improve Brand Building")').first().click();
    await page.locator('strong:has-text("VIEW")').first().click();
    
    // Test view mode toggle
    await expect(page.locator('text=View Only')).toBeVisible({ timeout: 10000 });
    
    // Switch to editing mode
    await page.locator('.modeTitle, [class*="mode"]').filter({ hasText: 'View Only' }).click();
    await page.locator('text=Editing Mode').click();
    
    // Verify editing mode is active
    await expect(page.locator('text=Editing')).toBeVisible({ timeout: 10000 });
    await expect(page.url()).toContain('m=1');
    
    console.log('✅ View mode toggle test completed successfully!');
  });

  test('Explore Akasa functionality', async ({ page }) => {
    test.setTimeout(90000);
    
    // Complete login and navigation to editing mode
    await page.goto('https://eoc.mu-sigma.com/aops/eoc/mu-obi?from=All&sort=4', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    await page.getByRole('textbox', { name: 'Username' }).fill('consumption.user1');
    await page.getByRole('textbox', { name: 'Password' }).fill('Labs@2025');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL('**/mu-obi?from=All&sort=4', { timeout: 15000 });
    
    await page.getByRole('textbox', { name: 'Search Artifacts' }).fill('Improve Brand Building');
    await page.keyboard.press('Enter');
    await page.locator('p:has-text("Improve Brand Building")').first().click();
    await page.locator('strong:has-text("VIEW")').first().click();
    await page.locator('.modeTitle, [class*="mode"]').filter({ hasText: 'View Only' }).click();
    await page.locator('text=Editing Mode').click();
    
    // Test Explore Akasa functionality
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(2000);
    
    // Verify Explore Akasa is visible and clickable
    const exploreAkasaButton = page.locator('text=Explore Akasa').first();
    await expect(exploreAkasaButton).toBeVisible({ timeout: 10000 });
    await exploreAkasaButton.click();
    
    // Verify the interaction worked (modal should appear)
    await page.waitForTimeout(2000);
    await expect(page.locator('text=Add Analytical Output')).toBeVisible({ timeout: 10000 });
    
    console.log('✅ Explore Akasa functionality test completed successfully!');
  });
});