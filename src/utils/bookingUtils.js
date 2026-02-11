import dayjs from "dayjs";

export const calcDuration = (s,e) =>
  dayjs(e).diff(s,"day");

export const calcTotal = (d,p) =>
  d * p;
