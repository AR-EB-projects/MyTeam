-- Allow the same browser push endpoint to be enabled for multiple player profiles.
DROP INDEX IF EXISTS "push_subscriptions_endpoint_key";

CREATE UNIQUE INDEX "push_subscriptions_playerId_endpoint_key"
ON "push_subscriptions"("playerId", "endpoint");
