import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.page.html',
  styleUrls: ['./professor.page.scss'],
})
export class ProfessorPage implements OnInit {

  constructor(
    private router: Router,
    private db: DbService) { }

  ngOnInit() {
  }

  onSubmit(form:any){
    console.log(form.controls.email.value)
    this.db.addTeacher(form).then((res:any) => {
      console.log(res)
      console.log('------------------<entrou>----------1')

    })
  }
}
