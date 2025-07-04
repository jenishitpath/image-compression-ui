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
    width: number,
    height: number,
    zip: boolean,
    quality: number,
    format: string,
    grayscale: boolean,
    rotate: number,
    flip: string,
    crop: boolean,
    bgColor: string,
    namePrefix: string
  ): Observable<Blob> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    const params = new URLSearchParams({
      width: width.toString(),
      height: height.toString(),
      zip: zip.toString(),
      quality: quality.toString(),
      format,
      grayscale: grayscale.toString(),
      rotate: rotate.toString(),
      flip,
      crop: crop.toString(),
      bgColor,
      namePrefix
    });
    return this.http.post(
      `${environment.apiUrl}api/image/upload?${params.toString()}`,
      formData,
      { responseType: 'blob' }
    );
  }
}
