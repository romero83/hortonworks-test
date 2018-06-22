import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Util} from '../util/Util';
import {Constant} from '../constant/Constant';
import {Repositories} from '../dto/repositories';
import {Issues} from '../dto/issues';

@Injectable()
/**
 * Repository service for querying repository information and issues.
 */
export class RepositoryService {

  /**
   * Shared storage data to be able to access them in other components.
   * Each data has its own getter.
   */

  private _repositories: Repositories = null;
  private _searchName: string;
  private _page: number;

  constructor(private http: HttpClient) {
  }

  /**
   * Fetch repositories based on repository name.
   * @param {string} searchName - The repository name.
   * @param {number} page - The page to show.
   * @param {() => void} callback - Extra callback function to be able to react to this async query in the component after response arrived.
   */
  fetchRepositoryData(searchName: string, page: number, callback: () => void): void {
    this.setRepositories(null, null, null);
    if (!Util.isBlank(searchName)) {
      this.http.get(Constant.SEARCH_BY_NAME + searchName + '&sort=score&order=desc&page=' + page)
        .subscribe((response: Repositories) => {
            this.setRepositories(response, searchName, page);
            callback();
          }, error => callback()
        );
    }
  }

  /**
   * Fetch open issues based on repository full name.
   * @param {string} fullName - The repository unique full name.
   * @param {number} page - The page to show.
   * @param {(issues: Issues) => void} callback - Return issue response to the component to work with.
   */
  fetchOpenIssues(fullName: string, page: number, callback: (issues: Issues) => void): void {
    this.http.get(Constant.SEARCH_OPEN_ISSUES + fullName + '&sort=score&order=desc&page=' + page)
      .subscribe((response: Issues) => {
          callback(response);
        }, error => callback(null)
      );
  }

  /**
   * Helper function to fill shared data items.
   * @param {Repositories} repository - The search repositories query result.
   * @param {string} searchName - The search repositories search name input parameter.
   * @param {number} page - The search repositories page to show.
   */
  private setRepositories(repository: Repositories, searchName: string, page: number) {
    this._repositories = repository;
    this._searchName = searchName;
    this._page = page;
  }

  getRepositories(): Repositories {
    return this._repositories;
  }

  getSearchName(): string {
    return this._searchName;
  }

  getCurrentPage(): number {
    return this._page;
  }

}
