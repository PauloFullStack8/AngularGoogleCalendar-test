import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
})
export class TimePickerComponent {
  @Input() selectedTime!: string;
  @Output() timeSelected = new EventEmitter<string>();

  hour: string = '';
  minute: string = '';

  ngOnInit() {
    this.setTime(this.selectedTime);
  }

  incrementHour() {
    let hour = Number(this.hour);
    hour = (hour + 1) % 24;
    this.setTime(hour.toString() + ':' + this.minute);
  }

  decrementHour() {
    let hour = Number(this.hour);
    hour = (hour - 1 + 24) % 24;
    this.setTime(hour.toString() + ':' + this.minute);
  }

  incrementMinute() {
    let minute = Number(this.minute);
    minute = (minute + 1) % 60;
    this.setTime(this.hour + ':' + minute.toString());
  }

  decrementMinute() {
    let minute = Number(this.minute);
    minute = (minute - 1 + 60) % 60;
    this.setTime(this.hour + ':' + minute.toString());
  }

  setTime(time: string) {
    const parts = time.split(':');
    this.hour = parts[0].padStart(2, '0');
    this.minute = parts[1].padStart(2, '0');
    this.timeSelected.emit(time);
  }
}
