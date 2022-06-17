import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public options: any[] = [];

  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.setOptions();
  }

  private setOptions(): void {
    this.options = [
      {
        title: 'Open Admin',
        icon: 'developer_board',
        canShow: () => this.auth.currentUserValue,
        action: () => this.router.navigate(['/admin']),
      },
      {
        title: 'Visit Profile',
        icon: 'person',
        canShow: () => this.auth.currentUserValue,
        action: () => {},
      },
      {
        title: 'Login',
        icon: 'last_page',
        canShow: () => !this.auth.currentUserValue,
        action: () => this.router.navigate(['/signin']),
      },
      {
        title: 'Logout',
        icon: 'logout',
        canShow: () => this.auth.currentUserValue,
        action: () => {
          this.auth.logout();
          this.openMain()
        }
      }
    ];
  }

  public openMain(): void {
    this.router.navigate(['/']);
  }
}
