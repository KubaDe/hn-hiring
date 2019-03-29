import Fuse from 'fuse.js';
import { action, computed, flow, observable, reaction, toJS } from 'mobx';
import { thread as threadApi } from '../api';
import { GetThreadDto } from '../api/thread.dto';
import jobParser, { Job } from '../services/jobParser';
import commonStore from './commonStore';

interface Filter {
  [key: string]: string;
}

const initFilters = {
  remote: '',
  seniority: 'null',
  technologies: 'null',
  search: '',

};

const FuseSearchOptions = {
  shouldSort: true,
  threshold: 0.3,
  location: 0,
  distance: 2000,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['text'],
};

export class HiringStore {
  @computed
  get jobs(): Job[] {
    let results = [...this.parsedJobs];
    Object.keys(this.filter).forEach(key => {
      if (!this.filter[key] || this.filter[key] === 'null') {
        return;
      }
      const fuse = new Fuse(results, FuseSearchOptions);
      results = fuse.search(this.filter[key]);
    });
    return results;
  }

  @computed
  get parsedJobs(): Job[] {
    if (!this.thread) {
      return [];
    }
    return this.thread.children
      .filter(child => child.text)
      .map(child => jobParser.parse(child.text));
  }

  @observable public isLoading = false;
  @observable public thread: GetThreadDto | undefined;
  @observable public filter: Filter = initFilters;

  public loadThread = flow(function*(this: HiringStore, threadID: string): IterableIterator<any> {
    this.isLoading = true;
    this.thread = undefined;
    const thread = yield threadApi.getThread(threadID);
    this.thread = thread;
    this.isLoading = false;
  });
  constructor() {
    reaction(() => this.isLoading, () => commonStore.setShowGlobalLoader(this.isLoading));
  }

  @action
  public setFilter = (type: string, value: string) => {
    this.filter[type] = value;
  };

  @action
  public resetFilter = () => {
    this.filter = initFilters;
  };
}

export default new HiringStore();
