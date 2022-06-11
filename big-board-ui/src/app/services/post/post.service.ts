import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private api: ApiService) {}

  public getAllPosts(params: any): Observable<any> {
    return this.api.get(`/api/post`, { params });
  }
}
