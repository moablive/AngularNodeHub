import { Component } from '@angular/core';
import { faBoxOpen, faUsers, faCog,faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faAngular, faNodeJs } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home {
  faBoxOpen = faBoxOpen;
  faUsers = faUsers;
  faCog = faCog;
  faBriefcase = faBriefcase;
  faNodeJs = faNodeJs;
  faAngular = faAngular;
}
