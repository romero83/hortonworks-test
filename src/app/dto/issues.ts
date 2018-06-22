import {Issue} from './issue';

export class Issues {
  total_count: number;
  incomplete_results: Boolean;
  items: Issue[] = [];
}
