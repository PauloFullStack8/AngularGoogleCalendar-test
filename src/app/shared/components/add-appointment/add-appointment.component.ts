import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss'],
})
export class AddAppointmentComponent {
  appointmentForm: FormGroup;

  @Input() selectedTime?: string;
  @Output() timeSelected = new EventEmitter<string>();

  constructor(private appointmentService: AppointmentService) {
    this.appointmentForm = new FormGroup({
      title: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      description: new FormControl(),
    });
  }

  onSubmit() {
    const appointment = {
      ...this.appointmentForm.value,
      position: 0,
    };

    this.appointmentService.setAppointments(appointment);
  }

  onTimeSelected(time: string) {
    this.selectedTime = time;
    this.appointmentForm.get('startTime')?.setValue(time);
  }
}
