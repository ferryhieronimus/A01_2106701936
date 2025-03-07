import http from "k6/http";
import { check } from "k6";
import { generateRegisterPayload } from "../utils/index.js";
import { generateNPoissonWithSpike } from "../utils/index.js";

const visitorsPerMinute = generateNPoissonWithSpike(120, 30);

const stages = visitorsPerMinute.map((v) => ({ target: v, duration: "1s" }));

export const options = {
  scenarios: {
    register: {
      executor: "ramping-arrival-rate",
      startRate: visitorsPerMinute[0],
      timeUnit: "1s",
      preAllocatedVUs: 5,
      maxVUs: 60,
      stages: stages,
    },
  },
};

export default function () {
  const payload = generateRegisterPayload();

  const headers = {
    "Content-Type": "application/json",
  };

  const res = http.post(
    "http://localhost:8000/api/auth/register",
    JSON.stringify(payload),
    { headers }
  );

  check(res, {
    "status is 200 or 201": (r) => r.status === 200 || r.status === 201,
  });
}
