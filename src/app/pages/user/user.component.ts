import { Component, effect, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthState } from '../../states/auth.state';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserState } from '../../states/user.state';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});
  profileForm: FormGroup = new FormGroup({});

  isEditing: boolean = false;
  userId: string = '';

  user !: User | null;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  selectedProfilePicturePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userState: UserState,
    private authState: AuthState
  ) {
    effect(() => {
      this.user = this.userState.user();
      this.initUserForm();
    })
  }

  ngOnInit(): void {
    this.userId = this.authState.userId() || '';
    this.loadUser();

    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required]]
    });

    this.profileForm = this.fb.group({
      file: [null, Validators.required]
    });
  }


  initUserForm() {

    this.userForm.patchValue({
      firstname: this.user?.firstname,
      lastname: this.user?.lastname,
      email: this.user?.email
    })

  }

  loadUser() {
    this.userService.getUser(this.userId).subscribe({
      next: (res) => {
        this.userState.setUser(res['user']);

      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    this.successMessage = '';
    this.errorMessage = '';
  }

  onUserSubmit() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.userService.updateUser(this.userId, this.userForm.value).subscribe({
      next: (res) => {
        this.successMessage = 'User information updated successfully.';
        this.errorMessage = '';
        this.isEditing = false;
        this.isLoading = false;
        this.userState.setUser(res['user']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to update user information.';
        this.successMessage = '';
        this.isLoading = false;
      }
    });
  }

  onPasswordSubmit() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const { currentPassword, newPassword } = this.passwordForm.value;

    this.userService.updatePassword(this.userId, { currentPassword, newPassword }).subscribe({
      next: (res) => {
        this.successMessage = 'Password changed successfully.';
        this.errorMessage = '';
        this.isLoading = false;
        this.passwordForm.reset();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to change password.';
        this.successMessage = '';
        this.isLoading = false;
      }
    });
  }


  onProfilePictureSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.profileForm.patchValue({ file });
      this.profileForm.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedProfilePicturePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onProfilePictureSubmit() {
    if (!this.profileForm.valid) {
      return;
    }

    const formData = new FormData();
    formData.append('image', this.profileForm.get('file')?.value);

    this.isLoading = true;
    this.userService.addProfilePicture(this.userId, formData).subscribe({
      next: (res) => {
        this.successMessage = 'Profile picture updated successfully.';
        this.errorMessage = '';
        this.isLoading = false;
        this.selectedProfilePicturePreview = null;
        this.loadUser();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to upload profile picture.';
        this.successMessage = '';
        this.isLoading = false;
      }
    });
  }
}
