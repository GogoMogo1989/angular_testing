import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/modals/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>('https://jsonplaceholder.typecode.com/posts');
  }

  deletePosts(post: Post) {
    return this.http.delete<Post[]>(
      `https://jsonplaceholder.typecode.com/${post.id}`
    );
  }
}
