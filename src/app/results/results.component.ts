import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { TestService } from '../services/test.service';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {

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
    document.oncontextmenu = () => false
    this.showResults();

    document.addEventListener("copy", this.disabledCopyHandler, false);

  }

  ngOnDestroy() {
    document.oncontextmenu = () => true
    document.removeEventListener("copy", this.disabledCopyHandler)
    console.log('exit');

  }

  disabledCopyHandler(evt: any) {
    // Change the copied text if you want
    alert('No es posible copiar.');
    evt.clipboardData.setData("text/plain", "No es posible copiar.");

    // Prevent the default copy action
    evt.preventDefault();
  }
  showResults() {

    this.questions.forEach((question, index) => {
      // console.log(question);
      const options: Array<any> = question.respuestas;
      // console.log(options);

      const correctOption = options.filter(val => val.checked == 'checked')[0].texto

      const selectedOption = this.selectedOptions[index].selected
      const id = index + 1
      const correct = correctOption == selectedOption ? true : false
      this.questionsToShow.push({
        title: question.pregunta.title,
        correctOption,
        selectedOption,
        correct,
        id,
        explicacion: question.wptestquestionexplication
      });
    })

    console.log(this.questionsToShow);
    this.sortQuestionsPerPage()
  }


  sortQuestionsPerPage() {



    let arrayLocal: Array<any> = []

    this.questionsToShow.forEach((val, index) => {

      if (index % 3 != 0 || index == 0) {
        arrayLocal.push(val)
        this.questionPages[this.totalPages] = arrayLocal

      } else {
        this.totalPages++
        arrayLocal = []
        arrayLocal.push(val)
        this.questionPages[this.totalPages] = arrayLocal

      }

    })


  }

  nextPage() {
    this.page++

  }
  prevPage() {
    this.page--
  }

  goScore() {
    this.scoreEmitter.emit('test')
  }
}


