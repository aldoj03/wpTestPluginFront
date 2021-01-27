import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TestService } from '../services/test.service';
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  @Output() setTitle = new EventEmitter();

  public title: string = '';
  public action: string = 'test';

  public hours: number = 0;
  public min: number = 0;
  public sec: number = 0;
  public questionPageSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public quetionSubscription: any;
  public questionPage: number = 0;
  public pointsForQuestion: number = 0;
  public pointporcentaje: number = 0;
  public limitTime: string = '';
  public dataLoaded: boolean = false;
  public randomOrder: boolean = false;
  public validForm: boolean = false;
  public scoreMsj = {};

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



    this.startTest();

  }

  startTest(): void {


    const idtest = window.localStorage.getItem('idtest');
    const idUser = window.localStorage.getItem('idusuario');
    if (idtest && idUser) {
    console.log('este es el id del test: ', idtest)
    console.log('este es el id del usuario: ', idUser)
    console.log('entre datas')
      this.testService.getTest(idtest,idUser)
        .subscribe(val =>{
          console.log(val)
          if(val == 'Limite superado'){
            alert(val)
          }
          if(val && val != 'Limite superado'){

            this.initQuestions(val)
          }
        } );
    } else {
      console.log('No hay test');

    }


  }

  //  prepare form questions
  initQuestions(val: any): void {

    console.log(val);

    const test = val.test;

    if (!val.questions) { console.log('No hay preguntas'); }
    this.scoreMsj = {
      mensajeFail: test.mensajeFail,
      mensajeApproved: test.messageapproved
    };
    this.pointsForQuestion = test.pointsForQuestion;
    const questions = val.questions;
    this.title = test.subcategoriesNames[0] ? test.subcategoriesNames[0] : ''
    
    this.randomOrder = test.ordenAleatorio === 'true' ? true : false;

    this.pointporcentaje = test.pointporcentaje;
    this.questions = this.randomOrder ? [...questions.sort(() => Math.random() - 0.5)] : [...questions];



    this.emitTitle(test.name)
    this.limitTime = test.limitTimeTotalTest === 'true' && test.limitTimeCheck === 'true' ? test.inputTestTotalExam : '';



    const questionsArray = new FormArray([]);
    this.questions.map(question => {
      const optionsArray = new FormArray([]);
      const options: Array<any> = question.respuestas;
      this.selectedOptions.push({ selected: null });
      options.map(option => {
        optionsArray.push(new FormControl(option.texto));
      });
      questionsArray.push(optionsArray);
      this.optionsForm.controls.options = questionsArray;
    });


    setTimeout(() => this.dataLoaded = true, 3000);


    this.quetionSubscription = this.questionPageSubject.subscribe(val => this.questionPage = val);

    if (this.limitTime) { this.initTime(); }


  }

  initTime(): void {


    this.hours = Number(this.limitTime.substr(0, 2));
    this.min = Number(this.limitTime.substr(3, 4));
    this.sec = 0;
    console.log('min',this.min);
    console.log('hours',this.hours);
    
    //  this.questionPageSubject.unsubscribe()
    const interval = setInterval(() => {

      if (this.sec !== 0) {
        this.sec--;
      } else {
        this.sec = 59;
        if(this.min == 0){
          this.min = 59;
          this.hours--
        }else{
          
          this.min--;
        }
      }

      //  test finished
      if (this.hours === 0 && this.min === 0 && this.sec === 0 || this.questionPage === this.questions.length) {
        clearInterval(interval);
        const reasson = this.questionPage === this.questions.length ? 'completed' : 'time expired';
        this.finishTest(reasson);
      }

    }, 1000);


  }

  onSubmit(): void {
    this.validForm = false;
    const newPageValue = this.questionPageSubject.value + 1;
    this.questionPageSubject.next(newPageValue);


  }


  activateForm(): void {
    this.validForm = true;
  }

  skipQuestion(): void {
    const newPageValue = this.questionPageSubject.value + 1;
    this.questionPageSubject.next(newPageValue);
    // if (this.questionPageSubject.value == this.questions.length) console.log(this.selectedOptions);
  }

  // set action to switch
  setAction(action: string): void {
    this.action = action;
  }

resetTest(event: any): void {
    this.title = '';
    this.action = 'test';
   

      this.hours = 0;
      this.min = 0;
      this.questionPageSubject.next(0);
      this.limitTime = '';
      this.dataLoaded = false;
  
      this.validForm = false;
  
      this.optionsForm = new FormGroup({
        options: new FormArray([])
      });
  
      this.selectedOptions = [];
  
      this.questions = Array();
      this.startTest();
  }

  finishTest(reasson: string): void {


    if (reasson === 'time expired') { alert('Tiempo límite expirado'); }
    this.questionPageSubject.next(this.questions.length);
    this.quetionSubscription?.unsubscribe();
  }


  emitTitle(title:string){
    this.setTitle.emit(title)
  }


}
