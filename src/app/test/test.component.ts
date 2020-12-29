import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TestService } from '../services/test.service';
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public title: String = 'Esta es la pregunta';
  public action: String = 'test';

  public min: number = 0;
  public sec: number = 0;
  public questionPageSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public quetionSubscription:any;
  public questionPage: number = 0;
  public pointsForQuestion: number = 0;
  public pointporcentaje: number = 0;
  public limitTime: String = '';
  public dataLoaded: boolean = false;

  public validForm: boolean = false;

  public optionsForm: FormGroup = new FormGroup({
    options: new FormArray([])
  });

  public selectedOptions: Array<any> = [];

  public questions: Array<any> = Array();

  constructor(
    private testService: TestService
  ) {

  }

  ngOnInit(): void {

    

    this.startTest()

  }

  startTest() {

    // const val = {
    //   "id": "18",
    //   "name": "Matematicaas",
    //   "session_data": "",
    //   "element_data": {
    //     "date": "11/19/20 a las 3:19pm",
    //     "name": "Matematicaas",
    //     "time": "10:30",
    //     "categories": [
    //       1,
    //       3,
    //       5
    //     ],
    //     "subcategories": [
    //       1,
    //       4,
    //       5
    //     ],
    //     "maxlimit": 0,
    //     "level": [
    //       {
    //         "low": true
    //       },
    //       {
    //         "medium": false
    //       },
    //       {
    //         "high": false
    //       }
    //     ],
    //     "orderRandom": true,
    //     "question": [
    //       {
    //         "id": "1",
    //         "title": "(1)¿Cuáles de los siguientes triángulos, según sus medidas son rectángulos?",
    //         "point": 32,
    //         "options": [
    //           {
    //             "title": "5 cm, 12 cm, 13 cm ",
    //             "type": true
    //           },
    //           {
    //             "title": "7 cm, 4 cm, 6 cm",
    //             "type": false
    //           }
    //         ]
    //       },
    //       {
    //         "id": "2",
    //         "title": "(2)7/5 + 2/3 - 1 =",
    //         "point": 32,
    //         "options": [
    //           {
    //             "title": "17/15",
    //             "type": false
    //           },
    //           {
    //             "title": "16/15",
    //             "type": true
    //           }
    //         ]
    //       },
    //       {
    //         "id": "3",
    //         "title": "(3)¿A cuánto equivale π?",
    //         "point": 32,
    //         "options": [
    //           {
    //             "title": "3,141592",
    //             "type": true
    //           },
    //           {
    //             "title": "3,149215",
    //             "type": false
    //           }
    //         ]
    //       },
    //       {
    //         "id": "4",
    //         "title": "(4)¿A cuánto equivale π?",
    //         "point": 32,
    //         "options": [
    //           {
    //             "title": "3,141592",
    //             "type": true
    //           },
    //           {
    //             "title": "3,149215",
    //             "type": false
    //           }
    //         ]
    //       },
    //       {
    //         "id": "5",
    //         "title": "(5)¿A cuánto equivale π?",
    //         "point": 32,
    //         "options": [
    //           {
    //             "title": "3,141592",
    //             "type": true
    //           },
    //           {
    //             "title": "3,149215",
    //             "type": false
    //           }
    //         ]
    //       },
    //       {
    //         "id": "6",
    //         "title": "(6)¿A cuánto equivale π?",
    //         "point": 32,
    //         "options": [
    //           {
    //             "title": "3,141592",
    //             "type": true
    //           },
    //           {
    //             "title": "3,149215",
    //             "type": false
    //           }
    //         ]
    //       },
    //       {
    //         "id": "7",
    //         "title": "(7)¿A cuánto equivale π?",
    //         "point": 32,
    //         "options": [
    //           {
    //             "title": "3,141592",
    //             "type": true
    //           },
    //           {
    //             "title": "3,149215",
    //             "type": false
    //           }
    //         ]
    //       },
    //       {
    //         "id": "8",
    //         "title": "(8)¿A cuánto equivale π?",
    //         "point": 32,
    //         "options": [
    //           {
    //             "title": "3,141592",
    //             "type": true
    //           },
    //           {
    //             "title": "3,149215",
    //             "type": false
    //           }
    //         ]
    //       },



    //     ]
    //   }
    // }

    // this.testService.getTest('2')
    //   .pipe(map(val => JSON.parse(val.element_data)))
    //   .subscribe(val => this.initQuestions(val))
    this.testService.getTest('1')
      .subscribe(val => this.initQuestions(val))

    // this.initQuestions(val.element_data);

  }

  //prepare form questions
  initQuestions(val: any) {

    console.log(val);
    
    const test = val.test;
    if(!val.questions) console.log('No hay preguntas');
    this.pointsForQuestion = test.pointsForQuestion
    const questions = val.questions[0]

    const random = test.ordenAleatorio == 'true' ? true : false;

    this.pointporcentaje = test.pointporcentaje
    this.questions = random ? [...questions.sort(() => Math.random() - 0.5)] : [...questions];



    this.title = test.name;
    this.limitTime = test.limitTimeTotalTest == 'true' &&  test.limitTimeCheck == 'true' ? test.inputTestTotalExam : '';



    let questionsArray = new FormArray([]);
    this.questions.map(question => {
      let optionsArray = new FormArray([]);
      const options: Array<any> = question.respuestas;
      this.selectedOptions.push({ selected: null });
      options.map(option => {
        optionsArray.push(new FormControl(option['texto']))
      });
      questionsArray.push(optionsArray)
      this.optionsForm.controls.options = questionsArray
    })


    setTimeout(() => {

      this.dataLoaded = true
    }, 3000);

    if(test.inputTestTotalExam) this.initTime();


  }

  initTime() {


    this.min = Number(this.limitTime.substr(0, 2))
    this.sec = Number(this.limitTime.substr(3, 4))
    //  this.questionPageSubject.unsubscribe()
    this.quetionSubscription = this.questionPageSubject.subscribe(val => this.questionPage = val)
    const interval = setInterval(() => {

      if (this.sec != 0) {
        this.sec--
      } else {
        this.sec = 59
        this.min--
      }

      //test finished
      if (this.min == 0 && this.sec == 0 || this.questionPage == this.questions.length) {
        clearInterval(interval)
        const reasson = this.questionPage == this.questions.length ? 'completed' : 'time expired'
        this.finishTest(reasson)
      }

    }, 1000);


  }

  onSubmit() {
    this.validForm = false;
    const newPageValue = this.questionPageSubject.value + 1
    this.questionPageSubject.next(newPageValue)


  }


  activateForm() {
    this.validForm = true
  }

  skipQuestion() {
    const newPageValue = this.questionPageSubject.value + 1
    this.questionPageSubject.next(newPageValue)
    if (this.questionPageSubject.value == this.questions.length) console.log(this.selectedOptions);
  }

  //set action to switch
  setAction(action: String) {
    this.action = action
  }

  resetTest(event: any) {
    this.title = 'Esta es la pregunta';
    this.action = 'test';

    this.min = 0;
    this.sec = 0;
    this.questionPageSubject.next(0);
    this.limitTime = '';
    this.dataLoaded = false;

    this.validForm = false;

    this.optionsForm = new FormGroup({
      options: new FormArray([])
    });

    this.selectedOptions = [];

    this.questions = Array();
    this.startTest()
  }

  finishTest(reasson: String) {

    
    if (reasson == 'time expired') alert('Tiempo límite expirado')
    this.questionPageSubject.next(this.questions.length)
   this.quetionSubscription?.unsubscribe()
  }

  
}
