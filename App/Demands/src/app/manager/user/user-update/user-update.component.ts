import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser, UserType } from 'src/app/models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styles: [`
    .mat-raised-button~.mat-raised-button {
      margin-left: 10px
    }
  `]
})
export class UserUpdateComponent implements OnInit {

  form: FormGroup
  listUserType

  constructor(private userService: UserService, private routerActive: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      isActive: new FormControl('', [Validators.required]),
    })

    this.userService.getById(+this.routerActive.snapshot.params.id).subscribe(res => {
      if (!res) {
        alert('Item not found!')
        this.router.navigate(['/manager/users'])
      } else {
        this.form.setValue({ id: res.id, name: res.name, username: res.username, isActive: res.isActive, type: UserType[res.type] })
        this.listUserType = Object.values(UserType).filter(k => typeof UserType[k as any] === "number")
      }
    })
  }

  update(item: IUser) {
    if (this.form.valid) {
      item.type = Number(UserType[item.type])
      this.userService.update(item).subscribe(res => {
        if (res) {
          this.router.navigate(['/manager/users'])
          return
        }
        alert('Failed to update')
        return
      })
    }
  }
}