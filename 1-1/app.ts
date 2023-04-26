function race(n) {
    const cars: Car[] = []; //we make array of cars
    const track: string[] = []; // track of race
  
    for (let i = 0; i < 300; i++) {
        track.push("-");
    }

    let rank: number = 0; //rank of each racer between 1...n
    const finished: Car[] = []; //each racer who position after index 299 will push to finished array earlier
  
    // interface Car {
    //     name: string;
    //     position: number;
    //     rank: number;
    //     order: number;
    // }

    class Car {
        name: string;
        position: number;
        rank: number;
        order: number;

        constructor(name: string, position: number = 0, rank: number = 0, order: number) {
            this.name = name;
            this.position = position;
            this.rank = rank;
            this.order = order;
        }
    }
  
    for (let i = 0; i < n; i++) {
        //get name from user and make random order for each car and make random order
        let carName: string = prompt(`Enter a name for car No ${i + 1}`) || "";
        let carOrder: number = Math.floor(Math.random() * (n - 1 + 1) + 1);
        while (
            cars.some((item) => item.order === carOrder) ||
            cars.some((item) => item.name === carName)
        ) {
            carOrder = Math.floor(Math.random() * (n - 1 + 1) + 1);
        }

        // const car:Car = { name: carName, position: 0, rank: 0, order: carOrder }
        cars.push(new Car(carName, 0, 0, carOrder));
    }
  
    cars.sort((a: Car, b: Car) => a.order - b.order); //sort Array of Cars by order to know who move first
  
    console.log(cars.map((item) => item.name));
    
    while (cars.some((item) => item.position < 300)) {
        let distance: number[] = []; //array of new distances to drive
        for (let i of cars) {
            let newDistance: number = Math.floor(Math.random() * (10 - 1 + 1) + 1); //make drive distance by random number between 1..10
            distance.push(newDistance);
            track.splice(track.indexOf(i.name), 1, "-"); //delete last position of a car
            if (i.position === 0) {
            //first move must be start from index[0] of track array
                i.position += newDistance - 1;
            } else {
                i.position += newDistance;
            }
    
            if (i.position > 300) {
                rank += 1; //every car who position over 299 will add to finished array
                i.rank = rank; //and it's rank will be one unit higher than previous
                finished.push(i);
                track.splice(track.indexOf(i.name), 1, "-"); //finished car will be added to finished cars array
                cars.splice(cars.indexOf(i), 1); //and it will be deleted from racers array
            } else {
                track.splice(i.position, 1, i.name);
            }

            cars.map(function (item) {
                if (item.position === i.position && item.name !== i.name) {
                    item.position = 0;
                }
            });
        }
        // console.log(cars)
        // console.log(track.join(''))

        console.log(`new moves ${distance}`)
        console.log(`new positions ${cars.map(item => { 
            if (item.position == 0) return 0
            else return item.position + 1 
        })}`)
        console.log(track.join(''))
    }

    console.log(finished.map(item => item.name + ' ' + item.rank))
}