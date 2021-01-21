const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const { getSalaryByEmployeeId } = require("./monthlySalary");
const { getSalary, addsalary } = require("./employee");

const paidSalary = async (paidmonth, eid) => {
  let pay = await getSalaryByEmployeeId(eid);
  const paid = await prisma.paid.create({
    data: {
      paidmonth,
      employeeTable: {
        connect: {
          id: eid,
        },
      },
      payout: pay.actualsalary,
    },
  });
  await addsalary(eid);
  return paid;
};

const viewAllPaid = async () => {
  const paid = await prisma.paid.findMany();
  return paid;
};

// viewAllPaid().then(console.log);

const removePaidByEId = async (eid) => {
  const removePaid = await prisma.paid.delete({
    where: {
      e_id: eid,
    },
  });
  return removePaid;
};

// removePaidByEId(6).then(console.log);

// addsalnoary(6);

// paidSalary("January", 6).then(console.log);
