import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TexteditorComponent} from './texteditor/texteditor.component'
import {DocListComponent} from './doc-list/doc-list.component'

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
