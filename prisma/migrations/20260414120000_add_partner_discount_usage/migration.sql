-- CreateTable
CREATE TABLE "partner_discount_usage" (
    "id" UUID NOT NULL,
    "player_id" UUID NOT NULL,
    "partner" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partner_discount_usage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "partner_discount_usage_player_id_idx" ON "partner_discount_usage"("player_id");

-- CreateIndex
CREATE INDEX "partner_discount_usage_date_idx" ON "partner_discount_usage"("date");

-- CreateIndex
CREATE INDEX "partner_discount_usage_partner_date_idx" ON "partner_discount_usage"("partner", "date");

-- AddForeignKey
ALTER TABLE "partner_discount_usage" ADD CONSTRAINT "partner_discount_usage_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;
