import { Component , OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import{ Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.sevice';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
  private Ingredient!:Subscription
  data:any;
  ingredients:any=[]
  constructor(private shopService:ShoppingListService){}
  ngOnInit(): void {
    this.ingredients=this.shopService.ingredients
  }
  onEditItem(index:number){
    this.shopService.strated_editing.next(index)
  }

}
