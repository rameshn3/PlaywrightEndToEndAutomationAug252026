import {test,expect} from '../../fixtures/appFixtures';

test.describe('Handle Alerts', () => {

    test.beforeEach(async ({ herokuAppPage }) => {
        await herokuAppPage.navigateTo();
          await herokuAppPage.navigateToJavaScriptAlerts(); // Navigate to the JavaScript Alerts page
    });

    test('should handle simple alert', async ({page,herokuAppPage }) => {
      
        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toBe('I am a JS Alert');
            await dialog.accept();
        }
        );
        await herokuAppPage.clickSimpleAlertButton();
       const result = await herokuAppPage.getResultText();
        expect(result).toBe('You successfully clicked an alert');
    });

    test('should handle confirm alert', async ({page, herokuAppPage }) => {
        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('confirm');
            expect(dialog.message()).toBe('I am a JS Confirm');
            await dialog.accept();
        });
        await herokuAppPage.clickConfirmAlertButton();
        const result = await herokuAppPage.getResultText();
        expect(result).toBe('You clicked: Ok');
    });

    test('should handle confirm alert with cancel', async ({page, herokuAppPage }) => {
       page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('confirm');
            expect(dialog.message()).toBe('I am a JS Confirm');
            await dialog.dismiss();
        }   
        );
        await herokuAppPage.clickConfirmAlertButton();
        const result = await herokuAppPage.getResultText();
        expect(result).toBe('You clicked: Cancel');
    });

    test('should handle prompt alert', async ({page, herokuAppPage }) => {
        const promptInput = 'Playwright Test';
       page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('prompt');
            expect(dialog.message()).toBe('I am a JS prompt');
            await dialog.accept(promptInput);
        });
        await herokuAppPage.clickPromptAlertButton();
        const result = await herokuAppPage.getResultText();
        expect(result).toBe(`You entered: ${promptInput}`);
    });

    test('should handle prompt alert with cancel', async ({page, herokuAppPage }) => {
        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('prompt');
            expect(dialog.message()).toBe('I am a JS prompt');
            await dialog.dismiss();
        }); 
        await herokuAppPage.clickPromptAlertButton();
        const result = await herokuAppPage.getResultText();
        expect(result).toBe('You entered: null');
    });

});