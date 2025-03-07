import http from "k6/http";
import { check } from "k6";
import { generateNPoissonWithSpike } from "../utils/index.js";

const visitorsPerSecond = generateNPoissonWithSpike(120, 30);
const stages = visitorsPerSecond.map((v) => ({ target: v, duration: "1s" }));

export const options = {
  scenarios: {
    add_item_to_cart: {
      executor: "ramping-arrival-rate",
      startRate: visitorsPerSecond[0],
      timeUnit: "1s",
      preAllocatedVUs: 5,
      maxVUs: 60,
      stages: stages,
    },
  },
};

function getAuthToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyMGRjZDU0LWViYTItNDE1ZC05MTk0LTVkNGQ2ZGI2OTI4MSIsInRlbmFudF9pZCI6IjkwNTQ5ODNmLTc3YjktNGRiNi1iMmZmLWZhNGM4NThiMGExZiIsImlhdCI6MTc0MTMyODE2MSwiZXhwIjoxNzQxNDE0NTYxfQ.O11srYuDBaoY6fnVRGscUhR83V_huUBhw8HKoI-IvMI";
}

export default function () {
  const token = getAuthToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const payload = JSON.stringify({
    product_id: "dd2fd826-a663-47d9-8241-4558fb2a5347",
    quantity: 5,
  });

  const res = http.post("http://localhost:8001/api/cart", payload, { headers });

  check(res, {
    "status is 200 or 201": (r) => r.status === 200 || r.status === 201,
  });
}
