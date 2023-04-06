import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  template: ``,
  styles: [],
})
export class UserComponent implements OnInit {
  @Input() user;

  ngOnInit(): void {}
}
