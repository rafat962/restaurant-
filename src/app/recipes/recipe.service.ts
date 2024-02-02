import { EventEmitter,Injectable, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.sevice';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService implements OnInit{
  recipeChanged = new Subject<Recipe[]>();
  recipeSelected = new EventEmitter()
  // private recipes:Recipe[] = [
  //   new Recipe('Tasty Schnitzel','A super-tasty Schnitzel','https://assets.bonappetit.com/photos/64349ba03fd52da4745a35f4/1:1/w_1600,c_limit/04102023-ratatouille-lede.jpg',[new Ingredient('Meat',1)
  // ,new Ingredient('French fries',20)])
  //   ,new Recipe('Big fat Burger','What else you need to say','https://assets.bonappetit.com/photos/64349ba03fd52da4745a35f4/1:1/w_1600,c_limit/04102023-ratatouille-lede.jpg',[
  //     new Ingredient('Buns',2),new Ingredient('Meat',1)
  //   ])
  // ];
  private recipes:Recipe[]=[]

  setRecieps(recipes:Recipe[]){
    this.recipes = recipes
    this.recipeChanged.next(this.recipes.slice())
  }

  getRecipes(){
    return this.recipes.slice();
  }
  ngOnInit(): void {
  }
  constructor(private slService:ShoppingListService){}
  getRecipe(id:number){
    return this.recipes[id]
  }
  addIngredientToShoppingList(ingredient:Ingredient[]){
    this.slService.addIngredient(ingredient)
    console.log(ingredient[0].name)
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe)
    this.recipeChanged.next(this.recipes.slice())
  }
  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index] = newRecipe
    this.recipeChanged.next(this.recipes.slice())
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1)
    this.recipeChanged.next(this.recipes.slice())
  }


}
