import express from 'express';
import authController from '../../controllers/authController/auth';
import { authorize, super_admin } from '../../middleware/authorize';
import { requestSchema } from '../../middleware/requestSchema';
import validator from '../../middleware/validators';

const router = express.Router();

//=============================== REGISTRATION =================================//

router.post(
    '/register',
    super_admin,
    validator.register,
    requestSchema,
    authController.register
)
router.post(
    '/vendor',
    validator.register,
    requestSchema,
    authController.vendorReg
)
router.post(
    '/user',
    validator.register,
    requestSchema,
    authController.userReg
)
router.post(
    '/rider',
    validator.register,
    requestSchema,
    authController.riderReg
)

//=============================== LOGIN =================================//

router.post(
    '/login_SA',
    authController.SA_login
)
router.post(
    '/login',
    authController.login
)
router.post(
    '/vendor_login',
    authController.vendorLogin
)
router.post(
    '/user_login',
    authController.userLogin
)
router.post(
    '/rider_login',
    authController.riderLogin
)

//================================= VERIFICATION ================================//

router.get(
    '/verify',
    authorize,
    authController.verify
)
router.get(
    '/verify_vendor',
    authorize,
    authController.verifyVendor
)
router.get(
    '/verify_user',
    authorize,
    authController.verifyUser
)
router.get(
    '/verify_rider',
    authorize,
    authController.verifyRider
)

export default router;