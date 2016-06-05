import { Ng2meanPage } from './app.po';

describe('ng2mean App', function() {
  let page: Ng2meanPage;

  beforeEach(() => {
    page = new Ng2meanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ng2mean works!');
  });
});
