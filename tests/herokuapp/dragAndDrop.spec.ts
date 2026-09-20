import {test,expect} from '../../fixtures/appFixtures';

test.describe('drag and drop scenario', () => {

    test.beforeEach(async ({ herokuAppPage }) => {  
        await herokuAppPage.navigateTo();
        await herokuAppPage.navigateToDragAndDrop(); // Navigate to the Draganddrop page
    });

    test('should drag source to target', async ({ herokuAppPage }) => {
         await herokuAppPage.dragAndDrop();

        const sourceText = await herokuAppPage.getColumnAText();
        const targetText = await herokuAppPage.getColumnBText();
        expect(sourceText).toBe('B');
        expect(targetText).toBe('A');

    });

    test('should drag and drop using mouse events', async ({ herokuAppPage }) => {
        await herokuAppPage.dragAndDropUsingMouseEvents();
            const sourceText = await herokuAppPage.getColumnAText();
        const targetText = await herokuAppPage.getColumnBText();
        expect(sourceText).toBe('B');
        expect(targetText).toBe('A');

    });


});