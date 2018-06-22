import {User} from './user';
import {Label} from './label';
import {PullRequest} from './pull-request';

export class Issue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Label[] = [];
  state: string;
  locked: Boolean;
  assignee: User;
  assignees: User[] = [];
  milestone: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string;
  author_association: string;
  pull_request: PullRequest;
  body: string;
  score: number;
}
