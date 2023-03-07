
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { User } from '../models/user';
import { GasStation, GasStationSql } from '../models/gas-station';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  private storage: any;

  userList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          console.log('------------------<Abriu o banco de dados>----------');
          this.storage = db;
        }).catch((error: any) => {
          console.log('------------------<Erro no Banco de dados ao abrir>----------4');
          console.log('ocorreu um erro');
          console.error(error)

        });;

    });
  }
  dbState() {
    return this.isDbReady.asObservable();
  }

  addUser(user: User) {
    let data = [user.name, user.email, user.phone, user.password];
    return this.storage.executeSql('INSERT INTO user (name, email, phone, password) VALUES (?, ?, ?, ?)', data)
      .then((res: any) => {
        console.log(res)
        this.getUsers();
      });
  }

  addTeacher(user: User) {
    let data = [user.name, user.email, user.phone, user.password];
    return this.storage.executeSql('INSERT INTO teacher (name, email, materia) VALUES (?, ?, ?)', data)
      .then((res: any) => {
        console.log(res)
        return res;
      });
  }

  addGas(gas: GasStation) {
    let data = [gas.title, gas.address, gas.number, gas.city, gas.lat, gas.lng];
    return this.storage.executeSql('INSERT INTO gas (title, address, number, city, lat, lng) VALUES (?, ?, ?, ?, ?, ?)', data)
      .then((res: any) => {
        console.log(res)
        this.getGas();
      });
  }

  getGas() {
    return this.storage.executeSql('SELECT * FROM gas', []).then((res: any) => {
      let items: GasStationSql[] = [];
      if (res.rows.length > 0) {
        console.log('existe dado')
        for (var i = 0; i < res.rows.length; i++) {
          console.log(res.rows.item(i).title)
          items.push({
            id: res.rows.item(i).id,
            title: res.rows.item(i).title,
            address: res.rows.item(i).address,
            number: res.rows.item(i).number,
            city: res.rows.item(i).city,
            lat: res.item(i).lat,
            lng: res.item(i).lng
          });
        }
      } else
        console.log('nao existe dado')
      //console.log(items)
      //this.songsList.next(items);
    });
  }

  getUsers() {
    return this.storage.executeSql('SELECT * FROM user', []).then((res: any) => {
      let items: User[] = [];
      if (res.rows.length > 0) {
        console.log('existe dado')
        for (var i = 0; i < res.rows.length; i++) {
          console.log(res.rows.item(i).name)
          items.push({
            id: res.rows.item(i).id,
            name: res.rows.item(i).name,
            email: res.rows.item(i).mail,
            phone: res.rows.item(i).phone,
            password: res.rows.item(i).password
          });
        }
      } else
        console.log('nao existe dado')
    });
  }

  login(email: string): Promise<User> {
    return this.storage.executeSql('SELECT * FROM user WHERE email = ?', [email]).then((res: any) => {
      return {
        id: res.rows.item(0).id,
        name: res.rows.item(0).name,
        email: res.rows.item(0).mail,
        phone: res.rows.item(0).phone,
        password: res.rows.item(0).password
      }
    });
  }

  /*
  fetchSongs(): Observable<User[]> {
    return this.songsList.asObservable();
  }
    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/dump.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getSongs();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }
  // Get list
  getSongs(){
    return this.storage.executeSql('SELECT * FROM songtable', []).then(res => {
      let items: Song[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            artist_name: res.rows.item(i).artist_name,  
            song_name: res.rows.item(i).song_name
           });
        }
      }
      this.songsList.next(items);
    });
  }
  // Add
  addSong(artist_name, song_name) {
    let data = [artist_name, song_name];
    return this.storage.executeSql('INSERT INTO songtable (artist_name, song_name) VALUES (?, ?)', data)
    .then(res => {
      this.getSongs();
    });
  }
 
  // Get single object
  getSong(id): Promise<Song> {
    return this.storage.executeSql('SELECT * FROM songtable WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        artist_name: res.rows.item(0).artist_name,  
        song_name: res.rows.item(0).song_name
      }
    });
  }
  // Update
  updateSong(id, song: Song) {
    let data = [song.artist_name, song.song_name];
    return this.storage.executeSql(`UPDATE songtable SET artist_name = ?, song_name = ? WHERE id = ${id}`, data)
    .then(data => {
      this.getSongs();
    })
  }
  // Delete
  deleteSong(id) {
    return this.storage.executeSql('DELETE FROM songtable WHERE id = ?', [id])
    .then(_ => {
      this.getSongs();
    });
  }*/
}