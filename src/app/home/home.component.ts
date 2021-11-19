import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorsValidator} from "../validators/errors.validator";
import {ProductService} from "../generic/service/product.service";
import {StoreModel} from "../generic/model/store.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  positionForm: FormGroup;
  stores: Array<StoreModel>;

  loading: boolean = false;
  locationLoaded: boolean = false;
  locationError: boolean = false;

  loginValidationMessages = {
    latitude: [
      {type: 'required', message: 'Please enter a latitude.'},
    ],
    longitude: [
      {type: 'required', message: 'Please enter a longitude.'},
    ]
  };

  constructor(private productService: ProductService) {
    this.positionForm = new FormGroup({
      latitude: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {

    const thiss = this;

    navigator.geolocation.getCurrentPosition(function (geolocationPosition) {

      console.log(geolocationPosition.coords);
      thiss.positionForm.patchValue({latitude: geolocationPosition.coords.latitude})
      thiss.positionForm.patchValue({longitude: geolocationPosition.coords.longitude})

      thiss.locationLoaded = true;
      thiss.locationError = false;

      thiss.doSearch();

    }, function () {
      console.error('Please allow your location');
      thiss.locationLoaded = true;
      thiss.locationError = true;
    })
  }

  showError(fGroup: any, ngForm: any, validation: any, name: any) {
    return ErrorsValidator.showError(fGroup, ngForm, validation, name);
  }

  showErrorUntouched(fGroup: any, ngForm: any, validation: any, name: any) {
    return ErrorsValidator.showErrorUntouched(fGroup, ngForm, validation, name);
  }

  doSearch() {
    if (this.positionForm.valid) {
      this.loading = true;
      this.productService
        .getClosestStores(5, this.positionForm.get('latitude')?.value, this.positionForm.get('longitude')?.value)
        .then(stores => {
          this.loading = false;
          console.log(stores);
          this.stores = stores;
        }, error => {
          this.loading = false;
          console.log(error);
        });
    }
  }

}


