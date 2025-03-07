import http from "k6/http";
import { check } from "k6";
import { generateNPoissonWithSpike } from "../utils/index.js";

const categoryIds = ["bcd27e8d-77bd-448a-9046-1cefa9afdc29"];

const visitorsPerSecond = generateNPoissonWithSpike(120, 30);
const stages = visitorsPerSecond.map((v) => ({ target: v, duration: "1s" }));

export const options = {
  scenarios: {
    get_category_by_id: {
      executor: "ramping-arrival-rate",
      startRate: visitorsPerSecond[0],
      timeUnit: "1s",
      preAllocatedVUs: 5,
      maxVUs: 60,
      stages: stages,
    },
  },
};

export default function () {
  const categoryId =
    categoryIds[Math.floor(Math.random() * categoryIds.length)];

  const res = http.get(
    `http://localhost:8002/api/product/category/${categoryId}`
  );

  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}
