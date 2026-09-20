# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: herokuapp/fileUpload.spec.ts >> Handle fileupload >> should upload multiple files
- Location: tests/herokuapp/fileUpload.spec.ts:16:9

# Error details

```
Error: locator.setInputFiles: Error: Non-multiple file input can only accept single file
Call log:
  - waiting for locator('#file-upload')
    - locator resolved to <input type="file" name="file" id="file-upload"/>

```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - generic [ref=f1e4]:
    - link "Fork me on GitHub":
      - /url: https://github.com/tourdedave/the-internet
      - img "Fork me on GitHub" [ref=f1e5] [cursor=pointer]
    - generic [ref=f1e7]:
      - heading "File Uploader" [level=3] [ref=f1e8]
      - paragraph [ref=f1e9]: Choose a file on your system and then click upload. Or, drag and drop a file into the area below.
      - generic [ref=f1e10]:
        - button "Choose File" [ref=f1e11]
        - button "Upload" [ref=f1e12] [cursor=pointer]
  - generic [ref=f1e15]:
    - separator [ref=f1e16]
    - generic [ref=f1e17]:
      - text: Powered by
      - link "Elemental Selenium" [ref=f1e18] [cursor=pointer]:
        - /url: http://elementalselenium.com/
```

# Test source

```ts
  1   | import {Locator,Page } from '@playwright/test';
  2   | import { BasePage } from './basePage';
  3   | import path from 'path';
  4   | 
  5   | export class HerokuAppPage extends BasePage {  
  6   |     private javascriptAlertsLink: Locator;
  7   |    
  8   |     constructor(page:Page) {
  9   |         super(page);
  10  |         this.javascriptAlertsLink = page.getByRole('link', { name: 'JavaScript Alerts' });
  11  |     }
  12  | 
  13  |     async navigateToJavaScriptAlerts() {
  14  |         await this.javascriptAlertsLink.click();
  15  |     }
  16  | 
  17  |     async clickSimpleAlertButton() {
  18  |         await this.page.click('button[onclick="jsAlert()"]');
  19  |     }
  20  | 
  21  |     async clickConfirmAlertButton() {
  22  |         await this.page.click('button[onclick="jsConfirm()"]');
  23  |     }
  24  | 
  25  |     async clickPromptAlertButton() {
  26  |         await this.page.click('button[onclick="jsPrompt()"]');
  27  |     }
  28  | 
  29  |     async getResultText() {
  30  |         return this.page.locator('#result').textContent();
  31  |     }
  32  | 
  33  |     //handling multipl windows
  34  |         async navigateToMultipleWindows() {
  35  |         await this.page.getByRole('link', { name: 'Multiple Windows' }).click();                        
  36  |     }
  37  | 
  38  |     async clickClickHereLink() {
  39  |         await this.page.getByRole('link', { name: 'Click Here' }).click();                        
  40  |     }
  41  | 
  42  |     //handling file upload
  43  |     async navigateToFileUpload() {
  44  |         await this.page.getByRole('link', { name: 'File Upload' }).click();                        
  45  |     }
  46  | 
  47  |     //single file upload
  48  |     async uploadFile(fileName: string) {
  49  |         const filePath = path.resolve(`testdata/${fileName}`);
  50  |         const fileInput = this.page.locator('#file-upload');
  51  |         await fileInput.setInputFiles(filePath);
  52  |         await this.page.getByRole('button', { name: 'Upload' }).click();
  53  |     }
  54  | 
  55  |     //multipl file upload
  56  |     async uploadMultipleFiles(fileNames: string[]) {
  57  |         const filePaths = fileNames.map(fileName => path.resolve(`testdata/${fileName}`));
  58  |         const fileInput = this.page.locator('#file-upload');
> 59  |         await fileInput.setInputFiles(filePaths);
      |         ^ Error: locator.setInputFiles: Error: Non-multiple file input can only accept single file
  60  |         await this.page.getByRole('button', { name: 'Upload' }).click();
  61  |     } 
  62  | 
  63  |     async getUploadedFileName() {
  64  |         return (await this.page.locator('#uploaded-files').innerText()).trim();
  65  |     }
  66  | 
  67  |     //file download
  68  |     async navigateToFileDownload() {
  69  |         await this.page.getByRole('link', { name: 'File Download', exact: true }).click();                        
  70  |     }
  71  | 
  72  |    async downloadFile(fileName: string) {
  73  |   const [download] = await Promise.all([
  74  |     this.page.waitForEvent('download'),
  75  |     this.page.getByRole('link', { name: fileName, exact: true }).click()
  76  |   ]);
  77  | 
  78  |   return download;
  79  | }
  80  | 
  81  | //drag and drop
  82  | async navigateToDragAndDrop() {
  83  |     await this.page.getByRole('link', { name: 'Drag and Drop' }).click();                        
  84  | }
  85  | 
  86  | async dragAndDrop() {
  87  |     const source = this.page.locator('#column-a');
  88  |     const target = this.page.locator('#column-b');
  89  |     await source.dragTo(target);
  90  | }
  91  | 
  92  | async getColumnAText() {
  93  |     return this.page.locator('#column-a header').textContent();
  94  | }   
  95  | 
  96  | async getColumnBText() {
  97  |     return this.page.locator('#column-b header').textContent();
  98  | }
  99  | 
  100 | async dragAndDropUsingMouseEvents() {
  101 |     const source = this.page.locator('#column-a');
  102 |     const target = this.page.locator('#column-b');
  103 |    await source.hover();
  104 |    await this.page.mouse.down();
  105 |    await target.hover();
  106 |    await this.page.mouse.up();
  107 | }
  108 | 
  109 | //handle frames
  110 | async navigateToFrames() {
  111 |     await this.page.getByRole('link', { name: 'Frames',exact:true }).click();                        
  112 | }
  113 | 
  114 | async navigateToNestedFrames() {
  115 |     await this.page.getByRole('link', { name: 'Nested Frames',exact:true }).click();                        
  116 | }
  117 | 
  118 | async getMiddleFrameText(): Promise<string | null> {
  119 |    const middleFrame = this.page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-middle"]');
  120 |     return await middleFrame.locator('#content').textContent();
  121 | }
  122 | 
  123 | async navigateToiFrames() {
  124 |     await this.page.getByRole('link', { name: 'iFrame',exact:true }).click();                        
  125 | }
  126 | 
  127 | async getTextInIFrame(): Promise<string|null> {
  128 |     const iframe = this.page.frameLocator('#mce_0_ifr');
  129 |     await this.page.waitForSelector('#mce_0_ifr'); // Wait for the iframe to be available..
  130 |     //click on the close icon
  131 |     const closeButton = this.page.locator('button[class*="tox-notification__dismiss"]');
  132 |     if (await closeButton.isVisible()) {
  133 |         await closeButton.click();
  134 |     }
  135 |     const txt = await iframe.locator('#tinymce').textContent(); 
  136 |     return txt ? txt.trim() : null;// Ensure the text area is loaded before typing.
  137 | }
  138 | 
  139 |    
  140 | async getTextFromIFrame() {
  141 |     const iframe = this.page.frameLocator('#mce_0_ifr');
  142 |     return iframe.locator('#tinymce').textContent();
  143 | }
  144 | 
  145 | //key press
  146 | async navigateToKeyPress() {
  147 |     await this.page.getByRole('link', { name: 'Key Presses' }).click();                        
  148 | }
  149 | 
  150 | async pressKeys(keys: string[]) {
  151 |     for (const key of keys) {
  152 |         await this.page.keyboard.press(key);
  153 |     }   
  154 | }
  155 | 
  156 | async getKeyboardActionResultText() {
  157 |     return this.page.locator('#result').textContent();
  158 | }   
  159 | 
```