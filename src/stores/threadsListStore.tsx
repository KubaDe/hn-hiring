import _ from 'lodash';
import { action, flow, observable } from 'mobx';
import { thread as threadApi } from '../api';
import { SearchThreadDto } from '../api/thread.dto';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const YEARS = _.range(2)
  .map(i => new Date().getFullYear() - i)
  .sort((a, b) => a - b);
const createQuery = (option: string) => `Ask HN: Who is hiring? (${option})`;
const QUERIES = YEARS.flatMap(year => MONTHS.map(month => createQuery(`${month} ${year}`)));

interface Thread {
  title: string;
  objectID: string;
}

export class ThreadsListStore {
  @observable public isLoading = false;
  @observable public isLoaded = false;
  @observable public threads: Thread[] = [];

  public loadThread = flow(function*(
    this: ThreadsListStore,
    promise: Promise<SearchThreadDto>,
    query: string
  ): IterableIterator<any> {
    const thread: SearchThreadDto = yield promise;
    const desiredThread = thread.hits.find(hint => hint.title === query);
    if (desiredThread) {
      this.threads = [...this.threads, desiredThread];
      this.threads = this.threads
        .slice()
        .sort(
          (threadA, threadB) => QUERIES.indexOf(threadB.title) - QUERIES.indexOf(threadA.title)
        );
    }
  });

  public loadList = flow(function*(this: ThreadsListStore): IterableIterator<any> {
    this.isLoading = true;
    this.threads = [];
    const promises = QUERIES.map(query =>
      this.loadThread(threadApi.search(createQuery(query)), query)
    );
    yield Promise.all(promises);
    this.isLoading = false;
    this.isLoaded = true;
  });

  @action
  public initLoadList = () => {
    if (!this.isLoaded) {
      this.loadList();
    }
  };
}

export default new ThreadsListStore();
