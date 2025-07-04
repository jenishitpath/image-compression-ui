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

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.files = Array.from(event.target.files);
  }

  uploadImages() {
    const formData = new FormData();
    this.files.forEach(file => formData.append('files', file));

    const queryParams = `?width=${this.width}&height=${this.height}&zip=${this.zip}`;
    this.http.post(`https://localhost:7030/api/image/upload${queryParams}`, formData, { responseType: 'blob' })
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.zip ? 'images.zip' : 'image.png';
        a.click();
      });
  }
}
