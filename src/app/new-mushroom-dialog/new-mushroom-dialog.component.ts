import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MushroomDataService } from '../mushroom-data.service';

@Component({
  selector: 'app-new-mushroom-dialog',
  templateUrl: './new-mushroom-dialog.component.html',
  styleUrls: ['./new-mushroom-dialog.component.scss']
})
export class NewMushroomDialogComponent implements OnInit {
  mushroomForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: MushroomDataService,
    private dialogRef: MatDialogRef<NewMushroomDialogComponent>,
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
    console.log(data);
    this.service.addNewMushroom({ ...data, asseturl: 'someurl' }).subscribe(newMushroom => {
      console.log(newMushroom);
      this.dialogRef.close();
    })
  }

}
