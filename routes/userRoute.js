const express = require('express');
const router = express.Router();
const {
      getalluser,
      getsingleUser,
      createUser,
      loginUser,
      currentData,
      updateUserData,
      deleteUserData
     } = require('../Controllers/userController');
const validateToken = require('../middleware/validateTokenhandler');
     /* This route used with Controller */
router.route('/').get(getalluser);
router.route('/user-registration').post(createUser);
router.route('/user-login').post(loginUser);
router.get('/current', validateToken,currentData);
router.route('/:id').get(getsingleUser).put(updateUserData).delete(deleteUserData);
/* This route used with Controller 
 router.route('/').get(getalluser)
 router.route('/').post(createUser)
 */
 /* This route used without Controller 
router.route('/').get((request,responce)=>{
      responce.status(200).json({mass:`Gat All Data`})
})
router.route('/').post((request,responce)=>{
      responce.status(200).json({mass:`Create All Data`})
})
router.route('/:id').put((request,responce)=>{
      responce.status(200).json({mass:`Put Ids ${request.params.id}`})
})
router.route('/:id').delete((request,responce)=>{
      responce.status(200).json({mass:`Delete Data By Id ${request.params.id}`})
})
router.route('/:id').get((request,responce)=>{
      responce.status(200).json({mass:`Gat Data By Id ${request.params.id}`})
}) 
*/

module.exports = router;
