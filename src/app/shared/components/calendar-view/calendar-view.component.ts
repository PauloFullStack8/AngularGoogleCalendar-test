import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { transferArrayItem } from '@angular/cdk/drag-drop';

interface IItem {
  date: Date;
  appointments: IAppointment[];
}

interface IAppointment {
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  description: string;
  position: number;
}

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent {
  appointments: any[] = [];

  dates: any[] = [];

  items: IItem[] = [];

  private subscription: Subscription;

  constructor(private appointmentService: AppointmentService) {
    this.subscription = appointmentService.appointments.subscribe((_value: IAppointment) => {
      if (_value == null) return;

      this.items.map((item: IItem) => {
        if (item?.date.getDate() === _value?.date.getDate()) {
          item.appointments?.push(_value);
        }
      });

      console.log(this.items);
    });
  }

  ngOnInit() {
    this.generateDates();
    let obj: IItem = {} as IItem;
    let _items: IItem[] = [];

    this.dates.forEach((date) => {
      obj = {
        date,
        appointments: [],
      };

      _items.push(obj);
    });

    this.items = [..._items];
  }

  generateDates() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const numDaysInMonth = new Date(year, month + 1, 0).getDate();
    const _dates = [];

    for (let day = 1; day <= numDaysInMonth; day++) {
      _dates.push(new Date(year, month, day));
    }

    this.dates = _dates;
  }

  onAppointmentDragEnded(event: any, items: IItem[], itemWithAppointmentIndex: number) {
    const eventTarget = event.source.element.nativeElement;
    const itemWithAppointmentContainer = eventTarget.parentElement;
    const itemWithAppointmentContainerRect = itemWithAppointmentContainer!.getBoundingClientRect();
    const itemWithAppointmentContainerOffsetY = itemWithAppointmentContainerRect.top;
    const itemWithAppointmentHeight = eventTarget.offsetHeight;
    const itemToMoveAppointmentContainer = eventTarget.parentElement!.parentElement;
    const itemToMoveAppointmentContainerRect = itemToMoveAppointmentContainer!.getBoundingClientRect();
    const itemToMoveAppointmentContainerOffsetY = itemToMoveAppointmentContainerRect!.top;
    const itemToMoveAppointmentNewIndex = Math.round(
      (event.distance.y +
        itemToMoveAppointmentContainerOffsetY -
        itemWithAppointmentContainerOffsetY -
        itemWithAppointmentHeight / 2) /
        itemWithAppointmentHeight
    );
    let itemToMoveAppointmentFinalIndex = itemWithAppointmentIndex + itemToMoveAppointmentNewIndex;

    if (itemToMoveAppointmentNewIndex < 0) {
      itemToMoveAppointmentFinalIndex = itemWithAppointmentIndex + itemToMoveAppointmentNewIndex + 1;
    }

    transferArrayItem(
      items[itemWithAppointmentIndex].appointments,
      items[Math.abs(itemToMoveAppointmentFinalIndex)].appointments,
      itemWithAppointmentIndex,
      itemToMoveAppointmentFinalIndex
    );
  }

  deleteAppointment(appointment: any) {
    this.items.forEach((item) => {
      const index = item.appointments.indexOf(appointment);
      if (index !== -1) {
        item.appointments.splice(index, 1);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
