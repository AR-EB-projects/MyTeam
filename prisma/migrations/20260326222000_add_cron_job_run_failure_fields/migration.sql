ALTER TABLE "cron_job_runs"
ADD COLUMN "failed_at" TIMESTAMPTZ(6),
ADD COLUMN "error_message" TEXT;
