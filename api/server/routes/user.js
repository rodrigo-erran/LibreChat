const express = require('express');
const { requireJwtAuth, canDeleteAccount, verifyEmailLimiter, checkAdmin } = require('~/server/middleware');
const {
  getUserController,
  deleteUserController,
  verifyEmailController,
  updateUserPluginsController,
  resendVerificationController,
  getTermsStatusController,
  acceptTermsController,
  getAllUsersController,
} = require('~/server/controllers/UserController');

const router = express.Router();

router.get('/', requireJwtAuth, getUserController);
router.get('/terms', requireJwtAuth, getTermsStatusController);
router.post('/terms/accept', requireJwtAuth, acceptTermsController);
router.post('/plugins', requireJwtAuth, updateUserPluginsController);
router.delete('/delete', requireJwtAuth, canDeleteAccount, deleteUserController);
router.post('/verify', verifyEmailController);
router.post('/verify/resend', verifyEmailLimiter, resendVerificationController);
router.get('/users',  requireJwtAuth, getAllUsersController);

module.exports = router;
