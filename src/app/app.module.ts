import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from '../app/not-found-component/not-found-component.component';
import { AppComponent } from './app.component';
import { ArticleComponent } from '../app/article/article.component';
import { MainComponent } from '../app/main/main.component';
import { ItemComponent } from '../app/item/item.component';
import { ItemDetailsComponent } from '../app/item-details/item-details.component';
import { PuzzleComponent } from '../app/puzzle/puzzle.component';
import { OnAComponent } from '../app/puzzle/on-a/on-a.component';
import { OnBComponent } from '../app/puzzle/on-b/on-b.component';
import { OnCComponent } from '../app/puzzle/on-c/on-c.component';
import { OnDComponent } from '../app/puzzle/on-d/on-d.component';

const itemRoutes: Routes = [
  { path: 'details', component: ItemDetailsComponent },
];

const puzzleRoutes: Routes = [
  //{ path: 'on-c', component: OnCComponent },
  { path: 'on-a', outlet: 'a-outlet', component: OnAComponent },
  { path: 'on-b', outlet: 'b-outlet', component: OnBComponent },
];

const routes: Routes = [
  { path: 'puzzle', component: PuzzleComponent, children: puzzleRoutes },
  { path: 'articles', component: ArticleComponent },
  { path: 'articles/item/:id', component: ItemComponent },
  { path: 'articles/item/:id', component: ItemComponent, children: itemRoutes },
  { path: '', component: MainComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [
    OnAComponent,
    OnBComponent,
    OnCComponent,
    OnDComponent,
    PuzzleComponent,
    AppComponent,
    ArticleComponent,
    MainComponent,
    ItemComponent,
    NotFoundComponent,
    ItemDetailsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
