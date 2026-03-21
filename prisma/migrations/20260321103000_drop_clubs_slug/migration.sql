DROP INDEX IF EXISTS "clubs_slug_key";

ALTER TABLE "clubs"
DROP COLUMN IF EXISTS "slug";
