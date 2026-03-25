CREATE TABLE "club_training_group_schedules" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "club_id" UUID NOT NULL,
    "team_group" INTEGER NOT NULL,
    "training_weekdays" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "training_dates" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "training_window_days" INTEGER NOT NULL DEFAULT 30,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "club_training_group_schedules_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "club_training_group_schedules_club_id_team_group_key"
ON "club_training_group_schedules"("club_id", "team_group");

CREATE INDEX "club_training_group_schedules_club_id_idx"
ON "club_training_group_schedules"("club_id");

ALTER TABLE "club_training_group_schedules"
ADD CONSTRAINT "club_training_group_schedules_club_id_fkey"
FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
