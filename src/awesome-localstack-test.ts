import { sleep } from "k6";
/* @ts-ignore */
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
/* @ts-ignore */
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { login } from "./request/login";
import { register } from "./request/register";
import { getUser } from "./util/user";
import { getAllUsers } from "./request/getAllUsers";

export let options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  const user = getUser()
  register(user)
  sleep(3)
  const token = login(user)
  sleep(3)
  getAllUsers(token)
}

export function handleSummary(data: any) {
    return {
      "summary.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }
