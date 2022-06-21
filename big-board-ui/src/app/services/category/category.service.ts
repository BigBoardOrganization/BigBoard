import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath = '/api/category';

  constructor(
    private api: ApiService
  ) {
  }

  public getAllCategories(): Observable<any> {
    return this.api.get(this.apiPath, {});
  }

  public getPageOfCategories(name: string, params: any): Observable<any> {
    return this.api.get(`${this.apiPath}?name=${name}`, {params});
  }

  public createCategory(category: any): Observable<any> {
    return this.api.post(this.apiPath, {body: category});
  }

  public deleteCategory(id: number): Observable<any> {
    return this.api.delete(`${this.apiPath}/${id}`, {});
  }

  public getCategory(id: number): Observable<any> {
    return this.api.get(`${this.apiPath}/${id}`, {});
  }
}
