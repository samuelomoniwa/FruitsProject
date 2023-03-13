const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({

    rating: 10,
    review: "I left my Peaches out in georgia yes I did"
});

//fruit.save();

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    height: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
    name: "Pineapple",
    rating: 9,
    review: "Dont drink water after this."
})

// pineapple.save();

const coconut = new Fruit({
    name: "Coconut",
    rating: 3,
    review: "Nobody knows how water ends up in the coconut."
})

coconut.save();

const person = new Person ({
    name: "Sryina",
    age: 28,
    height: 145,
    favouriteFruit: pineapple
});

// person.save();


Fruit.find(function(err, fruits){
    if (err) {
        console.log(err);
    } else {
        mongoose.connection.close()
        for (var i=0; i<fruits.length; i++){
            console.log(fruits[i].name);
        }
    
    }
});

// Person.deleteMany({name: "Samuel"}, 
// function(err){
//     if (err){
//         console.log(err)
//     }else{
//         console.log('Person has been deleted successfully :)');
//     }
// }
// );

Person.updateOne({name: "Samuel"}, {favouriteFruit: coconut},
    function(err) { 
    if (err) {
         console.log(err); 
        } else { 
            console.log("Successfully updated the person.");
         } 
        }
    );