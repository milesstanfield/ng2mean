export class Ng2meanPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ng2mean-app h1')).getText();
  }
}
