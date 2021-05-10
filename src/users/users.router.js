const Router = require('koa-joi-router');
const passport = require('koa-passport');

const { UsersController } = require('./users.controller');
const UserValidator = require('./users.validator');

const router = new Router();

// router.get('profile', )
router.get("/profile", passport.authenticate("jwt", { session: false }), UsersController.profile1); //accessToken +
router.get("/refresh/token", UsersController.refresh);                              // +
router.post("/sign-up", UserValidator.createUser, UsersController.createUser);      // +
router.post("/sign-in", UserValidator.signIn, UsersController.signUser);            // +
router.delete("/delete/:userId", UsersController.deleteUser);                       // +
router.put("/update", UsersController.updateUser);                                  // + 
router.get("/get-one/:userId", UsersController.getOneUser);                         // +
router.get("/users-list", UsersController.userList);    
router.put("/photo",  passport.authenticate("jwt", { session: false }), UsersController.updatePhoto);    

router.get("/users-list-inner", UsersController.userListInner); 
router.get("/users-country/:country", UsersController.searchByCountry);              //search by country
router.get("/users-role/:role", UsersController.searchByRole);              //search by role


// router.get("/users-email", UsersController.getOneUserEmail);    //getOneUserEmail 

// router.get("/userbyemail")

router.post('/example', UserValidator.example, UsersController.example);

module.exports = router;