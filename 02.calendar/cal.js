#! /usr/bin/env node

import { DateTime } from "luxon";
import minimist from "minimist";

const WEEKDAYS_NUM = 7;
const now = DateTime.now();

const argv = minimist(process.argv.slice(2), {
  default: {
    m: now.month,
    y: now.year,
  },
});

const firstDay = DateTime.local(argv.y, argv.m, 1);

// 1行の長さは日付（2文字）* 7 + 間のスペース（1文字）* 6
const weekLineLength = 20;

const firstLine = `${firstDay.monthLong} ${firstDay.year}`;
const margin = Math.floor((weekLineLength - firstLine.length) / 2);
console.log(`${" ".repeat(margin)}${firstLine}${" ".repeat(margin)}`);
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
