-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paid" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paidmonth" TEXT NOT NULL,
    "payout" REAL NOT NULL,
    "e_id" INTEGER NOT NULL,
    FOREIGN KEY ("e_id") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Paid" ("id", "paidmonth", "payout", "e_id") SELECT "id", "paidmonth", "payout", "e_id" FROM "Paid";
DROP TABLE "Paid";
ALTER TABLE "new_Paid" RENAME TO "Paid";
CREATE UNIQUE INDEX "Paid.e_id_unique" ON "Paid"("e_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
