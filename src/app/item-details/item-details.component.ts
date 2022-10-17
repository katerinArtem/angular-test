import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnDestroy {
  private querySubscription: Subscription;
  constructor(
    private activateRoute: ActivatedRoute,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.querySubscription = route.queryParams.subscribe((queryParam: any) => {
      this.image = queryParam['image'];
    });
  }
  public errorMsg: string = '';
  imgErrorHandler(event) {
    this.errorMsg = 'some error occured';
  }
  @Input() image: any | undefined;
  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
