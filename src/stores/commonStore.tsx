import { observable, action } from 'mobx';

export class CommonStore {
  @observable showGlobalLoader = false;

  @action
  setShowGlobalLoader = (show: boolean) => {
    this.showGlobalLoader = show;
  }
}

export default new CommonStore();
