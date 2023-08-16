import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('Post service (HttpCLientTEstingModule', () => {
  let postService: PostService;
  let httpTestinController: HttpTestingController;
  let POSTS = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService],
      imports: [HttpClientTestingModule],
    });

    postService = TestBed.inject(PostService);
    httpTestinController = TestBed.inject(HttpTestingController);
  });

  describe('getPosts()', () => {
    it('should get posts when getPost() is called', (done: DoneFn) => {
      postService.getPosts().subscribe((data) => {
        expect(data).toEqual(POSTS);
        done();
      });
      postService.deletePosts(POSTS[0]).subscribe(() => {});
      const request = httpTestinController.expectOne(
        'https://jsonplaceholder.typecode.com/posts'
      );
      request.flush(POSTS);
      expect(request.request.method).toBe('GET');
    });
  });
  describe('getPost()', () => {
    it('should return single post when getpost is called with postID', () => {
      postService.getPost(1).subscribe();
      const request = httpTestinController.expectOne(
        'https://jsonplaceholder.typecode.com/posts/1'
      );
      expect(request.request.method).toBe('GET');
    });
  });
});
