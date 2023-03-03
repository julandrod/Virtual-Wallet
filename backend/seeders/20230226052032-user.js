"use strict";
const { faker } = require("@faker-js/faker");
const { encryptPassword } = require("../helpers");

faker.setLocale("es");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const users = [];
    const usersPassword = await encryptPassword("root");

    const admin = {
      id: faker.datatype.uuid(),
      firstName: process.env.ADMIN_NAME,
      lastName: process.env.ADMIN_LASTNAME,
      email: process.env.ADMIN_EMAIL,
      password: usersPassword,
      image:
        "https://res.cloudinary.com/leo-echenique/image/upload/v1668038867/wkvuim8xw0x9oez57ut5.svg",
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
      roleId: 1,
    };

    for (let index = 0; index < 20; index++) {
      const createdAt = faker.date.recent();
      const user = {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: usersPassword,
        image:
          "https://res.cloudinary.com/leo-echenique/image/upload/v1668038867/wkvuim8xw0x9oez57ut5.svg",
        createdAt,
        updatedAt: createdAt,
        roleId: 2,
      };
      users.push(user);
    }

    await queryInterface.bulkInsert("Users", [...users, admin], {});

    // const userIds = await queryInterface.bulkInsert(
    //   "Users",
    //   [...users, admin],
    //   { returning: ["id"] }
    // );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
