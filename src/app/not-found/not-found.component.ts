import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UIViews, ErrorMessage } from '../app-shared/constants';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  errorMessage: string = ErrorMessage.notFoundMessage;

  constructor(private router: Router) {}

  ngOnInit() {
  }
  goToHome() {
    this.router.navigate([UIViews.dashboard]);
  }

}
