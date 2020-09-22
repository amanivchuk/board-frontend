import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year: Date;
  site = '';
  siteName = 'UkSatse Staff';

  constructor() {
    this.year = new Date();
  }

  ngOnInit() {
  }

}
