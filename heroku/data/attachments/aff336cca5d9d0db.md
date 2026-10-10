# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: herokuapp/handlesFrames.spec.ts >> handle frams >> handle iframes
- Location: tests/herokuapp/handlesFrames.spec.ts:10:9

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

# Test source

```ts
  1  | import {test,expect} from '../../fixtures/appFixtures';
  2  | 
  3  | test.describe('handle frams', () => {
  4  | 
> 5  |     test.beforeEach(async ({ herokuAppPage }) => {  
     |          ^ Test timeout of 30000ms exceeded while running "beforeEach" hook.
  6  |         await herokuAppPage.navigateTo();
  7  |         await herokuAppPage.navigateToFrames();// Navigate to the Draganddrop page
  8  |     });
  9  | 
  10 |     test('handle iframes', async ({ herokuAppPage }) => {
  11 |          await herokuAppPage.navigateToiFrames();
  12 | 
  13 |        const text= await herokuAppPage.getTextInIFrame();
  14 |     
  15 |         expect(text).toBe('Your content goes here.');
  16 |         //clear the text in the iframe
  17 |      
  18 |     });
  19 | 
  20 |     test('handle normal frames', async ({ herokuAppPage }) => {
  21 |         await herokuAppPage.navigateToNestedFrames();
  22 |         const middleFrmTxt = await herokuAppPage.getMiddleFrameText();
  23 |         expect(middleFrmTxt).toBe('MIDDLE');
  24 | 
  25 |     });
  26 | 
  27 | 
  28 | });
```