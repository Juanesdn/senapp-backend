const httpStatus = require('http-status');
const { MRI, User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Creates an MRI
 * @param {Object} - The MRI object to be created.
 * @returns {Promise<MRI>}
 */
const createMRI = async (mri) => {
  const newMRI = await MRI.create(mri);
  User.findById(mri.user, (err, user) => {
    if (err) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    user.mris.push(newMRI);
    user.save();
  });
  return newMRI;
};

/**
 * Query for MRI's
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMRIS = async (filter, options) => {
  const mris = await MRI.paginate(filter, options);
  return mris;
};

/**
 * Get MRI by id
 * @param {ObjectId} id
 * @returns {Promise<MRI>}
 */
const getMRIById = async (id) => {
  return MRI.findById(id);
};

/**
 * Get MRI by date
 * @param {string} date
 * @returns {Promise<MRI>}
 */
const getMRIByDate = async (date) => {
  return MRI.findOne({ date });
};

/**
 * Delete MRI by id
 * @param {ObjectId} mriId
 * @returns {Promise<MRI>}
 */
const deleteMRIById = async (mriId) => {
  const mri = await getMRIById(mriId);
  if (!mri) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MRI not found');
  }
  await mri.remove();
  return mri;
};

module.exports = {
  createMRI,
  queryMRIS,
  getMRIById,
  getMRIByDate,
  deleteMRIById,
};
