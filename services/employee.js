const { PrismaClient, prismaVersion } = require("@prisma/client");

const prisma = new PrismaClient();

const createEmployee = async (employeename, address, agreesalary) => {
  const employee = await prisma.employee.create({
    data: {
      employeename,
      address,
      agreesalary,
    },
  });
  return employee;
};

const getSalary = async (eid) => {
  const salary = await prisma.employee.findFirst({
    where: {
      id: eid,
    },
    select: {
      agreesalary: true,
    },
  });
  return salary;
};

const addsalary = async (eid) => {
  const get = await getSalary(eid);
  const addsalary = await prisma.monthlySalary.upsert({
    where: {
      e_Id: eid,
    },
    update: {
      actualsalary: get.agreesalary,
    },
    create: {
      employeeTable: {
        connect: {
          id: eid,
        },
      },
      actualsalary: get.agreesalary,
    },
  });
  return addsalary;
};

const deleteEmployeeById = async (id) => {
  const employee = await prisma.employee.delete({
    where: {
      id,
    },
  });
  return employee;
};

const viewAllEmployee = async () => {
  const employee = await prisma.employee.findMany({
    select: {
      id: true,
      employeename: true,
      agreesalary: true,
    },
  });
  return employee;
};

// viewAllEmployee().then(console.log);

// addsalary(6).then(console.log);

// deleteEmployeeById(2).then(console.log);
// createEmployee("Shunn Pyae", "Yangon", 10000000).then(console.log);
// createEmployee("Kas", "Yangon", 20000000).then(console.log);
// createEmployee("Kaskar", "Yangon", 30000000).then(console.log);

module.exports = { getSalary, addsalary };
