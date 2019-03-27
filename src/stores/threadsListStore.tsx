import { observable, action, flow } from 'mobx';
import _ from 'lodash';
import { thread as threadApi } from '../api';
import { SearchThreadDto } from '../api/thread.dto';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const YEARS = ['2018', '2019'];
const createQuery = (option: string) => `Ask HN: Who is hiring? (${option})`;

interface Thread {
  title: string,
  objectID: string
}

export class ThreadsListStore {
  @observable isLoading = false;
  @observable isLoaded = false;
  @observable threads: Thread[] = [];
  @observable queries: string[]  = [];

  @action
  initLoadList = () => {
    if(!this.isLoaded){
      this.loadList()
    }
  };

  loadThread = flow(function* (this: ThreadsListStore, promise: Promise<SearchThreadDto>, query: string): IterableIterator<any> {
    const thread: SearchThreadDto = yield promise;
    const desiredThread = thread.hits.find(hint => hint.title === query);
    if(desiredThread) {
      this.queries = [...this.queries, query];
      this.threads = [...this.threads, desiredThread];
      this.threads = this.threads.slice().sort((threadA, threadB) => this.queries.indexOf(threadB.title) - this.queries.indexOf(threadA.title));
    }
  });

  loadList = flow(function* (this: ThreadsListStore): IterableIterator<any>  {
    this.isLoading = true;
    this.threads = [];
    this.queries = [];
    const queries = YEARS.flatMap(year => MONTHS.flatMap(month => createQuery(`${month} ${year}`)));
    this.queries = queries;
    const promises = queries.map(query => this.loadThread(threadApi.search(createQuery(query)), query));
    yield Promise.all(promises);
    this.isLoading = false;
    this.isLoaded = true;
  })
}

export default new ThreadsListStore();
