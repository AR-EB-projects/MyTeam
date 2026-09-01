ALTER TABLE "iris_payments"
ADD COLUMN IF NOT EXISTS "link_deactivated_at" TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS "link_deactivation_error" TEXT;
