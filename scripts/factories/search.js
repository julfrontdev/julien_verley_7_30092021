import {
  getIngredients,
  getAppliances,
  getUstensils,
  createListboxsLists,
} from "./buildListboxs.js";
import { handleTagClick } from "../main.js";

// Listboxs lists nodes
const listboxIngredientsList = document.getElementById("ingredients-list");
const listboxAppliancesList = document.getElementById("appliances-list");
const listboxUstensilsList = document.getElementById("ustensils-list");
// Error message node
const noSearchResult = document.getElementById('no-search-result')

export const search = ($recipes, $tags, $toRefresh = true) => {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase(); 
  const recipesAfterTagFilter = getRecipesByTags($recipes, $tags);
  const recipesAfterSearchInput = getRecipesBySearchInput(
    recipesAfterTagFilter,
    searchInput
  );

  if ($toRefresh === true) {
    displayAfterSearch(recipesAfterSearchInput, $tags);
  }

  return recipesAfterSearchInput;
};

export const displayAfterSearch = ($refreshedRecipes, $tags) => {
  createListboxsLists(
    $refreshedRecipes,
    getIngredients,
    listboxIngredientsList,
    "ingredients",
    $tags
  );
  createListboxsLists(
    $refreshedRecipes,
    getAppliances,
    listboxAppliancesList,
    "appliances",
    $tags
  );
  createListboxsLists(
    $refreshedRecipes,
    getUstensils,
    listboxUstensilsList,
    "ustensils",
    $tags
  );
  handleTagClick(listboxIngredientsList); 
  handleTagClick(listboxAppliancesList);
  handleTagClick(listboxUstensilsList);

  displayRecipes($refreshedRecipes);
}

const getRecipesByTags = ($recipes, $tags) => {
  // liste de recettes qui ont les tags sélectionnés
  if ($tags.length === 0) {
    return $recipes;
  }
  const newRecipes = [];
  $recipes.forEach((recipe) => {
    // $recipes.forEach
    let containsAllTags = true;
    $tags.forEach((tag) => {
      const tagName = tag.name;
      let containsIngredientTag = false;
      if (tag.attribute === "appliances") {
        if (recipe.appliance.toLowerCase() !== tagName.toLowerCase()) {
          containsAllTags = false;
        }
      } else if (tag.attribute === "ustensils") {
        if (!recipe.ustensils.includes(tagName)) {
          containsAllTags = false;
        }
      } else if (tag.attribute === "ingredients") {
        recipe.ingredients.forEach((object) => {
          if (object.ingredient.toLowerCase() === tagName) {
            containsIngredientTag = true;
          }
        });
        if (containsIngredientTag === false) {
          containsAllTags = false;
        }
      }
    });
    if (containsAllTags) {
      newRecipes.push(recipe);
    }
  });
  return newRecipes;
};


const getRecipesBySearchInput = ($recipes, $searchInput) => {
  const newRecipes = [];
  if ($searchInput.length < 3) {
    return $recipes;
  }

  if ($searchInput.length >= 3) {
    
    
    // Ingredients search
    let recipeObjectsIngredients = []
    for(let i = 0; i < $recipes.length; i++){
      recipeObjectsIngredients.push($recipes[i].ingredients)
      //console.log($recipes[i].ingredients);
      const objectsIngredients = $recipes[i].ingredients //.toLowerCase()
      console.log(objectsIngredients); // Ok chaque recipe [{} {}]

      let recipesIngredients = [] 
      for(let i = 0; i < objectsIngredients.length; i++){
        recipesIngredients.push(objectsIngredients[i].ingredient)
        //console.log(objectsIngredients[i].ingredient);
        const objectIngredient = objectsIngredients[i].ingredient.toLowerCase() 
        //console.log(objectIngredient);

        if (objectIngredient.includes($searchInput)) {
          if (!newRecipes.includes(objectIngredient)) {
            newRecipes.push(objectIngredient); // pb string, pas object
          }
        }
      }
      console.log(recipesIngredients);
    }
    //console.log(newRecipes); // devrait envoyer un object
    

      /* 
    $recipes.filter((recipe) =>
      recipe.ingredients.forEach((object) => {
        const objectIngredient = object.ingredient.toLowerCase();
        //console.log(objectIngredient);
        if (objectIngredient.includes($searchInput)) {
          if (!newRecipes.includes(recipe)) {
            newRecipes.push(recipe);
          }
        }
      })
    );
     */
    //console.log(newRecipes);

    
    // Recipe name search
    let recipeNames = []
    for(let i = 0; i < $recipes.length; i++){
      recipeNames.push($recipes[i].name)
      //console.log($recipes[i].name);
      const recipeName = $recipes[i].name.toLowerCase()
      //console.log(recipeName);
      if (recipeName.includes($searchInput)) {
        if (!newRecipes.includes(recipeName)) {
          newRecipes.push(recipeName); // console.log(newRecipes.push(recipe));
        }
      }
    }
    console.log(newRecipes); 

   /*  
    $recipes.filter((recipe) => {
      const recipeName = recipe.name.toLowerCase();
      //console.log(recipeName);
      if (recipeName.includes($searchInput)) {
        if (!newRecipes.includes(recipe)) {
          newRecipes.push(recipe); // console.log(newRecipes.push(recipe));
        }
      }
    });
  */
    

    // Description search
    let recipeDescriptions = []
    for(let i = 0; i < $recipes.length; i++) {
      recipeDescriptions.push($recipes[i].description)
      //console.log($recipes[i].name);
      const recipeDescription = $recipes[i].description.toLowerCase()
      //console.log(recipeName);
      if (recipeDescription.includes($searchInput)) {
        if (!newRecipes.includes(recipeDescription)) {
          newRecipes.push(recipeDescription); // console.log(newRecipes.push(recipe));
        }
      }
    }
    console.log(newRecipes);

    /* 
    $recipes.filter((recipe) => {
      const recipeDescription = recipe.description.toLowerCase();
      //console.log(recipeDescription);
      if (recipeDescription.includes($searchInput)) {
        if (!newRecipes.includes(recipe)) {
          newRecipes.push(recipe);
        }
      }
    });

 */  }
  console.log( typeof newRecipes);
  return newRecipes;
};

// filter forEach
/* const getRecipesBySearchInput = ($recipes, $searchInput) => {
  // main.js document.querySelector('#search-input')...
  const newRecipes = [];
  if ($searchInput.length < 3) {
    return $recipes;
  }
  if ($searchInput.length >= 3) {
   
    // Ingredients search
    $recipes.filter((recipe) =>
      recipe.ingredients.forEach((object) => {
        const objectIngredient = object.ingredient.toLowerCase();
        //console.log(objectIngredient);
        if (objectIngredient.includes($searchInput)) {
          if (!newRecipes.includes(recipe)) {
            newRecipes.push(recipe);
          }
        }
      })
    );
    
    // Recipe name search
    $recipes.filter((recipe) => {
      const recipeName = recipe.name.toLowerCase();
      //console.log(recipeName);
      if (recipeName.includes($searchInput)) {
        if (!newRecipes.includes(recipe)) {
          newRecipes.push(recipe); // console.log(newRecipes.push(recipe));
        }
      }
    });
    
    // Description search
    $recipes.filter((recipe) => {
      const recipeDescription = recipe.description.toLowerCase();
      //console.log(recipeDescription);
      if (recipeDescription.includes($searchInput)) {
        if (!newRecipes.includes(recipe)) {
          newRecipes.push(recipe);
        }
      }
    });
  }
  return newRecipes;
}; */


export const displayRecipes = (recipesAfterSearchInput) => {
  document.querySelector('.cards').innerHTML = ""
  const cardNode = document.querySelector(".cards");

  const createFactoryCard = (recipeAfterSearchInputObject) => {
    const {
      name,
      time,
      ingredients,
      description, 
    } = recipeAfterSearchInputObject; 

    const ingredientsLi = document.createElement("ul"); 

    ingredients.forEach((object) => {
      // 1 2 3 !==
      if ((object.ingredient !== undefined) 
       && (object.quantity !== undefined) 
       && (object.unit !== undefined)) {
         ingredientsLi.innerHTML += `<li class="ingredient-quantity-unit"><b>${object.ingredient}</b> : ${object.quantity} ${object.unit}</li>`;
      } 
      // 1 !==  2 !==  3 undefined
      if ((object.ingredient !== undefined) 
       && (object.quantity !== undefined) 
       && (object.unit == undefined)) {
        ingredientsLi.innerHTML += `<li class="ingredient-quantity-unit"><b>${object.ingredient}</b> : ${object.quantity}</li>`;
      } 
      // 1 !==  2 undefined  3 undefined
      if ((object.ingredient !== undefined) 
        && (object.quantity == undefined) 
        && (object.unit == undefined)) {
        ingredientsLi.innerHTML += `<li class="ingredient-quantity-unit"><b>${object.ingredient}</b></li>`;
      }
    });

    const createCardDom = `<div class="card-header"></div>
    <div class="card-body">
      <div class="card-body-top">
        <h6 class="card-title">${name}</h6>
        <h6 class="time"><i class="bi bi-clock"></i> ${time} min</h6>
      </div>
      <div class="card-body-bottom">
        <ul class="recipe-ingredients">${ingredientsLi.innerHTML}</ul>
        <p class="recipe-text card-text">${description}</p>
      </div>
    </div>`;
    return createCardDom;
  };

  if (recipesAfterSearchInput.length >= 1) {
    recipesAfterSearchInput.forEach((recipeAfterSearchInput) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = createFactoryCard(recipeAfterSearchInput);
      cardNode.append(div);
      noSearchResult.classList.add('hidden')
    });
  } else {
    noSearchResult.classList.remove('hidden') 
  }
};