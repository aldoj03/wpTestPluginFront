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

  public min: number = 0;
  public sec: number = 0;
  public questionPage: number = 0;
  public limitTime: boolean = false;
  public dataLoaded: boolean = false;

  public optionsForm: FormGroup = new FormGroup({
    options: new FormArray([])
  });

  public selectedOptions:Array<any> = [];

  public questions: Array<any> = [];

  constructor(
    private testService: TestService
  ) {

  }

  ngOnInit(): void {
    this.initTime();

    this.testService.getTest('17')
      .pipe(map(val => JSON.parse(val.element_data)))
      .subscribe(val => this.initQuestions(val))



  }

  initQuestions(val: any) {

    const random = val.orderRandom;

    this.questions = random ? val.question.sort(() => Math.random() - 0.5) : val.question;
    this.title = val.name;
    this.limitTime = val.time;



    let questionsArray = new FormArray([]);

    this.questions.forEach(question => {
      let optionsArray = new FormArray([]);
      const options: Array<any> = question['options'];
      options.forEach(option => {
        this.selectedOptions.push({selected: false});
        optionsArray.push(new FormControl(option['title']))
      });
      this.questions.push(question)
      questionsArray.push(optionsArray)
      this.optionsForm.controls.options = questionsArray
    })

    console.log(this.optionsForm);

    this.dataLoaded = true


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

      console.log(this.selectedOptions);
      

  }



}
