function race(n) {
    var cars = []; //we make array of cars
    var track = []; // track of race
    for (var i = 0; i < 300; i++) {
        track.push("-");
    }
    var rank = 0; //rank of each racer between 1...n
    var finished = []; //each racer who position after index 299 will push to finished array earlier
    
    
    // interface Car {
    //     name: string;
    //     position: number;
    //     rank: number;
    //     order: number;
    // }
    var Car = /** @class */ (function () {
        function Car(name, position, rank, order) {
            if (position === void 0) { position = 0; }
            if (rank === void 0) { rank = 0; }
            this.name = name;
            this.position = position;
            this.rank = rank;
            this.order = order;
        }
        return Car;
    }());
    var _loop_1 = function (i) {
        //get name from user and make random order for each car and make random order
        var carName = prompt("Enter a name for car No ".concat(i + 1)) || "";
        var carOrder = Math.floor(Math.random() * (n - 1 + 1) + 1);
        while (cars.some(function (item) { return item.order === carOrder; }) ||
            cars.some(function (item) { return item.name === carName; })) {
            carOrder = Math.floor(Math.random() * (n - 1 + 1) + 1);
        }
        // const car:Car = { name: carName, position: 0, rank: 0, order: carOrder }
        cars.push(new Car(carName, 0, 0, carOrder));
    };
    for (var i = 0; i < n; i++) {
        _loop_1(i);
    }
    cars.sort(function (a, b) { return a.order - b.order; }); //sort Array of Cars by order to know who move first
    console.log(cars.map(function (item) { return item.name; }));
    while (cars.some(function (item) { return item.position < 300; })) {
        var distance = []; //array of new distances to drive
        var _loop_2 = function (i) {
            var newDistance = Math.floor(Math.random() * (10 - 1 + 1) + 1); //make drive distance by random number between 1..10
            distance.push(newDistance);
            track.splice(track.indexOf(i.name), 1, "-"); //delete last position of a car
            if (i.position === 0) {
                //first move must be start from index[0] of track array
                i.position += newDistance - 1;
            }
            else {
                i.position += newDistance;
            }
            if (i.position > 300) {
                rank += 1; //every car who position over 299 will add to finished array
                i.rank = rank; //and it's rank will be one unit higher than previous
                finished.push(i);
                track.splice(track.indexOf(i.name), 1, "-"); //finished car will be added to finished cars array
                cars.splice(cars.indexOf(i), 1); //and it will be deleted from racers array
            }
            else {
                track.splice(i.position, 1, i.name);
            }
            cars.map(function (item) {
                if (item.position === i.position && item.name !== i.name) {
                    item.position = 0;
                }
            });
        };
        for (var _i = 0, cars_1 = cars; _i < cars_1.length; _i++) {
            var i = cars_1[_i];
            _loop_2(i);
        }
        // console.log(cars)
        // console.log(track.join(''))
        console.log("new moves ".concat(distance));
        console.log("new positions ".concat(cars.map(function (item) {
            if (item.position == 0)
                return 0;
            else
                return item.position + 1;
        })));
        console.log(track.join(''));
    }
    console.log(finished.map(function (item) { return item.name + ' ' + item.rank; }));
}
