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
    return this.api.get(`/api/category`, {});
  }

  public getPageOfCategories(name: string, params: any): Observable<any> {
    return this.api.get(`/api/category?name=${name}`, {params});
  }

  public createCategory(category: any): Observable<any> {
    return this.api.post(`/api/category`, {body: category});
  }

  public deleteCategory(id: number): Observable<any> {
    return this.api.delete(`/api/category/${id}`, {});
  }

}
