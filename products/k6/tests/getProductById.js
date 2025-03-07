import http from "k6/http";
import { check } from "k6";
import { generateNPoissonWithSpike } from "../utils/index.js";

const productIds = ["bed25ca8-151f-4fa6-8a70-4a26600c9ce8"];

const visitorsPerSecond = generateNPoissonWithSpike(120, 30);
const stages = visitorsPerSecond.map((v) => ({ target: v, duration: "1s" }));

export const options = {
  scenarios: {
    get_product_by_id: {
      executor: "ramping-arrival-rate",
      startRate: visitorsPerSecond[0],
      timeUnit: "1s",
      preAllocatedVUs: 25,
      maxVUs: 60,
      stages: stages,
    },
  },
};

export default function () {
  const productId = productIds[Math.floor(Math.random() * productIds.length)];

  const res = http.get(`http://localhost:8002/api/product/${productId}`);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response has product data": (r) => r.json().id === productId,
  });
}
