import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input() selectedOptions: Array<any> = [];
  @Input() questions: Array<any> = [];
  @Input() title: any;

  public questionsToShow: Array<any> = [];
  public questionPages: Array<Array<any>> = [[]];
  public pages: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.showResults()
    this.questionPages[0] = [null]
  }

  showResults() {

    this.questions.forEach((question, index) => {
      const options: Array<any> = question.options;
      const correctOption = options.filter(val => val.type)[0].title

      const selectedOption = this.selectedOptions[index].selected

      const correct = correctOption == selectedOption ? true : false
      this.questionsToShow.push({
        title: question.title,
        correctOption,
        selectedOption,
        correct
      });
    })

    console.log(this.questionsToShow);
    this.sortQuestionsPerPage()
  }


  sortQuestionsPerPage() {
    console.log(this.questionPages);


    const pages = Math.ceil(this.pages / 3);


    this.questions.forEach((val, index) => {

      if (index % 3 != 1) {

        this.questionPages[0] = [...this.questionPages[0],val]
        console.log(this.questionPages);
        

      } else {
        this.pages++
      }

    })

     

  }
}
