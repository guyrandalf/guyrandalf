-- Simplify ProjectKind to a single presentation axis (how a project is shown).
-- Topic (AI, Swift, ...) now lives in tags, so a native app can also be AI.
--
-- Mapping:  AI_SYSTEM + INTERNAL_DEMO -> LIVE_HERE
--           EXTERNAL_LIVE             -> EXTERNAL
--           NATIVE_APP                -> NATIVE_APP (unchanged)
--
-- Postgres cannot DROP enum values in place, so we swap the type and cast the
-- existing rows through the mapping. This is data-preserving and safe on prod.

ALTER TYPE "ProjectKind" RENAME TO "ProjectKind_old";

CREATE TYPE "ProjectKind" AS ENUM ('LIVE_HERE', 'EXTERNAL', 'NATIVE_APP');

ALTER TABLE "projects"
  ALTER COLUMN "kind" TYPE "ProjectKind"
  USING (
    CASE "kind"::text
      WHEN 'AI_SYSTEM' THEN 'LIVE_HERE'
      WHEN 'INTERNAL_DEMO' THEN 'LIVE_HERE'
      WHEN 'EXTERNAL_LIVE' THEN 'EXTERNAL'
      ELSE 'NATIVE_APP'
    END::"ProjectKind"
  );

DROP TYPE "ProjectKind_old";
