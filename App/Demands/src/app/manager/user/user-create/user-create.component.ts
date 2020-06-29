import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser, UserType } from 'src/app/models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styles: [`
    .mat-raised-button~.mat-raised-button {
      margin-left: 10px
    }
  `]
})
export class UserCreateComponent implements OnInit {

  form: FormGroup
  listUserType

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    })

    this.listUserType = Object.values(UserType).filter(k => typeof UserType[k as any] === "number")
  }

  create(item: IUser) {
    if (this.form.valid) {
      //TODO: check if the username already exists
      // this.userService.getAll().subscribe(tables => {

      // })

      item.type = Number(UserType[item.type])
      item.isActive = true

      console.log('Create: ', item)
      this.userService.add(item).subscribe(res => {
        if (res) {
          this.router.navigate(['/manager/users'])
          return
        }
        alert('Failed to add')
        return
      })
    }
  }
}
