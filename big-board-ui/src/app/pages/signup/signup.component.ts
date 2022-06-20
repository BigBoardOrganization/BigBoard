import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  public isLoading: boolean = false;

  public beError: string = '';

  public returnUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private rotuer: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });

    this.route.queryParams.subscribe((res: any) => {
      this.returnUrl = res.returnUrl;
    });
  }

  public signup(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.isLoading = true;

      this.authenticationService.register(this.form.value).subscribe({
        next: (v) => {
          this.isLoading = false;
          this.snackBar.open('You have successfully signed up!', 'Ok', {
            duration: 5000,
          });
          this.rotuer.navigate([this.returnUrl || '/']);
        },
        error: (e) => {
          this.isLoading = false;
          this.beError = 'Invalid Credentials';
        },
      });
    }
  }
}
