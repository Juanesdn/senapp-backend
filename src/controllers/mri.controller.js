const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { mriService } = require('../services');

const createMRI = catchAsync(async (req, res) => {
  const MRI = await mriService.createMRI(req.body);
  res.status(httpStatus.CREATED).send({ MRI, createdAt: MRI.createdAt });
});

const getMRIS = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await mriService.queryMRIS(filter, options);
  res.send(result);
});

const getMRI = catchAsync(async (req, res) => {
  const MRI = await mriService.getMRIById(req.params.mriId);
  if (!MRI) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MRI not found');
  }
  res.send({ MRI });
});

const getMriByDate = catchAsync(async (req, res) => {
  const MRI = await mriService.getMRIByDate(req.params.date);
  if (!MRI) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MRI not found');
  }
  res.send({ MRI });
});

const deleteMRI = catchAsync(async (req, res) => {
  await mriService.deleteMRIById(req.params.mriId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMRI,
  getMRIS,
  getMRI,
  deleteMRI,
  getMriByDate,
};
