import { Component } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
const SQL = 'CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY, name TEXT NOT NULL,email TEXT NOT NULL,'+
  'phone TEXT NOT NULL,password TEXT NOT NULL);'+
  'CREATE TABLE IF NOT EXISTS gas_station ( id INTEGER PRIMARY KEY, title TEXT NOT NULL,'+
  'address TEXT NOT NULL, address TEXT NOT NULL, number TEXT NOT NULL, city TEXT NOT NULL,lat TEXT NOT NULL, lng TEXT NOT NULL);'+
  'CREATE TABLE IF NOT EXISTS fuel (id INTEGER PRIMARY KEY AUTOINCREMENT, posto_id INTEGER,'+
  'Name TEXT NOT NULL,Price NUMERIC,FOREIGN KEY(gas_station_id) REFERENCES gas_station(id));';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
//Aula Git 
export class AppComponent {
  constructor( private sqlite: SQLite, public platform: Platform) {}
  ngOnInit() {
    if(this.platform.is('android')){ this.sqLiteGenerateDB(); }
  }
  sqLiteGenerateDB(){
    this.sqlite.create({ name: 'data.db', location: 'default' })
      .then((db: SQLiteObject) => { 
        db.executeSql(SQL, [])
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }
}
