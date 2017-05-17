import { CountersAppPage } from './app.po';

describe('counters-app App', function() {
  let page: CountersAppPage;

  beforeEach(() => {
    page = new CountersAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
