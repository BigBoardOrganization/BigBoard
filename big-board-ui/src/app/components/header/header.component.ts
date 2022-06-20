import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  public $currentUser: Observable<any> = this.auth.currentUser;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
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
        action: () => this.router.navigate(['/admin/posts']),
      },
      {
        title: 'Visit Profile',
        icon: 'person',
        action: () => this.router.navigate(['/profile']),
      },
      {
        title: 'Logout',
        icon: 'logout',
        action: () => {
          this.logout();
          this.openMain();
        }
      }
    ];
  }

  public openMain(): void {
    this.router.navigate(['/']);
  }

  public logout(): void {
    this.auth.logout();

    this.snackBar.open('You have successfully logged out!', 'Ok', {
      duration: 5000,
    });
  }

  public goToLogin(): void {
    this.router.navigate(['/signin'])
  }

  public goToSignup(): void {
    this.router.navigate(['/signup'])
  }
}
