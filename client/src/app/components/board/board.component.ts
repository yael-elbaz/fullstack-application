import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PostCardComponent } from '../post-card/post-card.component';
import { CommonModule } from '@angular/common';
import { PostService } from '../../Services/post.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';


@Component({
  selector: 'app-board',
   imports: [MatFormFieldModule,CommonModule,SearchBarComponent,
    PostCardComponent, MatInputModule,MatCardModule,MatButtonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.filteredPosts = data;  // Initially show all posts
      },
      error: (err) => console.error('Error fetching posts:', err)
    });
  }

  // Method to filter posts based on the place
  filterPosts(searchValue: string) {
    if (searchValue) {
      this.filteredPosts = this.posts.filter(post =>
        post.place.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      this.filteredPosts = this.posts;  // If search value is empty, show all posts
    }
  }
}