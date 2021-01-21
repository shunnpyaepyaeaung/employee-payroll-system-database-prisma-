-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MonthlySalary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "actualsalary" REAL NOT NULL,
    "e_Id" INTEGER NOT NULL,
    FOREIGN KEY ("e_Id") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MonthlySalary" ("id", "actualsalary", "e_Id") SELECT "id", "actualsalary", "e_Id" FROM "MonthlySalary";
DROP TABLE "MonthlySalary";
ALTER TABLE "new_MonthlySalary" RENAME TO "MonthlySalary";
CREATE UNIQUE INDEX "MonthlySalary.e_Id_unique" ON "MonthlySalary"("e_Id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
