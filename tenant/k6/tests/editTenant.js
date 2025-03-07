import http from "k6/http";
import { check } from "k6";
import { generateNPoissonWithSpike } from "../utils/index.js";

const visitorsPerSecond = generateNPoissonWithSpike(120, 30);
const stages = visitorsPerSecond.map((v) => ({ target: v, duration: "1s" }));

export const options = {
  scenarios: {
    edit_tenant: {
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

const TENANT_ID = "9054983f-77b9-4db6-b2ff-fa4c858b0a1f";

export default function () {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const timestamp = new Date().getTime();
  const payload = {
    name: `Updated Tenant ${timestamp}`,
    description: `Tenant updated during load testing at ${timestamp}`,
    domain: `updated-tenant-${timestamp}.example.com`,
  };

  const res = http.put(
    `http://localhost:8003/api/tenant/${TENANT_ID}`,
    JSON.stringify(payload),
    { headers }
  );
  check(res, {
    "Edit tenant status is 200": (r) => r.status === 200,
  });
}
