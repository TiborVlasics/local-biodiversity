import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MushroomDataService } from '../services/mushroom-data.service';

@Component({
  selector: 'app-new-mushroom-dialog',
  templateUrl: './new-mushroom-dialog.component.html',
  styleUrls: ['./new-mushroom-dialog.component.scss']
})
export class NewMushroomDialogComponent implements OnInit {
  mushroomForm: FormGroup;
  imgSrc: any;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: MushroomDataService,
    private dialogRef: MatDialogRef<NewMushroomDialogComponent>,
    private http: HttpClient
  ) {
    this.mushroomForm = fb.group({
      name: '',
      nickname: '',
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const data = this.mushroomForm.getRawValue();
    const newMushroom = {...data, asseturl: this.imgSrc}
    this.service.createMushroom$(newMushroom).subscribe(
      resp => {
        this.service.addMushroom(newMushroom);
        this.dialogRef.close();
      })
  }

  handleFileInput(event: any) {
    const files = event.target.files;
    const formData: FormData = new FormData();
    formData.append('fileKey', files[0], 'fajl.jpg');
    this.loading = true;
    this.http.post('http://localhost:3000/upload', formData).subscribe((data:any)=> {
      this.loading = false;
      this.imgSrc= data.url
    })
  }

}
