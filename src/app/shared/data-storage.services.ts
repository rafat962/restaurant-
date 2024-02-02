import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from "rxjs/operators";


@Injectable()
export class Datastorage{
  constructor(private http:HttpClient,private recipeservices:RecipeService){}


  storeRecipes(){
    const recipes = this.recipeservices.getRecipes();
    this.http.put('https://ng-course-recipe-book-e4b04-default-rtdb.firebaseio.com/recipes.json',recipes)
    .subscribe(response=>console.log(response))
  }

  fetchdata(){
    return this.http.get<Recipe[]>('https://ng-course-recipe-book-e4b04-default-rtdb.firebaseio.com/recipes.json')
    .pipe(
      map(recipes=>{
        return recipes.map(recipe=>{
          return {...recipe,ingredients:recipe.ingredients?recipe.ingredients:[]}
        })
      }),
      tap(recipes=>{
        this.recipeservices.setRecieps(recipes);
      })
    );
  }

}


