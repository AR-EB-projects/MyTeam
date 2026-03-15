-- CreateTable
CREATE TABLE "cron_job_runs" (
    "id" BIGSERIAL NOT NULL,
    "job_name" TEXT NOT NULL,
    "run_year" INTEGER NOT NULL,
    "run_month" INTEGER NOT NULL,
    "completed_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cron_job_runs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cron_job_runs_job_name_run_year_run_month_key"
ON "cron_job_runs"("job_name", "run_year", "run_month");
