import { Component, EventEmitter, Output } from '@angular/core';
import { Datastorage } from '../shared/data-storage.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataStorage:Datastorage){}

  onSaveData(){
    this.dataStorage.storeRecipes()
  }

  onfetchdata(){
    this.dataStorage.fetchdata().subscribe()

  }
}
