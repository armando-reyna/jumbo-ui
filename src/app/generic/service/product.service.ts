import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreModel} from "../model/store.model";
import {environment} from "../../../environments/environment";


@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public getClosestStores(numberOfStores: number, latitude: number, longitude: number): Promise<Array<StoreModel>> {
    return this.http.get(`${environment.api_url}/v1/store/closest/${numberOfStores}/${latitude}/${longitude}`)
      .toPromise()
      .then(response => {
        return response as Array<StoreModel>;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }

}
