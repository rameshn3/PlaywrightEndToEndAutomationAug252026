import { test, expect } from '../../fixtures/appFixtures';

test.describe('Key board action scenario', () => {

    test.beforeEach(async ({ herokuAppPage }) => {
        await herokuAppPage.navigateTo();
        await herokuAppPage.navigateToKeyPress(); // Navigate to the Draganddrop page
    });

    test('keyboard actions', async ({ herokuAppPage }) => {

        const keyMap = [
            { key: 'Enter', expected: 'ENTER' },
            { key: 'Tab', expected: 'TAB' },
            { key: 'Escape', expected: 'ESCAPE' },
            { key: 'ArrowDown', expected: 'DOWN' }
        ];

        for (const item of keyMap) {

            await herokuAppPage.pressKeys([item.key]);

            const resultText =
                await herokuAppPage.getKeyboardActionResultText();

            await expect(resultText).toBe(`You entered: ${item.expected}`);
        }
    });

    test('should combination of keys', async ({ herokuAppPage }) => {
        await herokuAppPage.keyboardShortcutExample();

    });

});