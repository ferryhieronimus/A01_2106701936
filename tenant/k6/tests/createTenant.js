import http from "k6/http";
import { check } from "k6";
import { generateNPoissonWithSpike } from "../utils/index.js";

const visitorsPerSecond = generateNPoissonWithSpike(120, 30);
const stages = visitorsPerSecond.map((v) => ({ target: v, duration: "1s" }));

export const options = {
  scenarios: {
    create_tenant: {
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
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlN2I1ZDA1LWZmNzYtNGJhZi04ZDhhLTAyZTkxZGUzZDk5NSIsInRlbmFudF9pZCI6IjkwNTQ5ODNmLTc3YjktNGRiNi1iMmZmLWZhNGM4NThiMGExZiIsImlhdCI6MTc0MTMyNjA4MCwiZXhwIjoxNzQxNDEyNDgwfQ.PNZpmyGgeiqC5o7PSKjNR2ZwheSK8_e1Xls1gSrhWgQ";
}

export default function () {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const timestamp = new Date().getTime();
  const payload = {
    name: `Test Tenant ${timestamp}`,
    description: `Test tenant created during load testing at ${timestamp}`,
    domain: `tenant-${timestamp}.example.com`,
    owner_id: "5e7b5d05-ff76-4baf-8d8a-02e91de3d9951",
  };

  const res = http.post(
    "http://localhost:8003/api/tenant",
    JSON.stringify(payload),
    { headers }
  );
  check(res, {
    "Create tenant status is 201": (r) => r.status === 201,
  });
}
