console.log("1: Before calling DB ...");

function getMovieDataFromDb() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("2: Reading movie data from our DB ...");
            // return { id: 30, name: 'Avengers : End Game' };
            let dbData = { id: 30, name: 'Avengers : End Game' };
            resolve(dbData);
        }, 4000);
    })
}

// let movieDataFromDB = getMovieDataFromDb();

// console.log('3: Movie Data : ' + movieDataFromDB);

// //--Using resolved Promise
// getMovieDataFromDb().then(function (result) {
//     let movieDataFromDB = result;
//     console.log('3: Movie Data : ' + JSON.stringify(movieDataFromDB));
// })

async function printMovieDetails() {
    let movieDataFromDB = await getMovieDataFromDb();
    console.log('3: Movie Data : ' + JSON.stringify(movieDataFromDB));
}

printMovieDetails();

console.log('4: Doing some other work now ...');