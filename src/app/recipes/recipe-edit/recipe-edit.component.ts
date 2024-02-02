import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup , FormControl , FormArray } from '@angular/forms'
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {
  id !: number;
  editmode=false;
  recipeForm!:FormGroup;
  constructor(private route: ActivatedRoute,private recipeService:RecipeService,private router:Router){

    this.route.params.subscribe(
      (params:Params) =>{
        this.id = + params['id'];
        this.editmode = params['id'] != null;
        this.initForm();
      }
    )
  }
  onSubmit(){
    // const newrecipe = new Recipe(this.recipeForm.value['name'],this.recipeForm.value['description'],
    // this.recipeForm.value['imagePath'],
    // this.recipeForm.value['ingredients'])
    if (this.editmode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value)
    } else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel();
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(),
        'amount': new FormControl()
      })
    )
  }
  private initForm(){
    let recipeName='';
    let recipeimagepath='';
    let recipeDescription=''
    let recipeIngredients:any;
    if(this.editmode){
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName= recipe.name
      recipeimagepath = recipe.imagepath
      recipeDescription = recipe.description

      if (recipe['ingredients']){
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push({
            'name':new FormControl(ingredient.name),
            'amount':new FormControl(ingredient.amount)
          })
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName),
      'imagePath' : new FormControl(recipeimagepath),
      'description': new FormControl(recipeDescription),
      'ingredients':  recipeIngredients
    })
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }

}
