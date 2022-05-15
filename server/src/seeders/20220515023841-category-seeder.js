'use strict';

module.exports = {

  //run seeders with: sequelize db:seed:all
  async up(queryInterface, Sequelize) {
    let categories = [
      {name:"Food",type:false,createdAt:new Date(),updatedAt:new Date()},
      {name:"Clothing",type:false,createdAt:new Date(),updatedAt:new Date()},
      {name:"Health and hygiene",type:false,createdAt:new Date(),updatedAt:new Date()},
      {name:"Accounts and payments",type:false,createdAt:new Date(),updatedAt:new Date()},
      {name:"Others",type:false,createdAt:new Date(),updatedAt:new Date()},
      {name:"Fixed income",type:true,createdAt:new Date(),updatedAt:new Date()},
      {name:"Variable income",type:true,createdAt:new Date(),updatedAt:new Date()},
      {name:"Others",type:true,createdAt:new Date(),updatedAt:new Date()}
    ]
    await queryInterface.bulkInsert('categories', categories, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
