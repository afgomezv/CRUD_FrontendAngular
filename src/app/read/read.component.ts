import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiserveService } from '../apiserve.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'artist',
    'song',
    'time',
    'album',
    'actions',
  ];

  constructor(private service: ApiserveService) {}

  readData: any;
  successmsg: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  btnClose() {}

  ngOnInit(): void {
    this.getAllData();
  }

  //GET DELETE ID

  deleteID(id: any) {
    let confirmDelete = confirm('Are you sure you want to delete ?');
    if (confirmDelete === true) {
      //console.log(id, 'deleteid ==>');
      this.service.deleteData(id).subscribe((res) => {
        //console.log(res, 'deleteres ==>');
        this.successmsg = res.message;
        this.getAllData();
      });
    }
  }

  // GET DATA
  getAllData() {
    this.service.getAllData().subscribe((res) => {
      //console.log(res, 'res==>');
      this.readData = res.data;
      this.readData = new MatTableDataSource(this.readData);
      this.readData.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.readData.filter = filterValue.trim().toLowerCase();
  }
}
