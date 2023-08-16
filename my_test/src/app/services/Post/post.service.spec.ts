import { HttpClient } from '@angular/common/http';
import { PostService } from './post.service';
import { of } from 'rxjs';

describe('Post Service', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postservice: PostService;
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
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    postservice = new PostService(httpClientSpy);
  });

  describe('getPosts()', () => {
    it('should retuen expected posts when getposts is called', () => {
      httpClientSpy.get.and.returnValue(of(POSTS));
      postservice.getPosts().subscribe({
        next: (posts) => {
          expect(posts).toEqual(POSTS);
        },
        error: () => {},
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });
});
