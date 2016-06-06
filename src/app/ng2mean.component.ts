import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ng2mean-app',
  template: require('to-string!./ng2mean.component.html'),
  styleUrls: [require('to-string!./ng2mean.component.css')]
})
export class Ng2meanAppComponent {
  title = 'ng2mean works!';
}
