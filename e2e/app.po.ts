import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getPageTitle() {
    return browser.getTitle();
  }

  getNavBar() {
    return element(by.tagName('app-navbar'));
  }

  getNavBarTitle() {
    return element(by.css('#content > app-navbar > div > nav > a')).getText();
  }

  getNavBarInput() {
    return element(by.css('#content > app-navbar > div > nav > form > input'));
  }

  getNavBarButton() {
    return element(by.css('#content > app-navbar > div > nav > form > button'));
  }

  getRepositoryBody() {
    return element(by.css('#content > app-body'));
  }

  get1000WarningMessage() {
    return element(by.css('#content > app-body > div.alert-warning'));
  }

  get1000WarningMessageHeader() {
    return element(by.css('#content > app-body > div.alert-warning h4'));
  }

  getFirstTab() {
    return element(by.css('#repositoryTab'));
  }

  getSecondTab() {
    return element(by.css('#openIssueTab'));
  }

  getRepositoryPaginator() {
    return element(by.css('#repositoryTab-panel > div.repoPagination'));
  }

  getRepositoryPaginatorInput() {
    return element(by.css('#repositoryTab-panel > div.repoPagination > form > input'));
  }

  getRepositoryPaginatorButton() {
    return element(by.css('#repositoryTab-panel > div.repoPagination > form > button'));
  }

  getAllRepositoryBox() {
    return element(by.css('#repositoryTab-panel > .repositoryPanel'));
  }

  getFirstRepositoryBox() {
    return element(by.css('#repositoryTab-panel > div:nth-child(2) > div:nth-child(1)'));
  }

  getFirstRepositoryBoxChart() {
    return element(by.css('#repositoryTab-panel > div:nth-child(2) > div:nth-child(2) > canvas'));
  }

  getFirstSeeMoreDataLink() {
    return element(by.css('#repositoryTab-panel > div:nth-child(2) > div:nth-child(1) > button.btn.btn-link'));
  }

  getFirstAvatar() {
    return element(by.css('#repositoryTab-panel > div:nth-child(2) > div:nth-child(1) > div > img'));
  }

  getFirstSeeIssuesButton() {
    return element(by.css('#repositoryTab-panel > div:nth-child(2) > div:nth-child(1) > button'));
  }

  getIssuePaginator() {
    return element(by.css('#openIssueTab-panel > div.repoPagination'));
  }

  getIssuePaginatorInput() {
    return element(by.css('#openIssueTab-panel > div.repoPagination > form > input'));
  }

  getIssuePaginatorButton() {
    return element(by.css('#openIssueTab-panel > div.repoPagination > form > button'));
  }

  getFirstIssueLabel() {
    return element(by.css('#openIssueTab-panel > div:nth-child(2) > strong > a'));
  }
}
