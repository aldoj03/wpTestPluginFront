import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit, OnChanges {

  @Input() answers: Array<any> = [];
  @Input() title: String = '';
  @Input() selectedOptions: any = '';
  @Output() onChange = new EventEmitter();
  @Input() questionPage: number = 0;
  @Input() img: String = '';
  @Input() randomOrder: boolean = false;
  letra = ['A', 'B', 'C', 'D']; 

  constructor() { }

  ngOnInit(): void {
    console.log('random options', this.randomOrder);
    console.log('Console', this.letra[0])
  }

  change() {
    // console.log(this.selectedOptions);

    this.onChange.emit(true)
  }

  ngOnChanges(v: any) {
    this.answers = this.randomOrder ? [...this.answers.sort(() => Math.random() - 0.5)] : [...this.answers];


  }

}
