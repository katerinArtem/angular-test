import {
  ViewChild,
  ViewContainerRef,
  Input,
  Component,
  OnInit,
  AfterContentInit,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  QueryList,
  ComponentRef,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ItemComponent } from '../item/item.component';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnDestroy, AfterViewInit {
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    this.saveFlag = JSON.parse(localStorage.getItem('saveFlag'));
    this.viewList = [];
  }
  public saveFlag;
  private viewList: Array<ComponentRef<ItemComponent>>;
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;
  _createComponent() {
    if (this.viewList.length > 2) {
      this.container.remove(0);
      this.viewList.shift();
      this.viewList.forEach((item) => {
        item.instance.id = item.instance.id - 1;
      });
    }

    const ItemComponentRef = this.container.createComponent(ItemComponent);

    this.viewList.push(ItemComponentRef);

    this.httpClient
      .get('https://foodish-api.herokuapp.com/api/')
      .subscribe((response) => {
        ItemComponentRef.instance.image = response['image'];
        ItemComponentRef.instance.id = this.container.length;

        if (this.saveFlag) {
          const imageCash: Array<String> = [];
          this.viewList.forEach((item) => {
            imageCash.push(item.instance.image);
          });
          localStorage.setItem('imageCash', JSON.stringify(imageCash));
        }
      });
  }
  saveFlagOnChange() {
    localStorage.removeItem('saveFlag');
    localStorage.setItem('saveFlag', JSON.stringify(this.saveFlag));
  }
  ngAfterViewInit() {
    if (this.saveFlag) {
      const imageCash: Array<String> = JSON.parse(
        localStorage.getItem('imageCash')
      );
      imageCash.forEach((item) => {
        const ItemComponentRef = this.container.createComponent(ItemComponent);
        ItemComponentRef.instance.id = this.viewList.length + 1;
        ItemComponentRef.instance.image = item;
        this.viewList.push(ItemComponentRef);
      });
    } else {
      localStorage.removeItem('imageCash');
    }
  }
  ngOnDestroy(): void {
    localStorage.removeItem('imageCash');
    if (this.saveFlag) {
      const imageCash: Array<String> = [];
      this.viewList.forEach((item) => {
        imageCash.push(item.instance.image);
      });
      localStorage.setItem('imageCash', JSON.stringify(imageCash));
    }
  }
}
