import http from "k6/http";
import { check } from "k6";
import { generateNPoissonWithSpike } from "../utils/index.js";

const visitorsPerSecond = generateNPoissonWithSpike(120, 30);
const stages = visitorsPerSecond.map((v) => ({ target: v, duration: "1s" }));

const orderIds = [
  "e6a8a4d7-9c4f-4a0e-8d1a-3b1c2c3d4e5f",
  "f7b9a5d8-0d5f-5b1e-9e2a-4c2d3e4f5g6h",
];

export const options = {
  scenarios: {
    pay_order: {
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

  const orderId = orderIds[Math.floor(Math.random() * orderIds.length)];

  const payload = JSON.stringify({
    payment_method: "BCA",
    payment_reference: "1234567890",
    amount: 400,
  });

  const res = http.post(
    `http://localhost:8001/api/order/${orderId}/pay`,
    payload,
    { headers }
  );

  check(res, {
    "status is 200 or 201": (r) => r.status === 200 || r.status === 201,
  });
}
