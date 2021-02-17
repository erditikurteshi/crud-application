var faker = require('faker');

var db = {
    locations: [],
    cities: []
};

for (var i = 1; i <= 100; i++) {
    db.locations.push({
        id: i,
        name: faker.name.firstName(),
        address: faker.address.streetAddress(),
        cityName: faker.cityName.city(),
        longitude: faker.longitude.longitude(),
        latitude: faker.latitude.latitude()
    });
}
