import {
  ViewChild,
  ViewContainerRef,
  Input,
  Component,
  OnInit,
  AfterContentInit,
  AfterViewInit,
  AfterContentChecked,
  DoCheck,
  OnDestroy,
  OnChanges,
  QueryList,
  ComponentRef,
  SimpleChanges,
  ViewEncapsulation,
  AfterViewChecked,
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
  encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent implements OnDestroy, AfterViewInit, OnInit {
  constructor(public router: Router, private httpClient: HttpClient) {}
  public maxItems: number;
  public url: string;
  public saveFlag: boolean;
  private viewList: Array<ComponentRef<ItemComponent>>;
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;
  _createComponent(isLocal) {
    while (this.viewList.length >= this.maxItems) {
      this.container.remove(0);
      this.viewList.shift();
      console.log(this.viewList);
      this.viewList.forEach((item) => {
        item.instance.id = item.instance.id - 1;
      });
    }
    const ItemComponentRef = this.container.createComponent(ItemComponent);

    this.viewList.push(ItemComponentRef);

    ItemComponentRef.instance.id = this.container.length;
    //https://api.waifu.im/random/?is_nsfw=false&full=false ['images'][0]['url']
    //https://foodish-api.herokuapp.com/api/ ['image']
    //https://random.dog/woof.json ['url']
    //https://nekos.best/api/v2/neko ['results'][0]['url']
    if (isLocal) ItemComponentRef.instance.image = this.url;
    else
      this.httpClient
        .get('https://random.dog/woof.json', {
          headers: {
            accept: 'application/json',
          },
        })
        .subscribe((response) => {
          ItemComponentRef.instance.image = response['url'];
        });
  }
  saveFlagOnChange() {
    localStorage.removeItem('saveFlag');
    localStorage.setItem('saveFlag', JSON.stringify(this.saveFlag));
    if (this.saveFlag) {
      const imageCash: Array<String> = [];
      this.viewList.forEach((item) => {
        imageCash.push(item.instance.image);
      });
      localStorage.setItem('imageCash', JSON.stringify(imageCash));
    }
  }
  ngOnInit() {
    this.saveFlag = JSON.parse(localStorage.getItem('saveFlag'));
    this.viewList = [];
    this.maxItems = 3;
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
