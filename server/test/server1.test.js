const expect = require('expect');
const {ObjectID} = require('mongodb');

const database = require('../../database/mongooseDb');

database.connectToDb();

const {User} = require('../../models/User');
const userOneId = new ObjectID();


describe('test user model', (done) => {
  it('should create a new user', (done) => {
    const user = {
      _id: userOneId,
      email: 'andrew@example.com',
      password: 'userOnePass',
      tokens: []
    };

    new User(user).save()
      .then(rec => {
        console.log('got rec', rec);
        done()

      })
      .catch(e => {
        console.log('e', e);
        done(e)
      });


  });
});

/**


 describe('test user ', async (done) => {
  it('should create a new user', async (done) => {
    const user = {
      _id: userOneId,
      email: 'andrew@example.com',
      password: 'userOnePass',
      tokens: []
    };



    try{
       const userRec = await new User(user).save();

       done(true);
     } catch(e){
       done(e);
     }



  });
});
 */