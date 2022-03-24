import { faker } from "@faker-js/faker";
import fs from "fs";

function randomJobList(length) {
  const jobList = [];

  for (let i = 1; i <= length; i++) {
    const jobType = faker.name.jobType();
    const jobArea = faker.name.jobArea();
    const jobDescriptor = faker.name.jobDescriptor();

    jobList.push({
      id: `${i}`,
      jobTitle: `${jobDescriptor} ${jobArea} ${jobType}`,
      jobType,
      jobDescriptor,
      jobArea,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  }

  return jobList;
}

function randomPerson(jobList, number) {
  const userList = [];

  let currentUserId = 1;

  jobList.forEach((job) => {
    for (let i = 0; i < number; i++) {
      userList.push({
        id: `${currentUserId++}`,
        jobId: job.id,
        ...faker.helpers.contextualCard(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  });
  return userList;
}

function generateDb() {
  const jobList = randomJobList(5);
  const userList = randomPerson(jobList, 10);

  // Prepare database
  const db = {
    users: [], //For author
    jobs: jobList,
    members: userList,
  };

  fs.writeFile("./server/db.json", JSON.stringify(db), () => {
    console.log("Generate data successfully !!!");
  });

  return db;
}

generateDb();
