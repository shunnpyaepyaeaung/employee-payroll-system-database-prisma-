const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getSalaryByEmployeeId = async (id) => {
  const salary = await prisma.monthlySalary.findFirst({
    where: {
      e_Id: id,
    },
    select: {
      e_Id: true,
      employeeTable: {
        select: {
          employeename: true,
        },
      },
      actualsalary: true,
    },
  });
  return salary;
};

const leaveADay = async (eid) => {
  var subtract = await getSalaryByEmployeeId(eid);
  var act = await getSalaryByEmployeeId(eid);
  subtract = (5 / 100) * subtract.actualsalary;
  const salary = await prisma.monthlySalary.update({
    where: {
      e_Id: eid,
    },
    data: {
      actualsalary: act.actualsalary - subtract,
    },
  });
  return salary;
};

const bonus = async (eid) => {
  var addBonus = await getSalaryByEmployeeId(eid);
  var act = await getSalaryByEmployeeId(eid);
  addBonus = (2 / 100) * addBonus.actualsalary;
  const salary = await prisma.monthlySalary.update({
    where: {
      e_Id: eid,
    },
    data: {
      actualsalary: act.actualsalary + addBonus,
    },
  });
  return salary;
};

const overtime = async (eid) => {
  var addOverTime = await getSalaryByEmployeeId(eid);
  var act = await getSalaryByEmployeeId(eid);
  addOverTime = (3 / 100) * addOverTime.actualsalary;
  const salary = await prisma.monthlySalary.update({
    where: {
      e_Id: eid,
    },
    data: {
      actualsalary: act.actualsalary + addOverTime,
    },
  });
  return salary;
};

const getAllMonthSalary = async () => {
  const month = await prisma.monthlySalary.findMany({
    select: {
      id: true,
      e_Id: true,
      employeeTable: {
        select: {
          employeename: true,
        },
      },
      actualsalary: true,
    },
  });
  return month;
};

// overtime(6).then(console.log);
// bonus(3).then(console.log);

// getAllMonthSalary().then(console.log);
// leaveADay(4).then(console.log);

// getSalaryByEmployeeId(6).then(console.log);

module.exports = { getAllMonthSalary, getSalaryByEmployeeId };
