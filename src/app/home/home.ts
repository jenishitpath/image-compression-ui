import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Image } from '../shared/services/image';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  files: any[] = [];
  width = undefined;
  height = undefined;
  zip = false;
  quality = undefined;
  format = 'jpg';
  grayscale = false;
  rotate = 0;
  flip = '';
  crop = false;

  constructor(
    private http: HttpClient,
    private imageService: Image,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  onFileChange(event: any) {
    const files = Array.from(event.target.files);
    this.files = [];
    for (const file of files) {
      const fileWithPreview: any = file;
      fileWithPreview.loading = true;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        fileWithPreview.preview = e.target.result;
        fileWithPreview.loading = false;
        this.cdr.detectChanges(); // Trigger change detection
      };
      reader.readAsDataURL(file as Blob);
      this.files.push(fileWithPreview);
    }
    if (this.files.length > 1) {
      this.zip = true;
    }
  }

  uploadImages(imgForm: NgForm) {
    if (imgForm.invalid) {
      imgForm.control.markAllAsTouched();
      return;
    }

    if((this.height == undefined || this.height <= 0) && (this.width == undefined || this.width <= 0) && (this.quality == undefined || this.quality <= 0)) {
      alert("Width, Height or Quality should be more than 0.");
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
      this.crop
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
