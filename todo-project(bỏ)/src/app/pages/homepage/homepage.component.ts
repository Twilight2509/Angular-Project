import { Component } from '@angular/core';
import { CalenderComponent } from '../../components/calender/calender.component';
import { FooterComponent } from '../../components/layout/footer/footer.component';
import { NavbarComponent } from '../../components/layout/navbar/navbar.component';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CalenderComponent, FooterComponent, NavbarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
