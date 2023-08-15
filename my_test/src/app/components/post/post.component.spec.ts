import { Post } from 'src/app/modals/post';
import { PostComponent } from './post.component';
import { first } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('Post Component', () => {
  let fixture: ComponentFixture<PostComponent>;
  let comp: PostComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
    });
    fixture = TestBed.createComponent(PostComponent);
    comp = fixture.componentInstance;
  });
  it('it should post component using TestBed', () => {
    expect(comp).toBeDefined();
  });
  it('should raise and event when the delete post is clicked', () => {
    const post: Post = { id: 1, body: 'body1', title: 'title1' };
    comp.posts = post;
    comp.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toEqual(post);
    });
    comp.onDeletePost(new MouseEvent('click'));
  });
});
