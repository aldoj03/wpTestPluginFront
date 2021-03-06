import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core/core.module';
import { TestComponent } from './test/test.component';
import { AnswersComponent } from './answers/answers.component';
import { ScoreComponent } from './score/score.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TestService } from './services/test.service';
import { ResultsComponent } from './results/results.component';
import { HoursPipe } from './pipes/hours.pipe';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    AnswersComponent,
    ScoreComponent,
    ResultsComponent,
    HoursPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPrintModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
