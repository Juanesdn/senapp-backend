const express = require('express');
const multer = require('multer');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const mriValidation = require('../../validations/mri.validation');
const { mriController } = require('../../controllers');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.route('/').post(auth(), [/* validate(mriValidation.createMRI), */ upload.single('image')], mriController.createMRI);
router.route('/:mriId').get(auth(), validate(mriValidation.getMRI), mriController.getMRI);
router.route('/images/:key').get(mriController.getMRIPicture);

module.exports = router;
