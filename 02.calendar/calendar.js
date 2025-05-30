#! usr/bin/env node

import { DateTime } from "luxon";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2), {
  number: ["m", "y"],
  default: {
    m: DateTime.now().month,
    y: DateTime.now().year,
  },
});

const WEEKLINE_LENGTH = [...Array(7)].map(() => "01").join(" ").length;

const firstLineStr = `${argv.m}月 ${argv.y}`;
const bufferNum = Math.floor((WEEKLINE_LENGTH - firstLineStr.length) / 2);
console.log(" ".repeat(bufferNum) + firstLineStr + " ".repeat(bufferNum));

console.log("日 月 火 水 木 金 土");

const firstDay = DateTime.local(argv.y, argv.m, 1);
let currentDay = firstDay;
let weekDays = [...Array(currentDay.weekday)].map(() => "  ");

while (currentDay.ordinal < firstDay.plus({ month: 1 }).ordinal) {
  weekDays.push(String(currentDay.day).padStart(2, " "));
  if (weekDays.length >= 7) {
    console.log(weekDays.join(" "));
    weekDays = [];
  }
  currentDay = currentDay.plus({ days: 1 });
}

if (weekDays.length > 0) {
  console.log(weekDays.join(" "));
}
