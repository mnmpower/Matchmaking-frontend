import { MatchmakingFrontendPage } from './app.po';

describe('matchmaking-frontend App', function() {
  let page: MatchmakingFrontendPage;

  beforeEach(() => {
    page = new MatchmakingFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
