import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardItemComponent } from './card-item/card-item.component';

@NgModule({
  declarations: [CardItemComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
