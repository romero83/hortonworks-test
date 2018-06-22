import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Repositories} from '../../dto/repositories';
import {RepositoryService} from '../../service/repository.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {Issues} from '../../dto/issues';
import {Constant} from '../../constant/Constant';
import * as Chart from 'chart.js/dist/Chart.bundle.min.js';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.less'],
  animations: [
    trigger(
      'fadeInOut', [
        transition(':enter', [
          style({opacity: 0}),
          animate(500, style({opacity: 1}))
        ])
      ]
    )
  ]
})
/**
 * Angular component for displaying Github repository information and bugs.
 * @Component
 */
export class BodyComponent implements OnInit {

  // This emitter is casting events to the parent component when its needed to indicate loading state.
  @Output() loadingEventEmitter = new EventEmitter();

  chart = []; // This will hold our chart info

  repositories: Repositories;
  exactRepositoryName: string;
  moreData: number[] = [];
  isIssuesLoaded: Boolean = false;
  seeIssueTab: Boolean = false;
  openIssues: Issues = new Issues();

  repoPageCount: number;
  issuePageCount: number;
  repositoryPage: number;
  actualPage: number;
  pageValidation = false;
  issuePageValidation = false;
  issuePage = 1;
  actualIssuePage: number;
  @ViewChild('tabs') tabs: NgbTabset;

  constructor(private repositoryService: RepositoryService) {
    this.repositories = repositoryService.getRepositories();
    this.repoPageCount = this.calculateMaximumPageCount(this.repositories.total_count);
    this.repositoryPage = this.repositoryService.getCurrentPage();
    this.actualPage = this.repositoryPage;
  }

  /**
   * When initializing component make sure that there is no loading mask.
   */
  ngOnInit() {
    this.loadingEventEmitter.emit(false);
    this.generateCharts();
  }

  /**
   * Generate chart canvas elements.
   */
  generateCharts() {
    const dataLabels = ['number of forks', 'open issues', 'stargazer count', 'watchers count'];
    for (let i = 0; i !== this.repositories.items.length; i++) {
      const id = this.repositories.items[i].id;
      const datasets = [];
      datasets.push({
        backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9'],
        data: [this.repositories.items[i].forks_count,
          this.repositories.items[i].open_issues_count,
          this.repositories.items[i].stargazers_count,
          this.repositories.items[i].watchers_count]
      });

      this.chart[id] = new Chart(document.getElementById('canvas' + id), {
        type: 'bar',
        data: {
          labels: dataLabels,
          datasets: datasets
        },
        options: {
          legend: {display: false},
          title: {
            text: 'Repository visualization chart'
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              barPercentage: 1.0
            }]
          }
        }
      });
    }
  }

  /**
   * Assemble Id helper method.
   * @param {string} id - The Id to concat.
   * @returns {string} Concatenated ID.
   */
  assembleId(id: string) {
    return 'canvas' + id;
  }

  /**
   * Repository page changing on Enter key.
   */
  changePageOnEnterKey(e) {
    const charCode = (e.which) ? e.which : e.keyCode;
    if (charCode === 13) { // Enter
      this.changeRepositoryPage();
    }
  }

  /**
   * Issues page changing on Enter key.
   */
  changeIssuePageOnEnterKey(e) {
    const charCode = (e.which) ? e.which : e.keyCode;
    if (charCode === 13) { // Enter
      this.loadIssues(this.exactRepositoryName);
    }
  }

  /**
   * When paging occurred, fire repository search which first destroy the actual results
   * which kills this component by the ngIf statement on this component template. After response arrived, re-render this component.
   */
  changeRepositoryPage() {
    if (this.repositoryPage <= this.repoPageCount) {
      this.pageValidation = false;
      this.loadingEventEmitter.emit(true);
      this.repositoryService.fetchRepositoryData(this.repositoryService.getSearchName(), this.repositoryPage, () => {
      });
    } else {
      this.pageValidation = true;
    }
  }

  /**
   * When See issues button pressed or paging occurred fire issues search.
   * @param {string} fullName - The repository full name to identify unique repo.
   */
  loadIssues(fullName: string) {
    if (!this.issuePageCount || this.issuePage <= this.issuePageCount) {
      this.issuePageValidation = false;
      this.loadingEventEmitter.emit(true);
      this.seeIssueTab = true;
      if (fullName) {
        this.exactRepositoryName = fullName;
      }
      this.repositoryService.fetchOpenIssues(this.exactRepositoryName, this.issuePage, (issues: Issues) => {
        this.openIssues = issues;
        this.issuePageCount = this.calculateMaximumPageCount(this.openIssues.total_count);
        this.actualIssuePage = this.issuePage;

        this.isIssuesLoaded = true;
        this.tabs.select('openIssueTab');
        this.loadingEventEmitter.emit(false);
      });
    } else {
      this.issuePageValidation = true;
    }
  }

  /**
   * Calculate maximum page count because Github allow 1000 records only.
   * @param {number} totalCount - The total count of the result.
   * @returns {number} The adjusted maximum page number.
   */
  private calculateMaximumPageCount(totalCount: number): number {
    let pageCount = Math.ceil(totalCount / Constant.GITHUB_PAGE_SIZE);
    if (pageCount > Constant.MAXIMUM_GITHUB_PAGE) {
      pageCount = Constant.MAXIMUM_GITHUB_PAGE;
    }
    return pageCount;
  }

}
