-- CreateTable
CREATE TABLE "club_rules_documents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "club_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "document" BYTEA NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "club_rules_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "club_rules_documents_club_id_idx" ON "club_rules_documents"("club_id");

-- AddForeignKey
ALTER TABLE "club_rules_documents" ADD CONSTRAINT "club_rules_documents_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
