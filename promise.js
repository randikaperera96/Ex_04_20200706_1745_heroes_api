let p = new Promise(function (resolve, reject) {
    setTimeout(() => {
        //async task
        // resolve("Success");
        reject("Something went wrong!");
    }, 3000);
})

p.then(function (result) {
    console.log(result)
}).catch(function (error) {
    console.log("Error : " + error)
})