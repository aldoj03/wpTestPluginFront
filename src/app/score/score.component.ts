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
  public porcentaje: number | string = 0;
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


    console.log(this.results);

    this.results.map((result, index) => {
      const optionsModel: Array<any> = this.questions[index].respuestas;

      optionsModel.map((option, i) => {


        if (i == result.selected && option.checked == 'checked') this.correctAnswers++
        if (i == result.selected && option.checked != 'checked') this.incorrectAnswers++
      })

      if (result.selected == null) this.noAnswers++
    })
    this.porcentaje = (this.correctAnswers * 100) / this.results.length
    this.porcentaje = Number(this.porcentaje.toFixed(2))



    if (!this.testService.getSavedTest) {

      this.saveTest()
      
      console.log('guardar test');
      
    } else {
      console.log('test resultados sin guardar');
      
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

  saveTest() {
    const idtest = window.localStorage.getItem('idtest')
    const dateObj = new Date()
    const date = `${dateObj.getDay()}/${dateObj.getMonth()}/${dateObj.getFullYear()} a las ${dateObj.getMinutes()}:${dateObj.getHours()}`
    const idUser = window.localStorage.getItem('idusuario');
    if (idUser && idtest) {
      const data = {
        "id_user": idUser,
        "id_test": idtest,
        "date": date,
        "attemps": 1,
        "completed": this.porcentaje.toString(),
        "max_performance": 1,
        "session_data": "asd"
      };

      console.log('object to save', data);
      

      this.saveSubscription = this.testService.saveTest(idtest, data).subscribe(val => {
        console.log(val);
        
        if (val.status == '200') {
          this.resultsSaved = true
          this.testService.setSavedTest = true
          setTimeout(() => this.paintChart(), 500);

        }
      }, err => console.log(err));
    }
  }

}
