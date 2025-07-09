const express=require('express');
const {getImageController, userPasswordReset,registerController, updatecontroller, deletecontroller, getcontroller ,loginController ,resetController, changepassword,getAllUsers} =require('../controllers/userController');
const multer = require('multer');
const { validateUserInput } = require('../middlewares/validation');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
  },
});

const upload = multer({ storage: storage });
const router= express.Router()

router.get('/all',getAllUsers);

router.get('/:id',getcontroller);

router.post('/register',upload.single("Image") ,validateUserInput,registerController);

router.post('/login',loginController);

router.get('/imageinb64/:id',getImageController);

router.put('/:id', updatecontroller);

router.delete('/:name', deletecontroller);



router.post('/reset-password',resetController);

router.post('/changepassword',changepassword);

router.post('/password-updation/:id/:token',userPasswordReset);

module.exports=router;