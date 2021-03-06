import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { AutServiceService } from '@app/_services/aut-service.service';
import { AuthenticationService } from '@app/_services/authentication.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DashboardService} from "./dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  opened = true;
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  users: any[] = [];
  admin: boolean;
  secretaire: Boolean;

    constructor(private dashboardService: DashboardService, public autService: AutServiceService) { }

    ngOnInit(): void {
        /*this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
        this.dashboardService.getUsers().subscribe((user) => {
            this.users = user;
            console.warn(this.users);
        });*/
      if (this.autService.loggedUserRole === 'admin') {
        this.admin = true;
      }
      if (this.autService.loggedUserRole === 'secretaire') {
        this.secretaire = true;
      }
    }
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
    logout() {
      //this.autService.logout()
    }
}
