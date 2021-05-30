import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CardItemComponent } from './card-item/card-item.component';
import { AsideItemComponent } from './aside-item/aside-item.component';
import { ImgItemComponent } from './img-item/img-item.component';

@NgModule({
  declarations: [CardItemComponent, AsideItemComponent, ImgItemComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [CardItemComponent, AsideItemComponent, ImgItemComponent],
})
export class SharedModule {}
