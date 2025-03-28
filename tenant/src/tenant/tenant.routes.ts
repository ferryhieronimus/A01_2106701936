import express from 'express';
import { validate, verifyJWTTenant } from "@src/middleware";
import * as Validation from './validation';
import * as Handler from './tenant.handler';

const router = express.Router();

router.get('/:tenant_id', verifyJWTTenant, validate(Validation.getTenantSchema), Handler.getTenantHandler);
router.post('', verifyJWTTenant, validate(Validation.createTenantSchema), Handler.createTenantHandler);
router.put('/:old_tenant_id', verifyJWTTenant, validate(Validation.editTenantSchema), Handler.editTenantHandler);
router.delete('', verifyJWTTenant, validate(Validation.deleteTenantSchema), Handler.deleteTenantHandler);

router.get(
  "/v1/:tenant_id",
  verifyJWTTenant,
  validate(Validation.getTenantSchema),
  Handler.getTenantHandlerV1
);

router.post(
  "/v1",
  verifyJWTTenant,
  validate(Validation.createTenantSchema),
  Handler.createTenantHandlerV1
);

router.delete(
  "/v1",
  verifyJWTTenant,
  validate(Validation.deleteTenantSchema),
  Handler.deleteTenantHandlerV1
);

export default router;
