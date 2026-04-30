-- CreateTable (partner_discounts may already exist in some environments)
CREATE TABLE IF NOT EXISTS "partner_discounts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "logo_url" TEXT,
    "badge_text" TEXT,
    "description" TEXT,
    "code" TEXT,
    "valid_until" TIMESTAMPTZ(6),
    "store_url" TEXT,
    "terms" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partner_discounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable (team_discount_configs may already exist in some environments)
CREATE TABLE IF NOT EXISTS "team_discount_configs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "club_id" UUID NOT NULL,
    "team_group" INTEGER NOT NULL,
    "discount_id" UUID NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "is_visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "team_discount_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "team_discount_configs_club_id_team_group_discount_id_key" ON "team_discount_configs"("club_id", "team_group", "discount_id");

-- AddForeignKey (skip if already exists)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'team_discount_configs_club_id_fkey'
  ) THEN
    ALTER TABLE "team_discount_configs" ADD CONSTRAINT "team_discount_configs_club_id_fkey"
      FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'team_discount_configs_discount_id_fkey'
  ) THEN
    ALTER TABLE "team_discount_configs" ADD CONSTRAINT "team_discount_configs_discount_id_fkey"
      FOREIGN KEY ("discount_id") REFERENCES "partner_discounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
