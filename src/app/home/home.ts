import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  files: File[] = [];
  width = 0;
  height = 0;
  zip = false;
  quality = 75;
  format = 'jpg';
  grayscale = false;
  rotate = 0;
  flip = '';
  crop = false;
  bgColor = 'white';
  namePrefix = 'img';

  constructor(private http: HttpClient) { }

  onFileChange(event: any) {
    this.files = Array.from(event.target.files);
  }

  uploadImages() {
    if (this.files.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    this.files.forEach(file => formData.append('files', file));

    const params = new URLSearchParams({
      width: this.width.toString(),
      height: this.height.toString(),
      zip: this.zip.toString(),
      quality: this.quality.toString(),
      format: this.format,
      grayscale: this.grayscale.toString(),
      rotate: this.rotate.toString(),
      flip: this.flip,
      crop: this.crop.toString(),
      bgColor: this.bgColor,
      namePrefix: this.namePrefix
    });

    this.http.post(`https://localhost:7030/api/image/upload?${params.toString()}`, formData, {
      responseType: 'blob'
    }).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.zip ? 'images.zip' : `image.${this.format}`;
      a.click();
    }, err => {
      alert("Upload failed.");
    });
  }
}
