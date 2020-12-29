import { Component, Input, OnInit, OnChanges, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TestService } from '../services/test.service';
declare const CanvasJS: any

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit, OnChanges, OnDestroy {

  @Input() results: Array<any> = [];
  @Input() questions: any;
  @Input() aprovePercentage: number = 0;
  @Output() setAction = new EventEmitter();
  @Output() reloadTest = new EventEmitter();

  public correctAnswers = 0;
  public incorrectAnswers = 0;
  public noAnswers = 0;
  public chart: any = null
  public resultsSaved: boolean = false
  public porcentaje: number | String = 0;
  public saveSubscription: Subscription | null = null;


  constructor(private testService: TestService) {

  }

  ngOnInit(): void {
    // console.log(this.aprovePercentage);


    this.calcResults();


  }

  ngOnChanges() {


  }
  calcResults() {



    this.results.map((result, index) => {
      const optionsModel: Array<any> = this.questions[index].respuestas;

      optionsModel.map(option => {


        if (option.texto == result.selected && option.checked == 'checked') this.correctAnswers++
        if (option.texto == result.selected && option.checked != 'checked') this.incorrectAnswers++
      })

      if (result.selected == null) this.noAnswers++
    })
    this.porcentaje = (this.correctAnswers * 100) / this.results.length
    this.porcentaje = this.porcentaje.toFixed(2)

    const dateObj = new Date()
    const date = `${dateObj.getDay()}/${dateObj.getMonth()}/${dateObj.getFullYear()} a las ${dateObj.getMinutes()}:${dateObj.getHours()}`
    
    const data = {
      "id_user": 1,
      "id_test": 1,
      "date": date,
      "attemps": 1,
      "completed": this.porcentaje,
      "max_performance": 1,
      "session_data": "asd"
    };


    if(!this.testService.getSavedTest){

      this.saveSubscription = this.testService.saveTest('1', data).subscribe(val => {
        if (val.status = '200') {
          this.resultsSaved = true
          this.testService.setSavedTest = true
          setTimeout(() => this.paintChart(), 500);
  
        }
      }, err => console.log(err));
    }else{
      this.resultsSaved = true
      setTimeout(() => this.paintChart(), 500);
    }

  }

  paintChart() {
    this.chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      data: [
        {

          percentFormatString: "#0.##",
          toolTipContent: "{y} (#percent%)",
          type: "doughnut",
          startAngle: -90,
          dataPoints: [
            { y: this.correctAnswers, name: "Correctas", legendText: "Correctas", color: '#009789' },
            { y: this.incorrectAnswers, name: "Incorrectas", legendText: "Incorrectas", color: ' #ff342f' },
            { y: this.noAnswers, name: "No Resueltas", legendText: "No resueltas", color: 'rgba(94, 94, 94, 0.4)' },


          ]
        }
      ]
    });


    this.chart.render();


  }

  goToResponses() {
    this.setAction.emit('responses')
  }


  resetTest() {
    this.testService.setSavedTest = false
    this.reloadTest.emit(true)
  }

  ngOnDestroy() {
    if (this.saveSubscription) this.saveSubscription.unsubscribe()
  }

}
