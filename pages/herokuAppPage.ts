import {Locator,Page } from '@playwright/test';
import { BasePage } from './basePage';
import path from 'path';

export class HerokuAppPage extends BasePage {  
    private javascriptAlertsLink: Locator;
   
    constructor(page:Page) {
        super(page);
        this.javascriptAlertsLink = page.getByRole('link', { name: 'JavaScript Alerts' });
    }

    async navigateToJavaScriptAlerts() {
        await this.javascriptAlertsLink.click();
    }

    async clickSimpleAlertButton() {
        await this.page.click('button[onclick="jsAlert()"]');
    }

    async clickConfirmAlertButton() {
        await this.page.click('button[onclick="jsConfirm()"]');
    }

    async clickPromptAlertButton() {
        await this.page.click('button[onclick="jsPrompt()"]');
    }

    async getResultText() {
        return this.page.locator('#result').textContent();
    }

    //handling multipl windows
        async navigateToMultipleWindows() {
        await this.page.getByRole('link', { name: 'Multiple Windows' }).click();                        
    }

    async clickClickHereLink() {
        await this.page.getByRole('link', { name: 'Click Here' }).click();                        
    }

    //handling file upload
    async navigateToFileUpload() {
        await this.page.getByRole('link', { name: 'File Upload' }).click();                        
    }

    //single file upload
    async uploadFile(fileName: string) {
        const filePath = path.resolve(`testdata/${fileName}`);
        const fileInput = this.page.locator('#file-upload');
        await fileInput.setInputFiles(filePath);
        await this.page.getByRole('button', { name: 'Upload' }).click();
    }

    //multipl file upload
    async uploadMultipleFiles(fileNames: string[]) {
        const filePaths = fileNames.map(fileName => path.resolve(`testdata/${fileName}`));
        const fileInput = this.page.locator('#file-upload');
        await fileInput.setInputFiles(filePaths);
        await this.page.getByRole('button', { name: 'Upload' }).click();
    } 

    async getUploadedFileName() {
        return (await this.page.locator('#uploaded-files').innerText()).trim();
    }

    //file download
    async navigateToFileDownload() {
        await this.page.getByRole('link', { name: 'File Download', exact: true }).click();                        
    }

   async downloadFile(fileName: string) {
  const [download] = await Promise.all([
    this.page.waitForEvent('download'),
    this.page.getByRole('link', { name: fileName, exact: true }).click()
  ]);

  return download;
}

//drag and drop
async navigateToDragAndDrop() {
    await this.page.getByRole('link', { name: 'Drag and Drop' }).click();                        
}

async dragAndDrop() {
    const source = this.page.locator('#column-a');
    const target = this.page.locator('#column-b');
    await source.dragTo(target);
}

async getColumnAText() {
    return this.page.locator('#column-a header').textContent();
}   

async getColumnBText() {
    return this.page.locator('#column-b header').textContent();
}

async dragAndDropUsingMouseEvents() {
    const source = this.page.locator('#column-a');
    const target = this.page.locator('#column-b');
   await source.hover();
   await this.page.mouse.down();
   await target.hover();
   await this.page.mouse.up();
}

//handle frames
async navigateToFrames() {
    await this.page.getByRole('link', { name: 'Frames',exact:true }).click();                        
}

async navigateToNestedFrames() {
    await this.page.getByRole('link', { name: 'Nested Frames',exact:true }).click();                        
}

async getMiddleFrameText(): Promise<string | null> {
   const middleFrame = this.page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-middle"]');
    return await middleFrame.locator('#content').textContent();
}

async navigateToiFrames() {
    await this.page.getByRole('link', { name: 'iFrame',exact:true }).click();                        
}

async getTextInIFrame(): Promise<string|null> {
    const iframe = this.page.frameLocator('#mce_0_ifr');
    await this.page.waitForSelector('#mce_0_ifr'); // Wait for the iframe to be available..
    //click on the close icon
    const closeButton = this.page.locator('button[class*="tox-notification__dismiss"]');
    if (await closeButton.isVisible()) {
        await closeButton.click();
    }
    const txt = await iframe.locator('#tinymce').textContent(); 
    return txt ? txt.trim() : null;// Ensure the text area is loaded before typing.
}

   
async getTextFromIFrame() {
    const iframe = this.page.frameLocator('#mce_0_ifr');
    return iframe.locator('#tinymce').textContent();
}

//key press
async navigateToKeyPress() {
    await this.page.getByRole('link', { name: 'Key Presses' }).click();                        
}

async pressKeys(keys: string[]) {
    for (const key of keys) {
        await this.page.keyboard.press(key);
    }   
}

async getKeyboardActionResultText() {
    return this.page.locator('#result').textContent();
}   

async typeText(text: string) {
    await this.page.locator('#target').click(); // Clear the input field before typing
await this.page.keyboard.type(text);
}

async keyboardShortcutExample() {
      await this.page.locator('#target').click();
      await this.page.keyboard.type('Hello, World!');
      //CTRL +A
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('KeyA');
        await this.page.keyboard.up('Control');
        //CTRL +C
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('KeyC');
        await this.page.keyboard.up('Control');
        //CTRL +V
        await this.page.keyboard.down('Control');   
        await this.page.keyboard.press('KeyV');
        await this.page.keyboard.up('Control');

       //usng press method
        await this.page.locator('#target').click();
        await this.page.keyboard.type('Hello, World!');
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Control+C');
        await this.page.keyboard.press('Control+V');
    }

}