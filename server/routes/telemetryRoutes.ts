import { Router } from 'express';
import { getTelemetry } from '../controllers/telemetryController';

const router = Router();

router.get('/:vehicleId', getTelemetry);

export default router;
