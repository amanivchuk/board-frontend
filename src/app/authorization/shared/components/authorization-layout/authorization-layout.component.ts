import {Component, OnInit} from '@angular/core';
import {RegistrationService} from '../../../data/impl/RegistrationService';
import {UserCreateDto} from '../../../../main/data/dto/UserCreateDto';

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

  createUser(userCreateDto: UserCreateDto) {
    this.registrationService.add(userCreateDto).subscribe(result => {
      console.log('user added ' + result);
    });
  }
}
