import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  public isLoading: boolean = false;

  public beError: string = '';

  public returnUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private rotuer: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.route.queryParams.subscribe((res: any) => {
      this.returnUrl = res.returnUrl
    })
  }

  public login(): void {
    this.form.markAllAsTouched()

    if(this.form.valid) {
      this.isLoading = true;

      this.authenticationService.login(this.form.value).subscribe( {
        next: (v) => {
          this.isLoading = false;

          this.rotuer.navigate([this.returnUrl || '/']);
        },
        error: (e) => {
          this.isLoading = false;
          this.beError = "Invalid Credentials";
        }
      }
      )
    }

  }
}
