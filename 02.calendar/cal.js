#! /usr/bin/env node

import { DateTime } from "luxon";
import minimist from "minimist";

const WEEKDAYS_NUM = 7;

const argv = minimist(process.argv.slice(2), {
  number: ["m", "y"],
  default: {
    m: DateTime.now().month,
    y: DateTime.now().year,
  },
});

const firstDay = DateTime.local(argv.y, argv.m, 1);
const weeklineLength = [...Array(WEEKDAYS_NUM)]
  .map(() => "01")
  .join(" ").length;

const firstLine = `${firstDay.monthLong} ${argv.y}`;
const margin = Math.floor((weeklineLength - firstLine.length) / 2);
console.log(" ".repeat(margin) + firstLine + " ".repeat(margin));

console.log("Su Mo Tu We Th Fr Sa");

let currentDay = firstDay;
let weekDays = [...Array(currentDay.weekday % WEEKDAYS_NUM)].map(() => "  ");

for (
  currentDay = firstDay;
  currentDay < firstDay.plus({ month: 1 });
  currentDay = currentDay.plus({ days: 1 })
) {
  weekDays.push(String(currentDay.day).padStart(2, " "));
  if (weekDays.length >= WEEKDAYS_NUM) {
    console.log(weekDays.join(" "));
    weekDays = [];
  }
}

if (weekDays.length > 0) {
  console.log(weekDays.join(" "));
}
