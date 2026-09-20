import {test,expect} from '../../fixtures/appFixtures';

test.describe('Handle fileupload', () => {
    test.beforeEach(async ({ herokuAppPage }) => {
        await herokuAppPage.navigateTo();
        await herokuAppPage.navigateToFileUpload(); // Navigate to the File Upload page
    });

    test('should upload a single file', async ({ herokuAppPage }) => {
        const fileName = 'checkoutData.csv';
        await herokuAppPage.uploadFile(fileName);
        const uploadedFileName = await herokuAppPage.getUploadedFileName();
        expect(uploadedFileName).toBe(fileName);
    });

    test('should upload multiple files', async ({ herokuAppPage }) => {
        const fileNames = ['checkoutData.csv', 'datadrivenCsvData.csv'];
        await herokuAppPage.uploadMultipleFiles(fileNames);
        const uploadedFileName = await herokuAppPage.getUploadedFileName();
        expect(uploadedFileName).toBe(fileNames.join('\n')); // Verify both file names are displayed
    });
});