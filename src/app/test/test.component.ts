import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TestService } from '../services/test.service';
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
  public questionPage: number = 0;
  public limitTime: boolean = false;
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
    this.initTime();

    // this.testService.getTest('17')
    //   .pipe(map(val => JSON.parse(val.element_data)))
    //   .subscribe(val => this.initQuestions(val))

    const val = {
      "id": "18",
      "name": "Matematicaas",
      "session_data": "",
      "element_data": {
        "date": "11/19/20 a las 3:19pm",
        "name": "Matematicaas",
        "time": "30",
        "categories": [
          1,
          3,
          5
        ],
        "subcategories": [
          1,
          4,
          5
        ],
        "maxlimit": 0,
        "level": [
          {
            "low": true
          },
          {
            "medium": false
          },
          {
            "high": false
          }
        ],
        "orderRandom": true,
        "question": [
          {
            "id": "1",
            "title": "Que vino primero la galiisna o el huevo",
            "point": 32,
            "options": [
              {
                "title": "la gallina",
                "type": true
              },
              {
                "title": "el huevo",
                "type": false
              }
            ]
          },
          {
            "id": "2",
            "title": "Que vino primero la galiisna o el huevo",
            "point": 32,
            "options": [
              {
                "title": "la gallina",
                "type": true
              },
              {
                "title": "el huevo",
                "type": false
              }
            ]
          },
          {
            "id": "1",
            "title": "Que vino primero la galiisna o el huevo",
            "point": 32,
            "options": [
              {
                "title": "la gallina",
                "type": true
              },
              {
                "title": "el huevo",
                "type": false
              }
            ]
          },
          {
            "id": "1",
            "title": "Que vino primero la galiisna o el huevo",
            "point": 32,
            "options": [
              {
                "title": "la gallina",
                "type": true
              },
              {
                "title": "el huevo",
                "type": false
              }
            ]
          },
          {
            "id": "1",
            "title": "Que vino primero la galiisna o el huevo",
            "point": 32,
            "options": [
              {
                "title": "la gallina",
                "type": true
              },
              {
                "title": "el huevo",
                "type": false
              }
            ]
          },
          {
            "id": "1",
            "title": "Que vino primero la galiisna o el huevo",
            "point": 32,
            "options": [
              {
                "title": "la gallina",
                "type": true
              },
              {
                "title": "el huevo",
                "type": false
              }
            ]
          },
        ]
      }
    }

   
    this.initQuestions(val.element_data);

  }

  initQuestions(val: any) {
    console.log(val);
    
    const random = val.orderRandom;


    this.questions = random ? [...val.question.sort(() => Math.random() - 0.5)] : [...val.question];
   
    

    this.title = val.name;
    this.limitTime = val.time;



    let questionsArray = new FormArray([]);
    this.questions.map(question => {
      let optionsArray = new FormArray([]);
      const options: Array<any> = question['options'];
      this.selectedOptions.push({ selected: null });
      options.map(option => {
        optionsArray.push(new FormControl(option['title']))
      });
      questionsArray.push(optionsArray)
      this.optionsForm.controls.options = questionsArray
    })


    setTimeout(() => {
      
      this.dataLoaded = true
    }, 3000);


  }

  initTime() {

    const end: any = new Date('12/17/2100 9:30 AM');

    const _second = 1000;
    const _minute = _second * 60;
    const _hour = _minute * 60;
    let timer: any = 0;



    timer = setInterval(() => {
      const now: any = new Date();
      const distance = end - now;
      if (distance < 0) {

        clearInterval(timer);
        alert('expired')

        return;
      }
      this.min = Math.floor((distance % _hour) / _minute);
      this.sec = Math.floor((distance % _minute) / _second);


    }, 1000);

  }

  onSubmit() {
    this.validForm = false;
    this.questionPage++


  }


  activateForm() {
    this.validForm = true
  }

  skipQuestion() {
    this.questionPage++
    if(this.questionPage  == this.questions.length) console.log(this.selectedOptions);
  }

  setAction(action:String){
    this.action = action
  }

}
