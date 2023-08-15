import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/modals/post';
import { PostService } from 'src/app/services/Post/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    this.postService.getPosts().subscribe((post) => {
      this.posts = post;
    });
  }

  delete(post: Post) {
    this.posts = this.posts.filter((p) => p.id !== post.id);
    this.postService.deletePosts(post).subscribe();
  }
}
