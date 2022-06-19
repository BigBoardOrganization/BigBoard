import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private api: ApiService) {}

  public getAllPosts(params: any): Observable<any> {
    return this.api.get(`/api/posts`, { params });
  }

  public getFilteredPosts(pageable:any, body: any): Observable<any> {
    return this.api.post(`/api/posts/filter?page=${pageable.page}&size=${pageable.size}`, { body });
  }

  public getPost(id: number): Observable<any> {
    return this.api.get(`/api/posts/${id}`, {});
  }
}
