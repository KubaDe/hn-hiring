import { observable, flow, reaction, computed, action, toJS } from 'mobx';
import Fuse from 'fuse.js';
import { thread as threadApi } from '../api';
import { GetThreadDto } from '../api/thread.dto';
import commonStore from './commonStore';
import jobParser, { Job } from '../services/jobParser';

interface Filter {
  [key: string]: string;
}

export class HiringStore {
  constructor() {
    reaction(
      () => this.isLoading,
      () => commonStore.setShowGlobalLoader(this.isLoading),
    );
  }

  @observable isLoading = false;
  @observable thread: GetThreadDto | undefined;
  @observable filter: Filter = {
    search: '',
    remote: '',
  };

  @action
  setFilter = (type: string, value: string) => {
    this.filter[type] = value;
  }

  @computed
  get jobs(): Job[] {
    const options = {
      shouldSort: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'text',
        'headLine',
        'tags',
      ],
    };
    let results = this.parsedJobs;
    Object.keys(this.filter).forEach((key) => {
      if(!this.filter[key]) return;
      const fuse = new Fuse(results, options);
      results = fuse.search(this.filter[key]);
    });
    return results;
  }

  @computed
  get parsedJobs(): Job[] {
    if (!this.thread) return [];
    return this.thread.children.filter(child => child.text).map(
      child => jobParser.parse(child.text));
  }

  loadThread = flow(function * (this: HiringStore, threadID: string): IterableIterator<any> {
    this.isLoading = true;
    const thread = yield threadApi.getThread(threadID);
    this.thread = thread;
    this.isLoading = false;
  });
}

export default new HiringStore();
