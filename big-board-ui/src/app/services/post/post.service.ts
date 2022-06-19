import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private apiPath = '/api/posts';

  constructor(private api: ApiService) {
  }

  public getAllPosts(params: any): Observable<any> {
    return this.api.get(this.apiPath, {params});
  }

  public getFilteredPosts(body: any): Observable<any> {
    return this.api.get(`${this.apiPath}/filter`, body);
  }

  public getPost(id: number): Observable<any> {
    return this.api.get(`${this.apiPath}/${id}`, {});
  }

  public createPost(post: any): Observable<any> {
    return this.api.post(this.apiPath, {body: post});
  }

  public updatePost(id: number, post: any): Observable<any> {
    return this.api.put(`${this.apiPath}/${id}`, {body: post});
  }

  public deletePost(id: number): Observable<any> {
    return this.api.delete(`${this.apiPath}/${id}`, {});
  }
}
