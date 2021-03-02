//api:046270245306c37d836ebf79264b3576
//url:https://api.themoviedb.org/3/
//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

//model-view-controller(mvc)

import Search from "./models/Search";
import {elements,renderLoader,clearLoader} from "./base";
import * as searchView from "./views/searchWiev";
import * as movieView from "./views/movieView";
import { Movie } from './models/Movie';

const state={};
const searchController= async ()=>{
    
    const keyword=elements.searchInput.value;
    if(keyword){
        state.search= new Search(keyword);
          searchView.clearInputs();
        searchView.clearResults();
        
        
        renderLoader(elements.movieListContainer);
        
        await state.search.getResult();
        
   
        searchView.displayResults(keyword,state.search.data);
        
        setTimeout(()=>{
           clearLoader(elements.movieListContainer); 
        },1000);
    }
    else{
        
        alert("anahtar kelime giriniz");
    }
    
    
}

//Search Controller

elements.searchForm.addEventListener("submit",function(e){
    
    
    
    
    
    
    
    
    e.preventDefault();
    searchController();
});


//Movie Controller
const movieController= async()=>{

    const id=window.location.hash.replace("#","");
    if(id){
        
        state.movie=new Movie(id);
        
         renderLoader(elements.moviDetailsContainer);
        await state.movie.GetMovie();
       movieView.backToTop(); movieView.displayMovie(state.movie.data);
          setTimeout(()=>{
           clearLoader(elements.moviDetailsContainer); 
        },1000);
    }
    
};

window.addEventListener("hashchange",movieController);
elements.movieDetailsClose.addEventListener("click",movieView.closeDetails);