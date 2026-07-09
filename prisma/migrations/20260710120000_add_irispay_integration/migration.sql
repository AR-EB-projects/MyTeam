ALTER TABLE "clubs"
ADD COLUMN IF NOT EXISTS "default_online_training_credits" INTEGER NOT NULL DEFAULT 0;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'iris_payment_status') THEN
    CREATE TYPE "iris_payment_status" AS ENUM ('WAITING', 'FAILED', 'CONFIRMED');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "iris_payments" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "club_id" UUID NOT NULL,
  "player_id" UUID NOT NULL,
  "payment_hash" TEXT,
  "account_id" TEXT,
  "payment_link" TEXT,
  "short_payment_link" TEXT,
  "order_id" TEXT NOT NULL,
  "amount" DECIMAL(10, 2) NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'EUR',
  "paid_for" TIMESTAMPTZ NOT NULL,
  "paid_through" TIMESTAMPTZ,
  "training_credits" INTEGER,
  "status" "iris_payment_status" NOT NULL DEFAULT 'WAITING',
  "payment_log_id" UUID,
  "raw_create_payload" JSONB,
  "raw_status_payload" JSONB,
  "raw_webhook_payload" JSONB,
  "confirmed_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "iris_payments_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "iris_payments_payment_hash_key"
ON "iris_payments"("payment_hash");

CREATE UNIQUE INDEX IF NOT EXISTS "iris_payments_order_id_key"
ON "iris_payments"("order_id");

CREATE UNIQUE INDEX IF NOT EXISTS "iris_payments_payment_log_id_key"
ON "iris_payments"("payment_log_id");

CREATE INDEX IF NOT EXISTS "iris_payments_club_id_idx"
ON "iris_payments"("club_id");

CREATE INDEX IF NOT EXISTS "iris_payments_player_id_idx"
ON "iris_payments"("player_id");

CREATE INDEX IF NOT EXISTS "iris_payments_status_idx"
ON "iris_payments"("status");

ALTER TABLE "iris_payments"
ADD CONSTRAINT "iris_payments_club_id_fkey"
FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "iris_payments"
ADD CONSTRAINT "iris_payments_player_id_fkey"
FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "iris_payments"
ADD CONSTRAINT "iris_payments_payment_log_id_fkey"
FOREIGN KEY ("payment_log_id") REFERENCES "payment_logs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
