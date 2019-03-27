import { observable, flow, reaction} from 'mobx';
import {thread as threadApi} from '../api';
import {GetThreadDto} from '../api/thread.dto';
import commonStore from './commonStore';

export class HiringStore {
  constructor() {
    reaction(
      () => this.isLoading,
      () => commonStore.setShowGlobalLoader(this.isLoading)
      )
  }

  @observable isLoading = false;
  @observable thread: GetThreadDto | undefined;

  loadThread = flow(function* (this: HiringStore, threadID: string): IterableIterator<any> {
    this.isLoading = true;
    const thread = yield threadApi.getThread(threadID);
    this.thread = thread;
    this.isLoading = false;
  });
}

export default new HiringStore();
