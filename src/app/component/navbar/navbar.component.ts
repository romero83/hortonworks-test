import {Component} from '@angular/core';
import {RepositoryService} from '../../service/repository.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
/**
 * Navigation bar component to render search input field to search repository by name.
 */
export class NavbarComponent {

  repositoryName = 'bootstrap';
  // For inner loading functionality
  loading = false;

  constructor(private repositoryService: RepositoryService) {
  }

  /**
   * Search repository by the name inputted and manage loading state.
   */
  searchRepository() {
    this.loading = true;
    this.repositoryService.fetchRepositoryData(this.repositoryName, 1, () => {
      this.loading = false;
    });
  }

  /**
   * Fire repository search on Enter key.
   */
  searchOnEnterKey(e) {
    const charCode = (e.which) ? e.which : e.keyCode;
    if (charCode === 13) { // Enter
      this.searchRepository();
    }
  }

}
