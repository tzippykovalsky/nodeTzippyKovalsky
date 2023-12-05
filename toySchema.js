const mongoose = require("mongoose");

const toySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: Number,
    color: [String],
    isInSale: Boolean,
    age: Number,
})

 const Toy=mongoose.model("Toys",toySchema);//כדאי באות ראשונה גדולה כמו מחלקה
 module.exports=Toy;