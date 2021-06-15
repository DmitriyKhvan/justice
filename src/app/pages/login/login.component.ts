import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('password') passwordRef!: ElementRef;

  form!: FormGroup;
  type = 'uil-eye';
  submitted = false;
  message!: string;

  previousUrl: string | null = null;
  currentUrl: string | null = null;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Пожалуйста введите данные';
      } else if (params['authFailed']) {
        this.message = 'Сессия истекла. Введите данные заного';
      } else if (params['noRights']) {
        this.message = 'В доступе отказано';
      }
    });
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  lookPass() {
    const el = this.passwordRef.nativeElement;
    if (el.getAttribute('type') === 'password') {
      el.setAttribute('type', 'text');
      this.type = 'uil-eye-slash';
    } else {
      el.setAttribute('type', 'password');
      this.type = 'uil-eye';
    }
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    // console.log(user);

    this.auth.login(user).subscribe(
      () => {
        this.form.reset();

        // console.log(
        //   'this.auth.userRole',
        //   this.auth.currentUser.roles.includes(2)
        // );

        if (this.auth.currentUser.roles.includes(2)) {
          this.router.navigate(['/admin/listUser']);
        } else {
          this.router.navigate(['/']);
        }

        // this.router.navigate(['/']);

        this.submitted = false;
      },
      () => {
        this.submitted = false;
      }
    );
  }
}
