import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TexteditorComponent } from './texteditor/texteditor.component';
import { DocListComponent } from './doc-list/doc-list.component';
import { HttpClientModule } from '@angular/common/http';
import { DocSelectionChangedService } from './doc-selection-changed.service';

@NgModule({
  declarations: [
    AppComponent,
    TexteditorComponent,
    DocListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
