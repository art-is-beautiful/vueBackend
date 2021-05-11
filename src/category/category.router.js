const Router = require('koa-joi-router');
const passport = require('koa-passport');

const { CategoryController } = require('./category.controller');
const UserValidator = require('./category.validator');

const router = new Router();

// router.get('profile', )
// router.get("/profile", passport.authenticate("jwt", { session: false }), UsersController.profile1); //accessToken +
// router.get("/refresh/token", UsersController.refresh);                              // +
// router.post("/sign-up", UserValidator.createUser, UsersController.createUser);      // +
// router.post("/sign-in", UserValidator.signIn, UsersController.signUser);            // +
// router.delete("/delete/:userId", UsersController.deleteUser);                       // +
// router.put("/update", UsersController.updateUser);                                  // + 
// router.get("/get-one/:userId", UsersController.getOneUser);                         // +

router.put("/update", CategoryController.updateCategoty);
router.get("/get-one/:userId", CategoryController.getCategoryById);
router.delete("/delete-cat/:userId", CategoryController.deleteCategory);                       // +
router.post("/create-category", CategoryController.createCategory); 
router.get("/users-country/:country", CategoryController.searchByCountry);              //search by country
// router.get("/users-list", CategoryController.categoryList);

// router.post('/example', UserValidator.example, UsersController.example);

module.exports = router;