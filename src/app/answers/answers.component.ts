import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  @Input() answers :Array<any> = [];
  @Input() title :String = '';
  @Input() selectedOptions :any = '';
  @Output() onChange= new EventEmitter();
  @Input() questionPage:number=  0;
  @Input() img:String =  '';

  constructor() { }

  ngOnInit(): void {
    
  }

  change(){
    this.onChange.emit(true)
  }

}
