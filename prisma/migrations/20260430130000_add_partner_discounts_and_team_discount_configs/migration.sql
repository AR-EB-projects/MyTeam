-- partner_discounts table already exists in the database; only create team_discount_configs

-- CreateTable
CREATE TABLE "team_discount_configs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "club_id" UUID NOT NULL,
    "team_group" INTEGER NOT NULL,
    "discount_id" UUID NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "is_visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "team_discount_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "team_discount_configs_club_id_team_group_discount_id_key" ON "team_discount_configs"("club_id", "team_group", "discount_id");

-- AddForeignKey
ALTER TABLE "team_discount_configs" ADD CONSTRAINT "team_discount_configs_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_discount_configs" ADD CONSTRAINT "team_discount_configs_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "partner_discounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
