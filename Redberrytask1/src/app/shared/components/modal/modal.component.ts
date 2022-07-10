import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() errorMessage: string = 'please enter valid email adress';
  @Input() errorType: string = 'email';
  constructor() {}

  ngOnInit(): void {}
}
