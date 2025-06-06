#! /usr/bin/env node

import * as luxon from "luxon";
import minimist from "minimist";

// 1行の長さは日付（2文字）* 7 + 間のスペース（1文字）* 6
const LINE_LENGTH = 20;
const WEEKDAYS_NUM = 7;

const now = luxon.DateTime.now();

const argv = minimist(process.argv.slice(2), {
  default: {
    m: now.month,
    y: now.year,
  },
});

const firstDay = luxon.DateTime.local(argv.y, argv.m, 1);

const firstLine = `${firstDay.monthLong} ${firstDay.year}`;
const marginLength = Math.floor((LINE_LENGTH - firstLine.length) / 2);
console.log(
  `${" ".repeat(marginLength)}${firstLine}${" ".repeat(marginLength)}`,
);
console.log("Su Mo Tu We Th Fr Sa");

let weekDays = [...Array(firstDay.weekday % WEEKDAYS_NUM)].map(() => "  ");

for (
  let currentDay = firstDay;
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
