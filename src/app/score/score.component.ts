import { Component, Input, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
declare const CanvasJS: any

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit, OnChanges {

  @Input() results: Array<any> = [];
  @Input() questions: any;
  @Output() setAction = new EventEmitter();
  @Output() reloadTest = new EventEmitter();

  public correctAnswers = 0;
  public incorrectAnswers = 0;
  public noAnswers = 0;
  public chart: any = null
  public porcentaje: number | String = 0;
  constructor() { }

  ngOnInit(): void {



    this.calcResults();


  }

  ngOnChanges() {


  }
  calcResults() {
    // console.log(this.questions);

    this.results.map((result, index) => {
      const optionsModel: Array<any> = this.questions[index].options;

      optionsModel.map(option => {
        // console.log(option);

        if (option.title == result.selected && option.type) this.correctAnswers++
        if (option.title == result.selected && !option.type) this.incorrectAnswers++
      })

      if (result.selected == null) this.noAnswers++
    })

      this.paintChart()

  }

  paintChart(){
    this.chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      data: [
        {
          
          percentFormatString: "#0.##",
          toolTipContent: "{y} (#percent%)",
          type: "doughnut",
          startAngle:  -90,
          dataPoints: [
            { y: this.correctAnswers, name: "Correctas", legendText: "Correctas", color: '#009789' },
            { y: this.incorrectAnswers, name: "Incorrectas", legendText: "Incorrectas", color: ' #ff342f' },
            { y: this.noAnswers, name: "No Resueltas", legendText: "No resueltas", color: 'rgba(94, 94, 94, 0.4)' },


          ]
        }
      ]
    });

    this.porcentaje = (this.correctAnswers * 100)   / this.results.length
    this.porcentaje = this.porcentaje.toFixed(2)
    this.chart.render();

  }

  goToResponses() {
    this.setAction.emit('responses')
  }


  resetTest(){
    this.reloadTest.emit(true)
  }

}
