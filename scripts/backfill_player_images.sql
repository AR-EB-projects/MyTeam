CREATE TABLE IF NOT EXISTS "images" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "player_id" UUID NOT NULL,
  "image_url" TEXT NOT NULL,
  "is_admin_view" BOOLEAN NOT NULL,
  CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "images_player_id_idx" ON "images"("player_id");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'images_player_id_fkey'
  ) THEN
    ALTER TABLE "images"
      ADD CONSTRAINT "images_player_id_fkey"
      FOREIGN KEY ("player_id") REFERENCES "players"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END
$$;

INSERT INTO "images" ("player_id", "image_url", "is_admin_view")
SELECT
  p."id",
  COALESCE(NULLIF(TRIM(p."image_url"), ''), NULLIF(TRIM(p."avatar_url"), '')),
  TRUE
FROM "players" p
WHERE COALESCE(NULLIF(TRIM(p."image_url"), ''), NULLIF(TRIM(p."avatar_url"), '')) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1
    FROM "images" i
    WHERE i."player_id" = p."id"
      AND i."image_url" = COALESCE(NULLIF(TRIM(p."image_url"), ''), NULLIF(TRIM(p."avatar_url"), ''))
      AND i."is_admin_view" = TRUE
  );
