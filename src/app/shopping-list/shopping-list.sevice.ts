import{ Ingredient } from '../shared/ingredient.model'
import { Subject } from 'rxjs'


export class ShoppingListService{
  inggredientsChanged = new Subject<Ingredient[]>()
  strated_editing = new Subject<number>()
  public ingredients:Ingredient[]=[
    new Ingredient('Apples',5),
    new Ingredient('banana',10)
  ]
  additemm(item:any){
    this.ingredients.push(item)
    this.inggredientsChanged.next(this.ingredients)
  }
  addIngredient(ingredient:Ingredient[]){
    this.ingredients.push(...ingredient)
    this.inggredientsChanged.next(this.ingredients)
  }
  getIngredient(index:number){
    return this.ingredients[index]
  }
  updateingredient(index:number,newIngredient:Ingredient){
    this.ingredients[index] = newIngredient
    this.inggredientsChanged.next(this.ingredients.slice())
  }
  deletIngredient(index:number){
    this.ingredients.splice(index,1)
  }
}
