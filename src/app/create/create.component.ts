import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserveService } from '../apiserve.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(
    private service: ApiserveService,
    private router: ActivatedRoute
  ) {}

  errormsg: any;
  successmsg: any;
  getparamid: any;

  ngOnInit(): void {
    //console.log(this.router.snapshot.paramMap.get('id'), 'getid');
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if (this.getparamid) {
      this.service.getSingleData(this.getparamid).subscribe((res) => {
        //console.log(res, 'res==>');
        this.songForm.patchValue({
          artist: res.data[0].artist,
          song: res.data[0].song,
          time: res.data[0].time,
          album: res.data[0].album,
        });
      });
    }
  }

  songForm = new FormGroup({
    artist: new FormControl('', Validators.required),
    song: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    album: new FormControl('', Validators.required),
  });

  // CREATE NEW SONG
  songSubmit() {
    if (this.songForm.valid) {
      //console.log(this.songForm.value);
      this.service.createData(this.songForm.value).subscribe((res) => {
        //console.log(res, 'res==>');
        this.songForm.reset();
        this.successmsg = res.message;
      });
    } else {
      this.errormsg = 'all field is required !';
    }
  }

  //UPDATE SONG
  songUpdate() {
    //console.log(this.songForm.value, 'updatedform');

    if (this.songForm.valid) {
      this.service
        .updateData(this.songForm.value, this.getparamid)
        .subscribe((res) => {
          //console.log(res, 'resupdated');
          this.successmsg = res.message;
        });
    } else {
      this.errormsg = ' all field is required';
    }
  }

  btnClose() {}
}
