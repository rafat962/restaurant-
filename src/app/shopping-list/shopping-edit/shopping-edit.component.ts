import { Component, ElementRef, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.sevice';
import {NgForm} from'@angular/forms'


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy{
  x!:Ingredient;
  data:any;
  constructor(private shopService:ShoppingListService){
  }
  subscription:any;
  editmode = false
  editeditemindex!:number;
  edited_item!: Ingredient;
  @ViewChild('f') slForm !: NgForm;
  ngOnInit(): void {
    this.subscription= this.shopService.strated_editing.subscribe(
      (index:number)=>{
        this.editeditemindex = index
        this.editmode=true;
        this.edited_item = this.shopService.getIngredient(index);
        this.slForm.setValue({
          name:this.edited_item.name,
          amount:this.edited_item.amount
        })
      }
    )
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
  onsubmit(form:NgForm){
    const formvalues = form.value
    this.x = new Ingredient(formvalues.name,formvalues.amount)
    if (this.editmode==true){
      this.shopService.updateingredient(this.editeditemindex,this.x)
    }else{
      this.shopService.additemm(this.x)
    }
    this.editmode=false;
    this.slForm.reset
  }
  onclear(){
    this.slForm.reset()
    this.editmode = false
  }
  onDelete(){
    this.shopService.deletIngredient(this.editeditemindex)
    this.onclear();
  }
}
