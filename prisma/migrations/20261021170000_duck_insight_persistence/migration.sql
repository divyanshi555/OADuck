CREATE TABLE "duck_insight" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "submission_id" UUID NOT NULL,
    "problem_id" UUID NOT NULL,
    "language" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'GENERATING',
    "generation_token" UUID,
    "analysis" JSONB,
    "optimal_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "duck_insight_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "duck_insight_submission_id_key" ON "duck_insight"("submission_id");
CREATE UNIQUE INDEX "duck_insight_user_id_submission_id_problem_id_key" ON "duck_insight"("user_id", "submission_id", "problem_id");
CREATE INDEX "duck_insight_user_id_problem_id_idx" ON "duck_insight"("user_id", "problem_id");

ALTER TABLE "duck_insight" ADD CONSTRAINT "duck_insight_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "duck_insight" ADD CONSTRAINT "duck_insight_submission_id_fkey"
    FOREIGN KEY ("submission_id") REFERENCES "submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "duck_insight" ADD CONSTRAINT "duck_insight_problem_id_fkey"
    FOREIGN KEY ("problem_id") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
