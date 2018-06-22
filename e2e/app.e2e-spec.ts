import {browser, by, element} from 'protractor';
import {AppPage} from './app.po';

describe('Page check', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should have right title', () => {
    page.getPageTitle()
      .then((title: string) => {
        expect(title).toEqual('Github repository search');
      });
  });
});

describe('Search bar check', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should navbar display correctly', () => {
    expect(page.getNavBar().isDisplayed()).toBeTruthy();
    page.getNavBarTitle().then((title: string) => {
      expect(title).toEqual('Github repository search');
    });
    expect(page.getNavBarInput().isDisplayed()).toBeTruthy();
    expect(page.getNavBarButton().isDisplayed()).toBeTruthy();
  });

  it('should navbar works correctly', () => {
    const defaultInputValue = page.getNavBarInput().getAttribute('value');
    expect(defaultInputValue).toEqual('bootstrap');

    page.getNavBarButton().click();
    browser.wait(page.getRepositoryBody().isDisplayed(), 15000);

    expect(page.get1000WarningMessage().isDisplayed()).toBeTruthy();
    page.get1000WarningMessageHeader().getText().then((title: string) => {
      expect(title).toEqual('Please, be aware that only the first 1000 search results are available if using Github API!');
    });
  });

});

describe('Repository information section works', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('tabs and lists works correctly after search', () => {
    page.getNavBarButton().click();
    runRepositoryCheck();

    page.getFirstTab().click();
    page.getRepositoryPaginatorInput().clear();
    page.getRepositoryPaginatorInput().sendKeys('2');
    page.getRepositoryPaginatorButton().click();

    runRepositoryCheck();
  });

  function runRepositoryCheck() {
    browser.wait(page.getRepositoryBody().isDisplayed(), 15000);

    page.getFirstTab().getText().then((title: string) => {
      expect(title).toBeDefined();
    });

    // The first tab is the active one
    page.getFirstTab().getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf('active') !== -1).toBeTruthy('first tab class is not active');
    });

    page.getSecondTab().getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf('disabled') !== -1).toBeTruthy('second tab class has not disabled');
    });

    expect(page.getRepositoryPaginator().isDisplayed()).toBeTruthy('No repository paginator displayed');
    expect(page.getRepositoryPaginatorInput().isDisplayed()).toBeTruthy();
    expect(page.getRepositoryPaginatorButton().isDisplayed()).toBeTruthy();

    expect(page.getFirstRepositoryBox().isDisplayed()).toBeTruthy();
    expect(page.getFirstRepositoryBoxChart().isDisplayed()).toBeTruthy();

    page.getFirstSeeMoreDataLink().getText().then((title: string) => {
      expect(title).toEqual('See more data');
    });

    page.getFirstSeeMoreDataLink().click();
    browser.wait(page.getFirstAvatar().isDisplayed(), 15000);

    expect(page.getFirstSeeIssuesButton().isDisplayed).toBeTruthy();
    page.getFirstSeeIssuesButton().click();
    browser.wait(page.getSecondTab().getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf('active') !== -1).toBeTruthy();
    }), 15000);

    expect(page.getIssuePaginator().isDisplayed()).toBeTruthy();
    expect(page.getIssuePaginatorInput().isDisplayed()).toBeTruthy();
    expect(page.getIssuePaginatorButton().isDisplayed()).toBeTruthy();

    expect(page.getFirstIssueLabel().isDisplayed).toBeTruthy();
  }

});

