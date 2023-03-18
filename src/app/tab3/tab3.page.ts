import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    public photoService: PhotoService,
    private sqlite: SQLite) {}

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
  getDB() {
    return this.sqlite.create({
      name: 'data2.db',
      location: 'default'
    });
  }
  async createTable (){
    const SQL = 'CREATE TABLE photos( id INTEGER PRIMARY KEY, fileName VARCHAR(120), path VARCHAR(120));'
    await this.getDB().then((db: SQLiteObject) => {
      db.executeSql(SQL, [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));

  }
  async saveToDB(){
    await this.createTable();
    let count = 0;
    this.photoService.getPhotos().forEach(photo => {
      let sql = 'insert into photos (fileName, path) values (?,?)'; 
      let data = ['photo'+count, photo.filepath];
      this.getDB().then((db: SQLiteObject) => {
        db.executeSql(sql, data)
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
    });
  }
}
