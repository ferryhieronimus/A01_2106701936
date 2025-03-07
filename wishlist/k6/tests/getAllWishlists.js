import http from "k6/http";
import { check } from "k6";
import { generateNPoissonWithSpike } from "../utils/index.js";

const visitorsPerSecond = generateNPoissonWithSpike(120, 30);
const stages = visitorsPerSecond.map((v) => ({ target: v, duration: "1s" }));

export const options = {
  scenarios: {
    get_all_wishlists: {
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
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const res = http.get("http://localhost:8004/api/wishlist", { headers });
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}
