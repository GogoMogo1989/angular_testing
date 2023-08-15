import { Post } from 'src/app/modals/post';
import { PostsComponent } from './posts.component';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { PostService } from 'src/app/services/Post/post.service';

class mockPostService {
  getPost() {}

  deletePost() {}
}
describe('Post Component', () => {
  let POSTS: Post[];
  let component: PostsComponent;
  let mockPostService: any;

  beforeEach(() => {
    POSTS = [
      {
        id: 1,
        body: 'body1',
        title: 'title1',
      },
      {
        id: 2,
        body: 'body2',
        title: 'title2',
      },
      {
        id: 3,
        body: 'body3',
        title: 'title3',
      },
    ];

    mockPostService = jasmine.createSpyObj(['getPosts', 'deletePosts']);

    TestBed.configureTestingModule({
      providers: [
        PostsComponent,
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    });

    component = TestBed.inject(PostsComponent);
  });

  describe('delete', () => {
    beforeEach(() => {
      mockPostService.deletePosts.and.returnValue(of(true));
      component.posts = POSTS;
      component.delete(POSTS[1]);
    });
    it('should delete selected post from the post', () => {
      expect(component.posts.length).toBe(2);
    });

    it('should delete the actual selected Post in Posts', () => {
      for (let post of component.posts) {
        expect(post).not.toEqual(POSTS[1]);
      }
    });

    it('should called the delete method in Post Service only once', () => {
      expect(mockPostService.deletePosts).toHaveBeenCalledTimes(1);
    });
  });
});
