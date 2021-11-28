import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogModalComponent} from '../../dialog-modal/dialog-modal.component';
import {DashboardService} from '../dashboard.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
//import { Ad } from '../models/ad';
import { Ad } from '../models/ad';

const ELEMENT_DATA: Ad[] = [
  {id: 1, title: "Appartement locatif", sellingPrice: 150000, description: "35 avenue charle de gaules Paris", published: false, assets: '', comment: '', tags: '', image: ''},
  {id: 2, title: "Immeuble de bureaux", sellingPrice: 200000, description: "35 avenue charle de gaules Paris", published: false, assets: '', comment: '', tags: '', image: ''},
  {id: 3, title: "Maison", sellingPrice: 400000, description: "35 avenue charle de gaules Paris", published: false, assets: '', comment: '', tags: '', image: ''},

];

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
  providers: [MatSnackBar]
})
export class AdsComponent implements OnInit {
  animal: string;
  ads: Ad[] = [];
  displayedColumns: string[] = ['id', 'title', 'price', 'image'];
  dataSource = ELEMENT_DATA;
  //dataSource : MatTableDataSource<Ad> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
        private dashboardService: DashboardService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
              ) { }

  ngOnInit(): void {
      /*this.dashboardService.getAds().subscribe((ads) => {
      this.dataSource.data = ads;
      this.dataSource.paginator = this.paginator;
      console.warn('ads', this.ads);
      });*/
  }

  openDialog(): void {
      const dialogRef = this.dialog.open(DialogModalComponent, { // todo globaliser modal
          width: '100%',
          data: new Ad(),
      });

      dialogRef.afterClosed().subscribe(result => {
        console.warn(result, 'result');
        if (result) {
            this.snackBar.open(result.success, 'Annonce ajoutée', {duration: 3000});
        }
      });
  }

  onUpdateAd(ad: Ad): void {
    const dialogRef = this.dialog.open(DialogModalComponent, {
      width: '80%',
      data: ad
    });
  }

  updateFilter(filter: any) {
    const finalFilter = filter.trim().toLowerCase();
    this.dataSource.filter = finalFilter;
  }
}
