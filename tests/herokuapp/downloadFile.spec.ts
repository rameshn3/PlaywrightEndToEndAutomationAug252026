import {test,expect} from '../../fixtures/appFixtures';

test.describe('Handle downloadFiles', () => {

    test.beforeEach(async ({ herokuAppPage }) => {  
        await herokuAppPage.navigateTo();
        await herokuAppPage.navigateToFileDownload(); // Navigate to the Download page
    });

    test('should download a file', async ({ page, herokuAppPage }) => {
     const download = await herokuAppPage.downloadFile('some-file.txt');

  const path = await download.path();
  //stoe the file in project directory in testdata folder
  await download.saveAs('testdata/some-file.txt');
  console.log('Downloaded file path:', path);
  expect(path).toBeTruthy(); // Verify that the download path is valid
    });

});