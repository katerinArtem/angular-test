import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ItemComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription;
  private querySubscription: Subscription;
  constructor(
    private activateRoute: ActivatedRoute,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.routeSubscription = activateRoute.params.subscribe(
      (params) => (this.id = params['id'])
    );
    this.querySubscription = route.queryParams.subscribe((queryParam: any) => {
      this.image = queryParam['image'];
    });
  }
  @Input() id: number | undefined;
  @Input() image: any | undefined;
  ngOnInit() {}

  expand() {
    this.router.navigate(['articles/item/' + this.id.toString() + '/details'], {
      queryParams: {
        image: this.image,
      },
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.querySubscription.unsubscribe();
  }
}
