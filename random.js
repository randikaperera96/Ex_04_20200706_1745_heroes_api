console.log("1: Before calling DB ...");

function getMovieDataFromDb(){
    setTimeout(()=>{
        console.log("2: Reading movie data from our DB ...");
        return {id: 30, name: 'Avengers : End Game'};
    }, 4000);
}

getMovieDataFromDb();

console.log('3: Doing some other work now ...');