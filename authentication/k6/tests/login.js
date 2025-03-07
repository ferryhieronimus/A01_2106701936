import http from "k6/http";
import { check } from "k6";
import { generateNPoissonWithSpike } from "../utils/index.js";

const visitorsPerMinute = generateNPoissonWithSpike(120, 30);
const stages = visitorsPerMinute.map((v) => ({ target: v, duration: "1s" }));

export const options = {
  scenarios: {
    login: {
      executor: "ramping-arrival-rate",
      startRate: visitorsPerMinute[0],
      timeUnit: "1s",
      preAllocatedVUs: 15,
      maxVUs: 100,
      stages: stages,
    },
  },
};

const testUsers = [{ username: "ferryferry", password: "Password123" }];

export default function () {
  const user = testUsers[Math.floor(Math.random() * testUsers.length)];

  const payload = {
    username: user.username,
    password: user.password,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const res = http.post(
    "http://localhost:8000/api/auth/login",
    JSON.stringify(payload),
    { headers }
  );

  check(res, {
    "status is 200": (r) => r.status === 200,
    "login successful": (r) => r.json().token !== undefined,
  });
}
