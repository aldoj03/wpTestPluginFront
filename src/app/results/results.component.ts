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


  constructor() { }

  ngOnInit(): void {
    this.showResults()
  }

  showResults() {

    this.questions.forEach((question, index) => {
      const options: Array<any> = question.options;
      const correctOption = options.filter(val => val.type)[0].title

      const selectedOption =  this.selectedOptions[index].selected

      const correct = correctOption == selectedOption ? true : false
      this.questionsToShow[index] = {
        title: question.title,
        correctOption,
        selectedOption,
        correct
      };
    })

    console.log(this.questionsToShow);

  }
}
