-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employeename" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "agreesalary" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "MonthlySalary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "actualsalary" REAL NOT NULL,
    "e_Id" INTEGER NOT NULL,
    FOREIGN KEY ("e_Id") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Paid" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paidmonth" TEXT NOT NULL,
    "payout" REAL NOT NULL,
    "e_id" INTEGER NOT NULL,
    FOREIGN KEY ("e_id") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "MonthlySalary_e_Id_unique" ON "MonthlySalary"("e_Id");

-- CreateIndex
CREATE UNIQUE INDEX "Paid_e_id_unique" ON "Paid"("e_id");
