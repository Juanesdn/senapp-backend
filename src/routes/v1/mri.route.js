const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const mriValidation = require('../../validations/mri.validation');
const { mriController } = require('../../controllers');

const router = express.Router();

router.route('/').post(auth(), validate(mriValidation.createMRI), mriController.createMRI);
router.route('/:mriId').get(auth(), validate(mriValidation.getMRI), mriController.getMRI);

module.exports = router;
