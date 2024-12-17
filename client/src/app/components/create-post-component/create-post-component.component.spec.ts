import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostComponentComponent } from './create-post-component.component';

describe('CreatePostComponentComponent', () => {
  let component: CreatePostComponentComponent;
  let fixture: ComponentFixture<CreatePostComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePostComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
