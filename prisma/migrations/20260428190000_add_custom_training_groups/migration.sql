ALTER TABLE "clubs"
  ADD COLUMN "training_group_mode" TEXT NOT NULL DEFAULT 'team_group';

CREATE TABLE "club_custom_training_groups" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "club_id" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "training_weekdays" INTEGER[] NOT NULL DEFAULT ARRAY[]::INTEGER[],
  "training_dates" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "training_time" TEXT,
  "training_date_times" JSONB,
  "training_window_days" INTEGER NOT NULL DEFAULT 30,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "club_custom_training_groups_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "club_custom_training_group_players" (
  "group_id" UUID NOT NULL,
  "player_id" UUID NOT NULL,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "club_custom_training_group_players_pkey" PRIMARY KEY ("group_id", "player_id")
);

CREATE INDEX "club_custom_training_groups_club_id_idx" ON "club_custom_training_groups"("club_id");
CREATE INDEX "club_custom_training_group_players_group_id_idx" ON "club_custom_training_group_players"("group_id");
CREATE UNIQUE INDEX "club_custom_training_group_players_player_id_key" ON "club_custom_training_group_players"("player_id");

ALTER TABLE "club_custom_training_groups"
  ADD CONSTRAINT "club_custom_training_groups_club_id_fkey"
  FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "club_custom_training_group_players"
  ADD CONSTRAINT "club_custom_training_group_players_group_id_fkey"
  FOREIGN KEY ("group_id") REFERENCES "club_custom_training_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "club_custom_training_group_players"
  ADD CONSTRAINT "club_custom_training_group_players_player_id_fkey"
  FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;
