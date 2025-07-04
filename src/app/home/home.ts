import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Image } from '../shared/services/image';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule
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

  constructor(private http: HttpClient, private imageService: Image) { }

  onFileChange(event: any) {
    this.files = Array.from(event.target.files);
  }

  uploadImages(imgForm: NgForm) {
    if (imgForm.invalid) {
      imgForm.control.markAllAsTouched();
      return;
    }

    this.imageService.uploadImages(
      this.files,
      this.width,
      this.height,
      this.zip,
      this.quality,
      this.format,
      this.grayscale,
      this.rotate,
      this.flip,
      this.crop,
      this.bgColor,
      this.namePrefix
    ).subscribe(blob => {
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
