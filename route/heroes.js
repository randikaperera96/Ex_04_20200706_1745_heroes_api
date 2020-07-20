const express = require('express');
const { Router } = require('express');
const Hero = require('../model/hero');
// const app = express();// top level function of express [ similar to "costructor" in OOP ]
const router = express.Router();// to do route handling on an external file/ modules

let heroArrray = [
    {
        id: 1,
        name: "Captain America"
    },
    {
        id: 2,
        name: "IRON MAN"
    },
    {
        id: 3,
        name: "HULK"
    },
    {
        id: 4,
        name: "Quick Silver"
    }
];

/*
// router.get("/api/heroes", (req, res) => {
router.get("/", (req, res) => {
    // let heroes = ["Captain America", "IRON MAN", "HULK", "Quick Silver"];
    // res.send(heroes);
    res.send(heroArrray);
});*/

router.get("/", async (req, res) => {
    let heroes = await Hero.find();
    // let heroes = await Hero.find({ deceased: true });
    //let heroes = await Hero.find().limit(1);
    // let heroes = await Hero.find().sort({ name: 1 });
    // let heroes = await Hero.find()
    //     .sort({ name: 'asc' })
    //     .select({ name: 1, deceased: 1 });
    // let heroes = await Hero.find({ likeCount: { $nin: 3000 } }); // '$nin' not in 
    // let heroes = await Hero.find({ likeCount: { $nin: [3000, 5000] } });
    // let heroes = await Hero.find()
    //     .or([{ likeCount: 3000 }, { likeCount: 5000 }])
    //     .select({ name: 1, deceased: 1 });
    // let heroes = await Hero.find()
    //     .and([{ likeCount: 3000 }, { likeCount: 5000 }])
    //     .select({ name: 1, deceased: 1 });
    // let heroes = await Hero.find()
    //     .or([{ likeCount: 3000 }, { likeCount: 5000 }])
    //     .select({ name: 1, deceased: 1 }).count();
    res.send(heroes);
});

// myy example
// app.get("/api/heroes/:heroId", (req, res) => {  // EX: /api/heroes/1
//     let heroes = ["Captain America", "IRON MAN", "HULK", "Quick Silver"];
//     let heroId = req.params.heroId;      //request parameter always in string format
//     let showMore = req.query.showMore;  //query parameter EX: /api/heroes/1?showMore=false 

//     let hero = { id: heroId, name: heroes[(heroId - 1)], showMore: showMore};
//     res.send(hero);
// });
//
// app.get("/api/heroes/:heroId", (req, res) => {  // EX: /api/heroes/1
//     let heroes = ["Captain America", "IRON MAN", "HULK", "Quick Silver"];
//     let heroId = req.params.heroId;     //request parameter
//     let showMore = req.query.showMore;  //query parameter EX: /api/heroes/1?showMore=false 

//     // let hero = heroArrray.find(h => h.id === heroId);   //will not work since h.id is Integer and heroId is String  
//    let hero = heroArrray.find(h => h.id == heroId);
//     res.send(hero);
// });

/*// router.get("/api/heroes/:heroId", (req, res) => {  // EX: /api/heroes/1
router.get("/:heroId", (req, res) => {
    let heroes = ["Captain America", "IRON MAN", "HULK", "Quick Silver"];
    let heroId = parseInt(req.params.heroId);

    let hero = heroArrray.find(h => h.id === heroId);

    if (!hero) {
        res.status(404).send("No hero under requested id");
    } else {
        res.send(hero);
    }
});
*/
router.get("/:heroId", async (req, res) => {
    let heroId = req.params.heroId;

    let hero = await Hero.findById(heroId);

    if (!hero) {
        res.status(404).send({ message: "No hero under requested id" });
    } else {
        res.send(hero);
    }
});

/*// router.post('/api/heroes', (req, res) => {
router.post('/', (req, res) => {
    let newHeroName = req.body.heroName;

    if (!newHeroName) {
        return res.status(400).send("Mandatory Fields Not Given! Check API documentation");
    }

    let newHeroObj = {
        id: (heroArrray.length + 1),
        // name: req.query.name //myName
        name: newHeroName
    };

    heroArrray.push(newHeroObj);
    console.log(heroArrray);
    res.send(newHeroObj);
});*/

router.post('/', async (req, res) => {
    let heroName = req.body.heroName;
    let birthName = req.body.birthName;
    let movies = req.body.movies;
    let likeCount = req.body.likeCount;
    let imgUrl = req.body.imgUrl;
    let deceased = req.body.deceased;

    if (!heroName) {
        return res.status(400).send("Mandatory Fields Not Given! Check API documentation");
    }

    try {
        let heroTobeAddedToDb = new Hero({
            name: heroName,
            birthName: birthName,
            movies: movies,
            likeCount: likeCount,
            imgURL: imgUrl,
            deceased: deceased
        });

        heroTobeAddedToDb = await heroTobeAddedToDb.save();
        res.send(heroTobeAddedToDb);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

/*
// router.put('/api/heroes/:heroId', (req, res) => {
router.put('/:heroId', (req, res) => {
    let heroId = parseInt(req.params.heroId);
    let newHeroName = req.body.heroName;

    let hero = heroArrray.find(h => h.id === heroId);

    if (!hero) {
        return res.status(404);
    }

    if (!newHeroName) {
        return res.status(400).send("Mandatory Fields Not Given! Check API documentation");
    }

    console.log(heroArrray);
    hero.name = newHeroName;
    console.log(heroArrray);
    res.send(hero);
});
*/

//basic
router.put('/:heroId', async (req, res) => {
    let heroId = req.params.heroId;
    let heroName = req.body.heroName;

    if (!heroName) {
        return res.status(400).send("Mandatory Fields Not Given! Check API documentation");
    }


    let hero = await Hero.findById(heroId);
    try {
        hero.set({
            name: heroName
        });

        hero = hero.save();
        res.send(heroTobeAddedToDb);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

// my attempt
// router.delete('/api/heroes', (req, res) => {
router.delete('/', (req, res) => {
    let heroId = parseInt(req.body.heroId);
    let heroObjPos = heroArrray.findIndex(hObj => hObj.id === heroId);

    if (heroObjPos == -1) {
        return res.status(404).send("Hero not found for the given ID");
    }

    console.log(heroArrray);
    let removedHero = heroArrray[heroObjPos];

    heroArrray.splice(heroObjPos, 1);
    console.log(heroArrray);

    // res.send("Removed hero : " + JSON.stringify(removedHero)); //din't send raw text
    res.send(removedHero);
});

// lecturere's code get from 20200702 lec
// missing

module.exports = router;