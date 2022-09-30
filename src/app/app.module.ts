import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ArticleComponent,
  },
  {
    path: 'article',
    component: ArticleComponent,
    children: [
      {
        path: 'article/:id',
        component: ArticleComponent,
      },
    ],
  },
];

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ArticleComponent } from '../app/article/article.component';
import { MainComponent } from '../app/main/main.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule],
  declarations: [AppComponent, HelloComponent, ArticleComponent, MainComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
