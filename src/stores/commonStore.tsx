import { action, observable } from 'mobx';

export class CommonStore {
  @observable public showGlobalLoader = false;

  @action
  public setShowGlobalLoader = (show: boolean) => {
    this.showGlobalLoader = show;
  };
}

export default new CommonStore();
