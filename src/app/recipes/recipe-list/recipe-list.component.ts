import { Component,OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

import { RecipeService } from'../recipe.service'
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes!: Recipe[];
  constructor(private recipeservice:RecipeService,
    private route:Router,
    private rou:ActivatedRoute){
  }
  ngOnInit(): void {
    this.recipeservice.recipeChanged.subscribe((recipes:Recipe[])=>{
      this.recipes = recipes;
    })
    this.recipes=this.recipeservice.getRecipes()
  }
  onNewRecipe(){
    this.route.navigate(['new'],{relativeTo:this.rou})
  }
}
