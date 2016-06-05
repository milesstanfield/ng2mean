import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Ng2meanAppComponent } from '../app/ng2mean.component';

beforeEachProviders(() => [Ng2meanAppComponent]);

describe('App: Ng2mean', () => {
  it('should create the app',
      inject([Ng2meanAppComponent], (app: Ng2meanAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'ng2mean works!\'',
      inject([Ng2meanAppComponent], (app: Ng2meanAppComponent) => {
    expect(app.title).toEqual('ng2mean works!');
  }));
});
