import {Injectable} from '@angular/core';

@Injectable()
/**
 * Initialization service used only for application initialization.
 */
export class InitService {

  private _initialized: Boolean = false;

  constructor() {
  }

  isInitialized(): Boolean {
    return this._initialized;
  }

  setInitialized(): void {
    this._initialized = true;
  }

}
