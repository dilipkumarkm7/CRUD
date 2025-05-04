import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { User, UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listuser',
  imports: [MatIconModule, CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSnackBarModule],
  standalone: true,
  templateUrl: './listuser.component.html',
  styleUrl: './listuser.component.css'
})
export class ListuserComponent implements OnInit{
  users: User[] = [];
  editMode: { [id: string]: boolean } = {};
  editForms: { [id: string]: FormGroup } = {};

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.users.forEach(user => {
        this.editForms[user._id!] = this.fb.group({
          name: [user.name],
          email: [user.email],
          age: [user.age],
          address: [user.address],
          password: [user.password]
        });
      });
    });
  }

  toggleEdit(userId: string): void {
    this.editMode[userId] = !this.editMode[userId];
  }

  updateUser(userId: string): void {
    const updatedUser: User = this.editForms[userId].value;
    this.userService.updateUser(userId, updatedUser).subscribe(() => {
      this.snackbar.open('User updated!', 'Close', { duration: 3000 });
      this.editMode[userId] = false;
      this.fetchUsers();
    });
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.snackbar.open('User deleted!', 'Close', { duration: 3000 });
      this.fetchUsers();
    });
  }
}
