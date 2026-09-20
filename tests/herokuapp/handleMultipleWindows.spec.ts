import {test,expect} from '../../fixtures/appFixtures';

test.describe('Handle Multiple Windows', () => {

    test.beforeEach(async ({ herokuAppPage }) => {
        await herokuAppPage.navigateTo();
        await herokuAppPage.navigateToMultipleWindows(); // Navigate to the Multiple Windows page
    });

    test('should handle multiple windows', async ({ page, herokuAppPage }) => {
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'), // Wait for the new window to open
            herokuAppPage.clickClickHereLink() // Click the link that opens a new window
        ]);

        await newPage.waitForLoadState(); // Wait for the new page to load
        expect(newPage.url()).toBe('https://the-internet.herokuapp.com/windows/new');
        expect(await newPage.textContent('h3')).toBe('New Window'); // Verify content in the new window

        await newPage.close(); // Close the new window

        //verify we are back to the original page. and verify the heading-Opening a new window
        expect(await page.locator('#content>div>h3').textContent()).toBe('Opening a new window');

    });

});