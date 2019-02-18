import {  Injectable } from '@angular/core';

declare let toastr: any;

@Injectable()
export class ToastService {
  success(message: string, title?: string, positionclass?: string) {
    toastr.success(message, title, positionclass);
  }
  info(message: string, title?: string,  positionclass?: string) {
    toastr.info(message, title, positionclass);
  }
  warning(message: string, title?: string,  positionclass?: string) {
    toastr.warning(message, title, positionclass);
  }
  error(message: string, title?: string,  positionclass?: string) {
    toastr.error(message, title, positionclass);
  }
}
