const { Model, DataTypes } = require('sequelize');
const sequelize = require('./utils/sequelizeSingleton')

class User extends Model {}
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

(async () => {
  await sequelize.sync();
  try{
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
      });
      console.log(jane.toJSON());
  } catch(e){
      console.log(e);
  }
  
})();
