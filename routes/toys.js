const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Toy = require("../toySchema");


router.get("/", async (req, res) => {
    try {

        let allToys = await Toy.find({})//{}זה אומר שאני רוצה לשלןף את כל הטבלה 
        res.json(allToys);
    }
    catch (err) {
        res.status(400).send("problem in getting all toys")
    }
})

router.get("/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id))//אם Id שנשלח לא נכון מבחינה הגיונית
        return res.status(400).send("invalid paramter id");//תחזיר שגיאה ותצא מהפונקציה

    try {
        let toyById = await Bake.findOne({ _id: req.params.id });//תמצא לי אוביקט עם id כזה ותכניס אותו למשתנה
        if (!toyById)
            return res.status(404).send("no toy with such id");

        res.json(toyById);
    }
    catch (err) {//אם משום מה לא הצלחת 
        res.status(400).send("problem im getting toy id " + req.params.id)
    }
})

router.post("/", async (req, res) => {
    if (!req.body.name || !req.body.price) {
        res.status(404);
        throw new Error("missing paramters")
       
    }
    let myToy = new Toy({
        name: req.body.name
        , price: req.body.price
        , color: req.body.color
        , age: req.body.age
        , isInSale: req.body.isInSale

    })
    try {
        await myToy.save();
        res.status(201).json(myToy);
    } catch (err) {
        res.status(400).send("cannot create this toy")
    }

})
module.exports = router;