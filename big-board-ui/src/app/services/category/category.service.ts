import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private api: ApiService
  ) { }

  public getAllCategories(): Observable<any> {
    return this.api.get(`/api/categories`, {});
  }

}