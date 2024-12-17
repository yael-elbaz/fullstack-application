import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { PostService } from '../../Services/post.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post',
   imports: [MatFormFieldModule,ReactiveFormsModule,FormsModule,CommonModule,MatInputModule,MatCardModule,MatButtonModule],
   templateUrl: './create-post.component.html',
  styleUrls: ['./create-post-component.component.css']
})
export class CreatePostComponent  {
  postForm: FormGroup;
  selectedLocation: { lat: number, lng: number } | null = null;
  imageFile: File | null = null;


  



  constructor(
    private fb: FormBuilder,
    private postService: PostService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      content: ['', Validators.required],
      image: [null],
    });
  }

  onImageChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
    }
  }

  // onLocationSelect(event: any) {
  //   // Capture selected location from Google Maps
  //   this.selectedLocation = {
  //     lat: event.latLng.lat(),
  //     lng: event.latLng.lng(),
  //   };
  // }

  onSubmit() {
    if (this.postForm.valid && this.selectedLocation) {
      const formData = new FormData();
      formData.append('title', this.postForm.value.title);
      formData.append('category', this.postForm.value.category);
      formData.append('content', this.postForm.value.content);
      formData.append('place', JSON.stringify(this.selectedLocation));
      
      if (this.imageFile) {
        formData.append('image', this.imageFile, this.imageFile.name);
      }
      this.postService.addPost(formData).subscribe({
        next: (response:any) => {
          console.log('Post created successfully:', response);
        },
        error: (err:any) => {
          console.error('Error creating post:', err);
        },
      });
    }
  }
}