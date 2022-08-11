import express from 'express';
import controllers from '../../controllers/admin/controllers';
import { super_admin } from '../../middleware/authorize';
import { requestSchema } from '../../middleware/requestSchema';
import validator from '../../middleware/validators';

const router = express.Router();

router.post(
    '/category',
    super_admin,
    validator.category,
    requestSchema,
    controllers.createCategory
)
router.post(
    '/cuisines',
    super_admin,
    validator.cuisines,
    requestSchema,
    controllers.createCuisines
)
router.post(
    '/role',
    super_admin,
    controllers.createRole
)
router.get(
    '/role_finAll',
    controllers.getRoles
)

export default router;