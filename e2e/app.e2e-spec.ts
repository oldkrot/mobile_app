import { MobileAppPage } from './app.po';

describe('mobile-app App', () => {
  let page: MobileAppPage;

  beforeEach(() => {
    page = new MobileAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
