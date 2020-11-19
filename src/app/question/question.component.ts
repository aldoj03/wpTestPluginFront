import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() answers :Array<any> = [];
  @Input() title :String = '';

  constructor() { }

  ngOnInit(): void {
  }

}
