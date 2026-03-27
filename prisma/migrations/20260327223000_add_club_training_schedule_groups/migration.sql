CREATE TABLE "club_training_schedule_groups" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "club_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "team_groups" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "training_weekdays" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "training_dates" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "training_window_days" INTEGER NOT NULL DEFAULT 30,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "club_training_schedule_groups_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "club_training_schedule_groups_club_id_idx" ON "club_training_schedule_groups"("club_id");

ALTER TABLE "club_training_schedule_groups"
ADD CONSTRAINT "club_training_schedule_groups_club_id_fkey"
FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
