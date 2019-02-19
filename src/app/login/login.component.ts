import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginService} from '../login.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';

export interface MessageAlert {
  msg: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;
  messageAlert: string;

  constructor(private loginService: LoginService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    if (form.invalid) {
      this.messageAlert = 'Please enter username and password !';
      this.openDialog(this.messageAlert);
    } else {
      this.loginService.login(form).subscribe(response => {
          if (!(<any>response.body)) {
            this.messageAlert = 'Your username or password is invalid !';
            this.openDialog(this.messageAlert);
            this.invalidLogin = true;
          } else {
            // const token = (<any>response.body).token;
            // console.log('token : ' + token);
            // localStorage.setItem('jwt', token);
            // this.invalidLogin = false;
            this.loginService.setToken((<any>response.body).token);
            this.router.navigate(['/']);
          }
        }, ( err: HttpErrorResponse )  => {
          this.invalidLogin = true;
          this.messageAlert = 'Your username or password is invalid !';
          this.openDialog(this.messageAlert);
      });
      // console.log('login component invalidLogin value : ' + this.invalidLogin);
      // if (!this.invalidLogin && this.invalidLogin !== undefined) {
      //   this.router.navigate(['/']);
      // } else {
      //   this.messageAlert = 'Your username or password is invalid !';
      //   this.openDialog('Your username or password is invalid !');
      // }
    }
  }

  openDialog(msg: string): void {
    const dialogRef = this.dialog.open(DialogAlertLogin, {
      width: '350px',
      data: { msg : msg }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}


@Component({
  selector: 'dialog-alert-login',
  templateUrl: './dialog-alert-login.html',
})
export class DialogAlertLogin {

  constructor(
    public dialogRef: MatDialogRef<DialogAlertLogin>,
    @Inject(MAT_DIALOG_DATA) public data: MessageAlert) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

