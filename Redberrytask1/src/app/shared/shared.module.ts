import { NgModule } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [NavbarComponent, ModalComponent],
  exports: [NavbarComponent, ModalComponent],
})
export class SharedModule {}
