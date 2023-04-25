import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';

import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  imports: [SharedModule, PagesRoutingModule],
  declarations: [PagesComponent, CalendarComponent],
})
export class PagesModule {}
