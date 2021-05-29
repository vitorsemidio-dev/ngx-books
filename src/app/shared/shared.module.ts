import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardItemComponent } from './card-item/card-item.component';
import { AsideItemComponent } from './aside-item/aside-item.component';

@NgModule({
  declarations: [CardItemComponent, AsideItemComponent],
  imports: [CommonModule, RouterModule],
  exports: [CardItemComponent, AsideItemComponent],
})
export class SharedModule {}
