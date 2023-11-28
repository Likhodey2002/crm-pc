const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Shift = require('./models/Shift');
const Cash = require('./models/Cash');
const Contacts = require("./models/Contacts");

const run = async () => {
    await mongoose.set('strictQuery', false);
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [cashier1, cashier2] = await User.create({
        username: 'cashier 1',
        displayName: 'Вика',
        password: 'cashier1',
        email: 'harry@gmail.com',
        pin: 1111,
        token: nanoid(),
        role: 'cashier',
    }, {
        username: 'cashier 2',
        displayName: 'Настя',
        password: 'cashier2',
        email: 'aki@gmail.com',
        pin: 2222,
        token: nanoid(),
        role: 'cashier',
    }, {
        username: 'admin',
        displayName: 'Паша',
        password: 'admin0',
        email: 'v.golem228@gmail.com',
        pin: 1234,
        token: nanoid(),
        role: 'admin',
    });

    const [shift1] = await Shift.create({
        cashier: cashier1._id,
        createdAt: new Date("2023-01-29T09:40:49.499Z"),
        isActive: false,
        updatedAt: new Date("2023-01-29T12:46:49.499Z"),
    }, {
        cashier: cashier2._id,
        createdAt: new Date("2023-01-30T09:46:49.499Z"),
        isActive: false,
        updatedAt: new Date("2023-01-30T18:46:49.499Z"),
    }, {
        cashier: cashier1._id,
        createdAt: new Date("2023-01-31T08:46:49.499Z"),
        isActive: false,
        updatedAt: new Date("2023-01-31T15:46:49.499Z"),
    },);



    await Contacts.create({
        address: ["с. Кыргызстан г. Бишкек"],
        phone: ["+996 (555) 911 343"],
        email: "hello@womazing.com",
    });

    await Cash.create({
        cash: 3000,
    });


    await mongoose.connection.close();
};

run().catch(console.error);