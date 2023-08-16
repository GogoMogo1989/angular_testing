import { Post } from 'src/app/modals/post';
import { PostComponent } from './post.component';
import { first } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Post Component', () => {
  let fixture: ComponentFixture<PostComponent>;
  let comp: PostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(PostComponent);
    comp = fixture.componentInstance;
  });

  it('it should post component using TestBed', () => {
    expect(comp).toBeDefined();
  });

  it('should have the post title in hte anchor debug element', () => {
    const post: Post = { id: 1, body: 'body1', title: 'title1' };
    comp.posts = post;
    fixture.detectChanges();
    const postDebugElement = fixture.debugElement;
    const aElement: HTMLElement = postDebugElement.query(
      By.css('a')
    ).nativeElement;
    expect(aElement.textContent).toContain(post.title);
  });

  /*   it('should have the post title in the anchor element', () => {
    const post: Post = { id: 1, body: 'body1', title: 'title1' };
    comp.posts = post;
    fixture.detectChanges();
  
    const postElement: HTMLElement = fixture.nativeElement;
    const a = postElement.querySelector('a');
  
    expect(a?.textContent).toContain(post.title);
  }); */

  it('should raise and event when the delete post is clicked', () => {
    const post: Post = { id: 1, body: 'body1', title: 'title1' };
    comp.posts = post;
    comp.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toEqual(post);
    });
    comp.onDeletePost(new MouseEvent('click'));
  });
});
