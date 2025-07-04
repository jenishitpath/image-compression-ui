import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Image {
  constructor(private http: HttpClient) {}

  uploadImages(
    files: File[],
    width: number | undefined,
    height: number | undefined,
    zip: boolean,
    quality: number | undefined,
    format: string,
    grayscale: boolean,
    rotate: number,
    flip: string,
    crop: boolean
  ): Observable<Blob> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    const params = new URLSearchParams({
      width: (width || 0).toString(),
      height: (height || 0).toString(),
      zip: zip.toString(),
      quality: (quality || 0).toString(),
      format,
      grayscale: grayscale.toString(),
      rotate: rotate.toString(),
      flip,
      crop: crop.toString()
    });
    return this.http.post(
      `${environment.apiUrl}api/image/upload?${params.toString()}`,
      formData,
      { responseType: 'blob' }
    );
  }
}
