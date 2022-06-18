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

  public getFilteredPosts(body:any): Observable<any> {
    return this.api.get(`/api/posts/filter`, body);
  }

  public getPost(id: number): Observable<any> {
    return this.api.get(`/api/posts/${id}`, {});
  }
}
