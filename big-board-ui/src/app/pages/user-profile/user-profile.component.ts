import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public user: any = this.authenticationService.currentUserValue;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    console.log(this.user);
  }
}
