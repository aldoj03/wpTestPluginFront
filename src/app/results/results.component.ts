import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input() selectedOptions: Array<any> = [];
  @Input() questions: Array<any> = [];
  @Input() title: any;
  @Output() scoreEmitter: EventEmitter<String> = new EventEmitter();

  public questionsToShow: Array<any> = [];
  public questionPages: Array<Array<any>> = [[]];
  public page: number = 0;
  public totalPages: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.showResults()
    
  }

  showResults() {

    this.questions.forEach((question, index) => {
      const options: Array<any> = question.options;
      const correctOption = options.filter(val => val.type)[0].title

      const selectedOption = this.selectedOptions[index].selected
      const id = index + 1
      const correct = correctOption == selectedOption ? true : false
      this.questionsToShow.push({
        title: question.title,
        correctOption,
        selectedOption,
        correct,
        id
      });
    })

    console.log(this.questionsToShow);
    this.sortQuestionsPerPage()
  }


  sortQuestionsPerPage() {
    console.log(this.questionPages);



    let arrayLocal:Array<any> = []

    this.questionsToShow.forEach((val, index) => {

      if ((index + 1) % 3 != 0 || index == 0) {
        arrayLocal.push(val)
        this.questionPages[this.totalPages] = arrayLocal

      } else {
        this.totalPages ++
        arrayLocal.push(val)
        this.questionPages[this.totalPages] = arrayLocal
        arrayLocal = []
      }

    })

     console.log(this.questionPages);
     

  }

  nextPage(){
    this.page++

  }
  prevPage(){
    this.page--
  }

  goScore(){
    this.scoreEmitter.emit('test')
  }
}


