import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { BoardComponent } from './components/board/board.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CreatePostComponent } from './components/create-post-component/create-post-component.component';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent,CreatePostComponent,MatButtonModule,MatCardModule,MatFormFieldModule, MatInputModule, BoardComponent,SearchBarComponent], // Import the standalone HeaderComponent here
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'neighborhood-board';
}
