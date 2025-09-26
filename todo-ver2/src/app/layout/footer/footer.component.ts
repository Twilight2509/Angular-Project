import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NzLayoutModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent { }
