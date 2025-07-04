import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Image {
  constructor(private http: HttpClient) {}

  uploadImages(files: File[], width: number, height: number, zip: boolean): Observable<Blob> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    const queryParams = `?width=${width}&height=${height}&zip=${zip}`;
    return this.http.post(
      `${environment.apiUrl}api/image/upload${queryParams}`,
      formData,
      { responseType: 'blob' }
    );
  }
}
