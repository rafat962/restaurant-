import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Datastorage } from "../shared/data-storage.services";
import { Observable } from "rxjs";


@Injectable({providedIn:'root'})

export class Recipersresolver implements Resolve<Recipe[]>{
  constructor(private datasorage:Datastorage){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes:any = this.datasorage.fetchdata();
    if(recipes.length===0){
      return this.datasorage.fetchdata();
    }else{
      return recipes
    }
  }

}

