import { Router } from 'express';
import { forceApprove, hardDelete } from '../controllers/adminController';

const router = Router();

router.post('/force-approve/:id', forceApprove);
router.delete('/hard-delete/:id', hardDelete);

export default router;
