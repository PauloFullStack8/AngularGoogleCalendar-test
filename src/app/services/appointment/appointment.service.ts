import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  appointments: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {}

  setAppointments(value: any) {
    this.appointments.next(value);
  }
}
