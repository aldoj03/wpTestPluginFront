import { Component, Input, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit, OnChanges {

  @Input() results:Array<any> = [];
  @Input() questions: any;
  @Output() setAction = new EventEmitter();
  
  public correctAnswers = 0;
  public incorrectAnswers = 0;
  public noAnswers = 0;
  
  constructor() { }
  
  ngOnInit(): void {
    this.calcResults();
    
  }

  ngOnChanges(){


  }
  calcResults(){
    console.log(this.questions);
    
    this.results.map((result,index)=>{
      const optionsModel:Array<any> = this.questions[index].options;

      optionsModel.map(option=>{
        console.log(option);
        
        if(option.title == result.selected && option.type ) this.correctAnswers++
        if(option.title == result.selected && !option.type ) this.incorrectAnswers++
      })

      if(result == null)  this.noAnswers ++
    })

  }


  goToResponses(){
    this.setAction.emit('responses')
  }

}
