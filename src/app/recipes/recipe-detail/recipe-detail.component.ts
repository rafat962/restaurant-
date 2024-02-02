import { Component,Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent {
  id!:number;
      recipe:Recipe={
      name: '',
      description: '',
      imagepath: '',
      ingredients: []
    }
    constructor(private recipeservice:RecipeService,
      private rout:ActivatedRoute,
      private ro:Router
      ){
        this.rout.params.subscribe(
          (params:Params)=>{
            this.id= +params['id']
            this.recipe = this.recipeservice.getRecipe(this.id)
          }
        )
    }
    OnAddToshoppinglist(){
      this.recipeservice.addIngredientToShoppingList(this.recipe.ingredients)
    }
    oneditrecipe(){
      this.ro.navigate(['edit'],{relativeTo:this.rout})
      // this.ro.navigate(['../',this.id,'edit'],{relativeTo:this.rout})
    }
    onDeleteRecipe(){
      this.recipeservice.deleteRecipe(this.id)
      this.ro.navigate(['/recipes'])
    }
}
