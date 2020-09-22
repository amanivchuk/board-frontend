import {Component, OnInit} from '@angular/core';
import {RegistrationService} from '../../../data/impl/RegistrationService';
import {User} from '../../../model/User';

@Component({
  selector: 'app-authorization-layout',
  templateUrl: './authorization-layout.component.html',
  styleUrls: ['./authorization-layout.component.css']
})
export class AuthorizationLayoutComponent implements OnInit {

  constructor(
    private registrationService: RegistrationService
  ) {
  }

  ngOnInit() {
  }

  createUser(user: User) {
    this.registrationService.add(user).subscribe(result => {
      console.log('user added ' + result);
    });
  }
}
