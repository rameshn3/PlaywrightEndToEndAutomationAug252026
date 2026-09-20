import {test,expect} from '../../fixtures/appFixtures';

test.describe('handle frams', () => {

    test.beforeEach(async ({ herokuAppPage }) => {  
        await herokuAppPage.navigateTo();
        await herokuAppPage.navigateToFrames();// Navigate to the Draganddrop page
    });

    test('handle iframes', async ({ herokuAppPage }) => {
         await herokuAppPage.navigateToiFrames();

       const text= await herokuAppPage.getTextInIFrame();
    
        expect(text).toBe('Your content goes here.');
        //clear the text in the iframe
     
    });

    test('handle normal frames', async ({ herokuAppPage }) => {
        await herokuAppPage.navigateToNestedFrames();
        const middleFrmTxt = await herokuAppPage.getMiddleFrameText();
        expect(middleFrmTxt).toBe('MIDDLE');

    });


});