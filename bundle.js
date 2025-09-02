(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/date-fns/constants.js
  var daysInYear, maxTime, minTime, millisecondsInWeek, millisecondsInDay, secondsInHour, secondsInDay, secondsInWeek, secondsInYear, secondsInMonth, secondsInQuarter, constructFromSymbol;
  var init_constants = __esm({
    "node_modules/date-fns/constants.js"() {
      daysInYear = 365.2425;
      maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
      minTime = -maxTime;
      millisecondsInWeek = 6048e5;
      millisecondsInDay = 864e5;
      secondsInHour = 3600;
      secondsInDay = secondsInHour * 24;
      secondsInWeek = secondsInDay * 7;
      secondsInYear = secondsInDay * daysInYear;
      secondsInMonth = secondsInYear / 12;
      secondsInQuarter = secondsInMonth * 3;
      constructFromSymbol = Symbol.for("constructDateFrom");
    }
  });

  // node_modules/date-fns/constructFrom.js
  function constructFrom(date, value) {
    if (typeof date === "function") return date(value);
    if (date && typeof date === "object" && constructFromSymbol in date)
      return date[constructFromSymbol](value);
    if (date instanceof Date) return new date.constructor(value);
    return new Date(value);
  }
  var init_constructFrom = __esm({
    "node_modules/date-fns/constructFrom.js"() {
      init_constants();
    }
  });

  // node_modules/date-fns/toDate.js
  function toDate(argument, context) {
    return constructFrom(context || argument, argument);
  }
  var init_toDate = __esm({
    "node_modules/date-fns/toDate.js"() {
      init_constructFrom();
    }
  });

  // node_modules/date-fns/addDays.js
  function addDays(date, amount, options) {
    const _date = toDate(date, options?.in);
    if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
    if (!amount) return _date;
    _date.setDate(_date.getDate() + amount);
    return _date;
  }
  var init_addDays = __esm({
    "node_modules/date-fns/addDays.js"() {
      init_constructFrom();
      init_toDate();
    }
  });

  // node_modules/date-fns/addMonths.js
  var init_addMonths = __esm({
    "node_modules/date-fns/addMonths.js"() {
    }
  });

  // node_modules/date-fns/add.js
  var init_add = __esm({
    "node_modules/date-fns/add.js"() {
    }
  });

  // node_modules/date-fns/isSaturday.js
  var init_isSaturday = __esm({
    "node_modules/date-fns/isSaturday.js"() {
    }
  });

  // node_modules/date-fns/isSunday.js
  var init_isSunday = __esm({
    "node_modules/date-fns/isSunday.js"() {
    }
  });

  // node_modules/date-fns/isWeekend.js
  var init_isWeekend = __esm({
    "node_modules/date-fns/isWeekend.js"() {
    }
  });

  // node_modules/date-fns/addBusinessDays.js
  var init_addBusinessDays = __esm({
    "node_modules/date-fns/addBusinessDays.js"() {
    }
  });

  // node_modules/date-fns/addMilliseconds.js
  var init_addMilliseconds = __esm({
    "node_modules/date-fns/addMilliseconds.js"() {
    }
  });

  // node_modules/date-fns/addHours.js
  var init_addHours = __esm({
    "node_modules/date-fns/addHours.js"() {
    }
  });

  // node_modules/date-fns/_lib/defaultOptions.js
  function getDefaultOptions() {
    return defaultOptions;
  }
  var defaultOptions;
  var init_defaultOptions = __esm({
    "node_modules/date-fns/_lib/defaultOptions.js"() {
      defaultOptions = {};
    }
  });

  // node_modules/date-fns/startOfWeek.js
  function startOfWeek(date, options) {
    const defaultOptions2 = getDefaultOptions();
    const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
    const _date = toDate(date, options?.in);
    const day = _date.getDay();
    const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    _date.setDate(_date.getDate() - diff);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  var init_startOfWeek = __esm({
    "node_modules/date-fns/startOfWeek.js"() {
      init_defaultOptions();
      init_toDate();
    }
  });

  // node_modules/date-fns/startOfISOWeek.js
  function startOfISOWeek(date, options) {
    return startOfWeek(date, { ...options, weekStartsOn: 1 });
  }
  var init_startOfISOWeek = __esm({
    "node_modules/date-fns/startOfISOWeek.js"() {
      init_startOfWeek();
    }
  });

  // node_modules/date-fns/getISOWeekYear.js
  function getISOWeekYear(date, options) {
    const _date = toDate(date, options?.in);
    const year = _date.getFullYear();
    const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
    fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
    const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
    const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
    fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
    fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
    const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
    if (_date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (_date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }
  var init_getISOWeekYear = __esm({
    "node_modules/date-fns/getISOWeekYear.js"() {
      init_constructFrom();
      init_startOfISOWeek();
      init_toDate();
    }
  });

  // node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
  function getTimezoneOffsetInMilliseconds(date) {
    const _date = toDate(date);
    const utcDate = new Date(
      Date.UTC(
        _date.getFullYear(),
        _date.getMonth(),
        _date.getDate(),
        _date.getHours(),
        _date.getMinutes(),
        _date.getSeconds(),
        _date.getMilliseconds()
      )
    );
    utcDate.setUTCFullYear(_date.getFullYear());
    return +date - +utcDate;
  }
  var init_getTimezoneOffsetInMilliseconds = __esm({
    "node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js"() {
      init_toDate();
    }
  });

  // node_modules/date-fns/_lib/normalizeDates.js
  function normalizeDates(context, ...dates) {
    const normalize = constructFrom.bind(
      null,
      context || dates.find((date) => typeof date === "object")
    );
    return dates.map(normalize);
  }
  var init_normalizeDates = __esm({
    "node_modules/date-fns/_lib/normalizeDates.js"() {
      init_constructFrom();
    }
  });

  // node_modules/date-fns/startOfDay.js
  function startOfDay(date, options) {
    const _date = toDate(date, options?.in);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  var init_startOfDay = __esm({
    "node_modules/date-fns/startOfDay.js"() {
      init_toDate();
    }
  });

  // node_modules/date-fns/differenceInCalendarDays.js
  function differenceInCalendarDays(laterDate, earlierDate, options) {
    const [laterDate_, earlierDate_] = normalizeDates(
      options?.in,
      laterDate,
      earlierDate
    );
    const laterStartOfDay = startOfDay(laterDate_);
    const earlierStartOfDay = startOfDay(earlierDate_);
    const laterTimestamp = +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
    const earlierTimestamp = +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);
    return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
  }
  var init_differenceInCalendarDays = __esm({
    "node_modules/date-fns/differenceInCalendarDays.js"() {
      init_getTimezoneOffsetInMilliseconds();
      init_normalizeDates();
      init_constants();
      init_startOfDay();
    }
  });

  // node_modules/date-fns/startOfISOWeekYear.js
  function startOfISOWeekYear(date, options) {
    const year = getISOWeekYear(date, options);
    const fourthOfJanuary = constructFrom(options?.in || date, 0);
    fourthOfJanuary.setFullYear(year, 0, 4);
    fourthOfJanuary.setHours(0, 0, 0, 0);
    return startOfISOWeek(fourthOfJanuary);
  }
  var init_startOfISOWeekYear = __esm({
    "node_modules/date-fns/startOfISOWeekYear.js"() {
      init_constructFrom();
      init_getISOWeekYear();
      init_startOfISOWeek();
    }
  });

  // node_modules/date-fns/setISOWeekYear.js
  var init_setISOWeekYear = __esm({
    "node_modules/date-fns/setISOWeekYear.js"() {
    }
  });

  // node_modules/date-fns/addISOWeekYears.js
  var init_addISOWeekYears = __esm({
    "node_modules/date-fns/addISOWeekYears.js"() {
    }
  });

  // node_modules/date-fns/addMinutes.js
  var init_addMinutes = __esm({
    "node_modules/date-fns/addMinutes.js"() {
    }
  });

  // node_modules/date-fns/addQuarters.js
  var init_addQuarters = __esm({
    "node_modules/date-fns/addQuarters.js"() {
    }
  });

  // node_modules/date-fns/addSeconds.js
  var init_addSeconds = __esm({
    "node_modules/date-fns/addSeconds.js"() {
    }
  });

  // node_modules/date-fns/addWeeks.js
  var init_addWeeks = __esm({
    "node_modules/date-fns/addWeeks.js"() {
    }
  });

  // node_modules/date-fns/addYears.js
  var init_addYears = __esm({
    "node_modules/date-fns/addYears.js"() {
    }
  });

  // node_modules/date-fns/areIntervalsOverlapping.js
  var init_areIntervalsOverlapping = __esm({
    "node_modules/date-fns/areIntervalsOverlapping.js"() {
    }
  });

  // node_modules/date-fns/max.js
  var init_max = __esm({
    "node_modules/date-fns/max.js"() {
    }
  });

  // node_modules/date-fns/min.js
  var init_min = __esm({
    "node_modules/date-fns/min.js"() {
    }
  });

  // node_modules/date-fns/clamp.js
  var init_clamp = __esm({
    "node_modules/date-fns/clamp.js"() {
    }
  });

  // node_modules/date-fns/closestIndexTo.js
  var init_closestIndexTo = __esm({
    "node_modules/date-fns/closestIndexTo.js"() {
    }
  });

  // node_modules/date-fns/closestTo.js
  var init_closestTo = __esm({
    "node_modules/date-fns/closestTo.js"() {
    }
  });

  // node_modules/date-fns/compareAsc.js
  var init_compareAsc = __esm({
    "node_modules/date-fns/compareAsc.js"() {
    }
  });

  // node_modules/date-fns/compareDesc.js
  var init_compareDesc = __esm({
    "node_modules/date-fns/compareDesc.js"() {
    }
  });

  // node_modules/date-fns/constructNow.js
  var init_constructNow = __esm({
    "node_modules/date-fns/constructNow.js"() {
    }
  });

  // node_modules/date-fns/daysToWeeks.js
  var init_daysToWeeks = __esm({
    "node_modules/date-fns/daysToWeeks.js"() {
    }
  });

  // node_modules/date-fns/isSameDay.js
  var init_isSameDay = __esm({
    "node_modules/date-fns/isSameDay.js"() {
    }
  });

  // node_modules/date-fns/isDate.js
  function isDate(value) {
    return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
  }
  var init_isDate = __esm({
    "node_modules/date-fns/isDate.js"() {
    }
  });

  // node_modules/date-fns/isValid.js
  function isValid(date) {
    return !(!isDate(date) && typeof date !== "number" || isNaN(+toDate(date)));
  }
  var init_isValid = __esm({
    "node_modules/date-fns/isValid.js"() {
      init_isDate();
      init_toDate();
    }
  });

  // node_modules/date-fns/differenceInBusinessDays.js
  var init_differenceInBusinessDays = __esm({
    "node_modules/date-fns/differenceInBusinessDays.js"() {
    }
  });

  // node_modules/date-fns/differenceInCalendarISOWeekYears.js
  var init_differenceInCalendarISOWeekYears = __esm({
    "node_modules/date-fns/differenceInCalendarISOWeekYears.js"() {
    }
  });

  // node_modules/date-fns/differenceInCalendarISOWeeks.js
  var init_differenceInCalendarISOWeeks = __esm({
    "node_modules/date-fns/differenceInCalendarISOWeeks.js"() {
    }
  });

  // node_modules/date-fns/differenceInCalendarMonths.js
  var init_differenceInCalendarMonths = __esm({
    "node_modules/date-fns/differenceInCalendarMonths.js"() {
    }
  });

  // node_modules/date-fns/getQuarter.js
  var init_getQuarter = __esm({
    "node_modules/date-fns/getQuarter.js"() {
    }
  });

  // node_modules/date-fns/differenceInCalendarQuarters.js
  var init_differenceInCalendarQuarters = __esm({
    "node_modules/date-fns/differenceInCalendarQuarters.js"() {
    }
  });

  // node_modules/date-fns/differenceInCalendarWeeks.js
  var init_differenceInCalendarWeeks = __esm({
    "node_modules/date-fns/differenceInCalendarWeeks.js"() {
    }
  });

  // node_modules/date-fns/differenceInCalendarYears.js
  var init_differenceInCalendarYears = __esm({
    "node_modules/date-fns/differenceInCalendarYears.js"() {
    }
  });

  // node_modules/date-fns/differenceInDays.js
  var init_differenceInDays = __esm({
    "node_modules/date-fns/differenceInDays.js"() {
    }
  });

  // node_modules/date-fns/differenceInHours.js
  var init_differenceInHours = __esm({
    "node_modules/date-fns/differenceInHours.js"() {
    }
  });

  // node_modules/date-fns/subISOWeekYears.js
  var init_subISOWeekYears = __esm({
    "node_modules/date-fns/subISOWeekYears.js"() {
    }
  });

  // node_modules/date-fns/differenceInISOWeekYears.js
  var init_differenceInISOWeekYears = __esm({
    "node_modules/date-fns/differenceInISOWeekYears.js"() {
    }
  });

  // node_modules/date-fns/differenceInMilliseconds.js
  var init_differenceInMilliseconds = __esm({
    "node_modules/date-fns/differenceInMilliseconds.js"() {
    }
  });

  // node_modules/date-fns/differenceInMinutes.js
  var init_differenceInMinutes = __esm({
    "node_modules/date-fns/differenceInMinutes.js"() {
    }
  });

  // node_modules/date-fns/endOfDay.js
  var init_endOfDay = __esm({
    "node_modules/date-fns/endOfDay.js"() {
    }
  });

  // node_modules/date-fns/endOfMonth.js
  var init_endOfMonth = __esm({
    "node_modules/date-fns/endOfMonth.js"() {
    }
  });

  // node_modules/date-fns/isLastDayOfMonth.js
  var init_isLastDayOfMonth = __esm({
    "node_modules/date-fns/isLastDayOfMonth.js"() {
    }
  });

  // node_modules/date-fns/differenceInMonths.js
  var init_differenceInMonths = __esm({
    "node_modules/date-fns/differenceInMonths.js"() {
    }
  });

  // node_modules/date-fns/differenceInQuarters.js
  var init_differenceInQuarters = __esm({
    "node_modules/date-fns/differenceInQuarters.js"() {
    }
  });

  // node_modules/date-fns/differenceInSeconds.js
  var init_differenceInSeconds = __esm({
    "node_modules/date-fns/differenceInSeconds.js"() {
    }
  });

  // node_modules/date-fns/differenceInWeeks.js
  var init_differenceInWeeks = __esm({
    "node_modules/date-fns/differenceInWeeks.js"() {
    }
  });

  // node_modules/date-fns/differenceInYears.js
  var init_differenceInYears = __esm({
    "node_modules/date-fns/differenceInYears.js"() {
    }
  });

  // node_modules/date-fns/eachDayOfInterval.js
  var init_eachDayOfInterval = __esm({
    "node_modules/date-fns/eachDayOfInterval.js"() {
    }
  });

  // node_modules/date-fns/eachHourOfInterval.js
  var init_eachHourOfInterval = __esm({
    "node_modules/date-fns/eachHourOfInterval.js"() {
    }
  });

  // node_modules/date-fns/eachMinuteOfInterval.js
  var init_eachMinuteOfInterval = __esm({
    "node_modules/date-fns/eachMinuteOfInterval.js"() {
    }
  });

  // node_modules/date-fns/eachMonthOfInterval.js
  var init_eachMonthOfInterval = __esm({
    "node_modules/date-fns/eachMonthOfInterval.js"() {
    }
  });

  // node_modules/date-fns/startOfQuarter.js
  var init_startOfQuarter = __esm({
    "node_modules/date-fns/startOfQuarter.js"() {
    }
  });

  // node_modules/date-fns/eachQuarterOfInterval.js
  var init_eachQuarterOfInterval = __esm({
    "node_modules/date-fns/eachQuarterOfInterval.js"() {
    }
  });

  // node_modules/date-fns/eachWeekOfInterval.js
  var init_eachWeekOfInterval = __esm({
    "node_modules/date-fns/eachWeekOfInterval.js"() {
    }
  });

  // node_modules/date-fns/eachWeekendOfInterval.js
  var init_eachWeekendOfInterval = __esm({
    "node_modules/date-fns/eachWeekendOfInterval.js"() {
    }
  });

  // node_modules/date-fns/startOfMonth.js
  var init_startOfMonth = __esm({
    "node_modules/date-fns/startOfMonth.js"() {
    }
  });

  // node_modules/date-fns/eachWeekendOfMonth.js
  var init_eachWeekendOfMonth = __esm({
    "node_modules/date-fns/eachWeekendOfMonth.js"() {
    }
  });

  // node_modules/date-fns/endOfYear.js
  var init_endOfYear = __esm({
    "node_modules/date-fns/endOfYear.js"() {
    }
  });

  // node_modules/date-fns/startOfYear.js
  function startOfYear(date, options) {
    const date_ = toDate(date, options?.in);
    date_.setFullYear(date_.getFullYear(), 0, 1);
    date_.setHours(0, 0, 0, 0);
    return date_;
  }
  var init_startOfYear = __esm({
    "node_modules/date-fns/startOfYear.js"() {
      init_toDate();
    }
  });

  // node_modules/date-fns/eachWeekendOfYear.js
  var init_eachWeekendOfYear = __esm({
    "node_modules/date-fns/eachWeekendOfYear.js"() {
    }
  });

  // node_modules/date-fns/eachYearOfInterval.js
  var init_eachYearOfInterval = __esm({
    "node_modules/date-fns/eachYearOfInterval.js"() {
    }
  });

  // node_modules/date-fns/endOfDecade.js
  var init_endOfDecade = __esm({
    "node_modules/date-fns/endOfDecade.js"() {
    }
  });

  // node_modules/date-fns/endOfHour.js
  var init_endOfHour = __esm({
    "node_modules/date-fns/endOfHour.js"() {
    }
  });

  // node_modules/date-fns/endOfWeek.js
  var init_endOfWeek = __esm({
    "node_modules/date-fns/endOfWeek.js"() {
    }
  });

  // node_modules/date-fns/endOfISOWeek.js
  var init_endOfISOWeek = __esm({
    "node_modules/date-fns/endOfISOWeek.js"() {
    }
  });

  // node_modules/date-fns/endOfISOWeekYear.js
  var init_endOfISOWeekYear = __esm({
    "node_modules/date-fns/endOfISOWeekYear.js"() {
    }
  });

  // node_modules/date-fns/endOfMinute.js
  var init_endOfMinute = __esm({
    "node_modules/date-fns/endOfMinute.js"() {
    }
  });

  // node_modules/date-fns/endOfQuarter.js
  var init_endOfQuarter = __esm({
    "node_modules/date-fns/endOfQuarter.js"() {
    }
  });

  // node_modules/date-fns/endOfSecond.js
  var init_endOfSecond = __esm({
    "node_modules/date-fns/endOfSecond.js"() {
    }
  });

  // node_modules/date-fns/endOfToday.js
  var init_endOfToday = __esm({
    "node_modules/date-fns/endOfToday.js"() {
    }
  });

  // node_modules/date-fns/endOfTomorrow.js
  var init_endOfTomorrow = __esm({
    "node_modules/date-fns/endOfTomorrow.js"() {
    }
  });

  // node_modules/date-fns/endOfYesterday.js
  var init_endOfYesterday = __esm({
    "node_modules/date-fns/endOfYesterday.js"() {
    }
  });

  // node_modules/date-fns/locale/en-US/_lib/formatDistance.js
  var formatDistanceLocale, formatDistance;
  var init_formatDistance = __esm({
    "node_modules/date-fns/locale/en-US/_lib/formatDistance.js"() {
      formatDistanceLocale = {
        lessThanXSeconds: {
          one: "less than a second",
          other: "less than {{count}} seconds"
        },
        xSeconds: {
          one: "1 second",
          other: "{{count}} seconds"
        },
        halfAMinute: "half a minute",
        lessThanXMinutes: {
          one: "less than a minute",
          other: "less than {{count}} minutes"
        },
        xMinutes: {
          one: "1 minute",
          other: "{{count}} minutes"
        },
        aboutXHours: {
          one: "about 1 hour",
          other: "about {{count}} hours"
        },
        xHours: {
          one: "1 hour",
          other: "{{count}} hours"
        },
        xDays: {
          one: "1 day",
          other: "{{count}} days"
        },
        aboutXWeeks: {
          one: "about 1 week",
          other: "about {{count}} weeks"
        },
        xWeeks: {
          one: "1 week",
          other: "{{count}} weeks"
        },
        aboutXMonths: {
          one: "about 1 month",
          other: "about {{count}} months"
        },
        xMonths: {
          one: "1 month",
          other: "{{count}} months"
        },
        aboutXYears: {
          one: "about 1 year",
          other: "about {{count}} years"
        },
        xYears: {
          one: "1 year",
          other: "{{count}} years"
        },
        overXYears: {
          one: "over 1 year",
          other: "over {{count}} years"
        },
        almostXYears: {
          one: "almost 1 year",
          other: "almost {{count}} years"
        }
      };
      formatDistance = (token, count, options) => {
        let result;
        const tokenValue = formatDistanceLocale[token];
        if (typeof tokenValue === "string") {
          result = tokenValue;
        } else if (count === 1) {
          result = tokenValue.one;
        } else {
          result = tokenValue.other.replace("{{count}}", count.toString());
        }
        if (options?.addSuffix) {
          if (options.comparison && options.comparison > 0) {
            return "in " + result;
          } else {
            return result + " ago";
          }
        }
        return result;
      };
    }
  });

  // node_modules/date-fns/locale/_lib/buildFormatLongFn.js
  function buildFormatLongFn(args) {
    return (options = {}) => {
      const width = options.width ? String(options.width) : args.defaultWidth;
      const format3 = args.formats[width] || args.formats[args.defaultWidth];
      return format3;
    };
  }
  var init_buildFormatLongFn = __esm({
    "node_modules/date-fns/locale/_lib/buildFormatLongFn.js"() {
    }
  });

  // node_modules/date-fns/locale/en-US/_lib/formatLong.js
  var dateFormats, timeFormats, dateTimeFormats, formatLong;
  var init_formatLong = __esm({
    "node_modules/date-fns/locale/en-US/_lib/formatLong.js"() {
      init_buildFormatLongFn();
      dateFormats = {
        full: "EEEE, MMMM do, y",
        long: "MMMM do, y",
        medium: "MMM d, y",
        short: "MM/dd/yyyy"
      };
      timeFormats = {
        full: "h:mm:ss a zzzz",
        long: "h:mm:ss a z",
        medium: "h:mm:ss a",
        short: "h:mm a"
      };
      dateTimeFormats = {
        full: "{{date}} 'at' {{time}}",
        long: "{{date}} 'at' {{time}}",
        medium: "{{date}}, {{time}}",
        short: "{{date}}, {{time}}"
      };
      formatLong = {
        date: buildFormatLongFn({
          formats: dateFormats,
          defaultWidth: "full"
        }),
        time: buildFormatLongFn({
          formats: timeFormats,
          defaultWidth: "full"
        }),
        dateTime: buildFormatLongFn({
          formats: dateTimeFormats,
          defaultWidth: "full"
        })
      };
    }
  });

  // node_modules/date-fns/locale/en-US/_lib/formatRelative.js
  var formatRelativeLocale, formatRelative;
  var init_formatRelative = __esm({
    "node_modules/date-fns/locale/en-US/_lib/formatRelative.js"() {
      formatRelativeLocale = {
        lastWeek: "'last' eeee 'at' p",
        yesterday: "'yesterday at' p",
        today: "'today at' p",
        tomorrow: "'tomorrow at' p",
        nextWeek: "eeee 'at' p",
        other: "P"
      };
      formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];
    }
  });

  // node_modules/date-fns/locale/_lib/buildLocalizeFn.js
  function buildLocalizeFn(args) {
    return (value, options) => {
      const context = options?.context ? String(options.context) : "standalone";
      let valuesArray;
      if (context === "formatting" && args.formattingValues) {
        const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        const width = options?.width ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        const defaultWidth = args.defaultWidth;
        const width = options?.width ? String(options.width) : args.defaultWidth;
        valuesArray = args.values[width] || args.values[defaultWidth];
      }
      const index = args.argumentCallback ? args.argumentCallback(value) : value;
      return valuesArray[index];
    };
  }
  var init_buildLocalizeFn = __esm({
    "node_modules/date-fns/locale/_lib/buildLocalizeFn.js"() {
    }
  });

  // node_modules/date-fns/locale/en-US/_lib/localize.js
  var eraValues, quarterValues, monthValues, dayValues, dayPeriodValues, formattingDayPeriodValues, ordinalNumber, localize;
  var init_localize = __esm({
    "node_modules/date-fns/locale/en-US/_lib/localize.js"() {
      init_buildLocalizeFn();
      eraValues = {
        narrow: ["B", "A"],
        abbreviated: ["BC", "AD"],
        wide: ["Before Christ", "Anno Domini"]
      };
      quarterValues = {
        narrow: ["1", "2", "3", "4"],
        abbreviated: ["Q1", "Q2", "Q3", "Q4"],
        wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
      };
      monthValues = {
        narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
        abbreviated: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        wide: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ]
      };
      dayValues = {
        narrow: ["S", "M", "T", "W", "T", "F", "S"],
        short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        wide: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ]
      };
      dayPeriodValues = {
        narrow: {
          am: "a",
          pm: "p",
          midnight: "mi",
          noon: "n",
          morning: "morning",
          afternoon: "afternoon",
          evening: "evening",
          night: "night"
        },
        abbreviated: {
          am: "AM",
          pm: "PM",
          midnight: "midnight",
          noon: "noon",
          morning: "morning",
          afternoon: "afternoon",
          evening: "evening",
          night: "night"
        },
        wide: {
          am: "a.m.",
          pm: "p.m.",
          midnight: "midnight",
          noon: "noon",
          morning: "morning",
          afternoon: "afternoon",
          evening: "evening",
          night: "night"
        }
      };
      formattingDayPeriodValues = {
        narrow: {
          am: "a",
          pm: "p",
          midnight: "mi",
          noon: "n",
          morning: "in the morning",
          afternoon: "in the afternoon",
          evening: "in the evening",
          night: "at night"
        },
        abbreviated: {
          am: "AM",
          pm: "PM",
          midnight: "midnight",
          noon: "noon",
          morning: "in the morning",
          afternoon: "in the afternoon",
          evening: "in the evening",
          night: "at night"
        },
        wide: {
          am: "a.m.",
          pm: "p.m.",
          midnight: "midnight",
          noon: "noon",
          morning: "in the morning",
          afternoon: "in the afternoon",
          evening: "in the evening",
          night: "at night"
        }
      };
      ordinalNumber = (dirtyNumber, _options) => {
        const number = Number(dirtyNumber);
        const rem100 = number % 100;
        if (rem100 > 20 || rem100 < 10) {
          switch (rem100 % 10) {
            case 1:
              return number + "st";
            case 2:
              return number + "nd";
            case 3:
              return number + "rd";
          }
        }
        return number + "th";
      };
      localize = {
        ordinalNumber,
        era: buildLocalizeFn({
          values: eraValues,
          defaultWidth: "wide"
        }),
        quarter: buildLocalizeFn({
          values: quarterValues,
          defaultWidth: "wide",
          argumentCallback: (quarter) => quarter - 1
        }),
        month: buildLocalizeFn({
          values: monthValues,
          defaultWidth: "wide"
        }),
        day: buildLocalizeFn({
          values: dayValues,
          defaultWidth: "wide"
        }),
        dayPeriod: buildLocalizeFn({
          values: dayPeriodValues,
          defaultWidth: "wide",
          formattingValues: formattingDayPeriodValues,
          defaultFormattingWidth: "wide"
        })
      };
    }
  });

  // node_modules/date-fns/locale/_lib/buildMatchFn.js
  function buildMatchFn(args) {
    return (string, options = {}) => {
      const width = options.width;
      const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
      const matchResult = string.match(matchPattern);
      if (!matchResult) {
        return null;
      }
      const matchedString = matchResult[0];
      const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
      const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
        // [TODO] -- I challenge you to fix the type
        findKey(parsePatterns, (pattern) => pattern.test(matchedString))
      );
      let value;
      value = args.valueCallback ? args.valueCallback(key) : key;
      value = options.valueCallback ? (
        // [TODO] -- I challenge you to fix the type
        options.valueCallback(value)
      ) : value;
      const rest = string.slice(matchedString.length);
      return { value, rest };
    };
  }
  function findKey(object, predicate) {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
        return key;
      }
    }
    return void 0;
  }
  function findIndex(array, predicate) {
    for (let key = 0; key < array.length; key++) {
      if (predicate(array[key])) {
        return key;
      }
    }
    return void 0;
  }
  var init_buildMatchFn = __esm({
    "node_modules/date-fns/locale/_lib/buildMatchFn.js"() {
    }
  });

  // node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
  function buildMatchPatternFn(args) {
    return (string, options = {}) => {
      const matchResult = string.match(args.matchPattern);
      if (!matchResult) return null;
      const matchedString = matchResult[0];
      const parseResult = string.match(args.parsePattern);
      if (!parseResult) return null;
      let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      const rest = string.slice(matchedString.length);
      return { value, rest };
    };
  }
  var init_buildMatchPatternFn = __esm({
    "node_modules/date-fns/locale/_lib/buildMatchPatternFn.js"() {
    }
  });

  // node_modules/date-fns/locale/en-US/_lib/match.js
  var matchOrdinalNumberPattern, parseOrdinalNumberPattern, matchEraPatterns, parseEraPatterns, matchQuarterPatterns, parseQuarterPatterns, matchMonthPatterns, parseMonthPatterns, matchDayPatterns, parseDayPatterns, matchDayPeriodPatterns, parseDayPeriodPatterns, match;
  var init_match = __esm({
    "node_modules/date-fns/locale/en-US/_lib/match.js"() {
      init_buildMatchFn();
      init_buildMatchPatternFn();
      matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
      parseOrdinalNumberPattern = /\d+/i;
      matchEraPatterns = {
        narrow: /^(b|a)/i,
        abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
        wide: /^(before christ|before common era|anno domini|common era)/i
      };
      parseEraPatterns = {
        any: [/^b/i, /^(a|c)/i]
      };
      matchQuarterPatterns = {
        narrow: /^[1234]/i,
        abbreviated: /^q[1234]/i,
        wide: /^[1234](th|st|nd|rd)? quarter/i
      };
      parseQuarterPatterns = {
        any: [/1/i, /2/i, /3/i, /4/i]
      };
      matchMonthPatterns = {
        narrow: /^[jfmasond]/i,
        abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
        wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
      };
      parseMonthPatterns = {
        narrow: [
          /^j/i,
          /^f/i,
          /^m/i,
          /^a/i,
          /^m/i,
          /^j/i,
          /^j/i,
          /^a/i,
          /^s/i,
          /^o/i,
          /^n/i,
          /^d/i
        ],
        any: [
          /^ja/i,
          /^f/i,
          /^mar/i,
          /^ap/i,
          /^may/i,
          /^jun/i,
          /^jul/i,
          /^au/i,
          /^s/i,
          /^o/i,
          /^n/i,
          /^d/i
        ]
      };
      matchDayPatterns = {
        narrow: /^[smtwf]/i,
        short: /^(su|mo|tu|we|th|fr|sa)/i,
        abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
        wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
      };
      parseDayPatterns = {
        narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
        any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
      };
      matchDayPeriodPatterns = {
        narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
        any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
      };
      parseDayPeriodPatterns = {
        any: {
          am: /^a/i,
          pm: /^p/i,
          midnight: /^mi/i,
          noon: /^no/i,
          morning: /morning/i,
          afternoon: /afternoon/i,
          evening: /evening/i,
          night: /night/i
        }
      };
      match = {
        ordinalNumber: buildMatchPatternFn({
          matchPattern: matchOrdinalNumberPattern,
          parsePattern: parseOrdinalNumberPattern,
          valueCallback: (value) => parseInt(value, 10)
        }),
        era: buildMatchFn({
          matchPatterns: matchEraPatterns,
          defaultMatchWidth: "wide",
          parsePatterns: parseEraPatterns,
          defaultParseWidth: "any"
        }),
        quarter: buildMatchFn({
          matchPatterns: matchQuarterPatterns,
          defaultMatchWidth: "wide",
          parsePatterns: parseQuarterPatterns,
          defaultParseWidth: "any",
          valueCallback: (index) => index + 1
        }),
        month: buildMatchFn({
          matchPatterns: matchMonthPatterns,
          defaultMatchWidth: "wide",
          parsePatterns: parseMonthPatterns,
          defaultParseWidth: "any"
        }),
        day: buildMatchFn({
          matchPatterns: matchDayPatterns,
          defaultMatchWidth: "wide",
          parsePatterns: parseDayPatterns,
          defaultParseWidth: "any"
        }),
        dayPeriod: buildMatchFn({
          matchPatterns: matchDayPeriodPatterns,
          defaultMatchWidth: "any",
          parsePatterns: parseDayPeriodPatterns,
          defaultParseWidth: "any"
        })
      };
    }
  });

  // node_modules/date-fns/locale/en-US.js
  var enUS;
  var init_en_US = __esm({
    "node_modules/date-fns/locale/en-US.js"() {
      init_formatDistance();
      init_formatLong();
      init_formatRelative();
      init_localize();
      init_match();
      enUS = {
        code: "en-US",
        formatDistance,
        formatLong,
        formatRelative,
        localize,
        match,
        options: {
          weekStartsOn: 0,
          firstWeekContainsDate: 1
        }
      };
    }
  });

  // node_modules/date-fns/_lib/defaultLocale.js
  var init_defaultLocale = __esm({
    "node_modules/date-fns/_lib/defaultLocale.js"() {
      init_en_US();
    }
  });

  // node_modules/date-fns/getDayOfYear.js
  function getDayOfYear(date, options) {
    const _date = toDate(date, options?.in);
    const diff = differenceInCalendarDays(_date, startOfYear(_date));
    const dayOfYear = diff + 1;
    return dayOfYear;
  }
  var init_getDayOfYear = __esm({
    "node_modules/date-fns/getDayOfYear.js"() {
      init_differenceInCalendarDays();
      init_startOfYear();
      init_toDate();
    }
  });

  // node_modules/date-fns/getISOWeek.js
  function getISOWeek(date, options) {
    const _date = toDate(date, options?.in);
    const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
    return Math.round(diff / millisecondsInWeek) + 1;
  }
  var init_getISOWeek = __esm({
    "node_modules/date-fns/getISOWeek.js"() {
      init_constants();
      init_startOfISOWeek();
      init_startOfISOWeekYear();
      init_toDate();
    }
  });

  // node_modules/date-fns/getWeekYear.js
  function getWeekYear(date, options) {
    const _date = toDate(date, options?.in);
    const year = _date.getFullYear();
    const defaultOptions2 = getDefaultOptions();
    const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
    const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
    firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
    firstWeekOfNextYear.setHours(0, 0, 0, 0);
    const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
    const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
    firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
    firstWeekOfThisYear.setHours(0, 0, 0, 0);
    const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
    if (+_date >= +startOfNextYear) {
      return year + 1;
    } else if (+_date >= +startOfThisYear) {
      return year;
    } else {
      return year - 1;
    }
  }
  var init_getWeekYear = __esm({
    "node_modules/date-fns/getWeekYear.js"() {
      init_defaultOptions();
      init_constructFrom();
      init_startOfWeek();
      init_toDate();
    }
  });

  // node_modules/date-fns/startOfWeekYear.js
  function startOfWeekYear(date, options) {
    const defaultOptions2 = getDefaultOptions();
    const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
    const year = getWeekYear(date, options);
    const firstWeek = constructFrom(options?.in || date, 0);
    firstWeek.setFullYear(year, 0, firstWeekContainsDate);
    firstWeek.setHours(0, 0, 0, 0);
    const _date = startOfWeek(firstWeek, options);
    return _date;
  }
  var init_startOfWeekYear = __esm({
    "node_modules/date-fns/startOfWeekYear.js"() {
      init_defaultOptions();
      init_constructFrom();
      init_getWeekYear();
      init_startOfWeek();
    }
  });

  // node_modules/date-fns/getWeek.js
  function getWeek(date, options) {
    const _date = toDate(date, options?.in);
    const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
    return Math.round(diff / millisecondsInWeek) + 1;
  }
  var init_getWeek = __esm({
    "node_modules/date-fns/getWeek.js"() {
      init_constants();
      init_startOfWeek();
      init_startOfWeekYear();
      init_toDate();
    }
  });

  // node_modules/date-fns/_lib/addLeadingZeros.js
  function addLeadingZeros(number, targetLength) {
    const sign = number < 0 ? "-" : "";
    const output = Math.abs(number).toString().padStart(targetLength, "0");
    return sign + output;
  }
  var init_addLeadingZeros = __esm({
    "node_modules/date-fns/_lib/addLeadingZeros.js"() {
    }
  });

  // node_modules/date-fns/_lib/format/lightFormatters.js
  var lightFormatters;
  var init_lightFormatters = __esm({
    "node_modules/date-fns/_lib/format/lightFormatters.js"() {
      init_addLeadingZeros();
      lightFormatters = {
        // Year
        y(date, token) {
          const signedYear = date.getFullYear();
          const year = signedYear > 0 ? signedYear : 1 - signedYear;
          return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
        },
        // Month
        M(date, token) {
          const month = date.getMonth();
          return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
        },
        // Day of the month
        d(date, token) {
          return addLeadingZeros(date.getDate(), token.length);
        },
        // AM or PM
        a(date, token) {
          const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
          switch (token) {
            case "a":
            case "aa":
              return dayPeriodEnumValue.toUpperCase();
            case "aaa":
              return dayPeriodEnumValue;
            case "aaaaa":
              return dayPeriodEnumValue[0];
            case "aaaa":
            default:
              return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
          }
        },
        // Hour [1-12]
        h(date, token) {
          return addLeadingZeros(date.getHours() % 12 || 12, token.length);
        },
        // Hour [0-23]
        H(date, token) {
          return addLeadingZeros(date.getHours(), token.length);
        },
        // Minute
        m(date, token) {
          return addLeadingZeros(date.getMinutes(), token.length);
        },
        // Second
        s(date, token) {
          return addLeadingZeros(date.getSeconds(), token.length);
        },
        // Fraction of second
        S(date, token) {
          const numberOfDigits = token.length;
          const milliseconds = date.getMilliseconds();
          const fractionalSeconds = Math.trunc(
            milliseconds * Math.pow(10, numberOfDigits - 3)
          );
          return addLeadingZeros(fractionalSeconds, token.length);
        }
      };
    }
  });

  // node_modules/date-fns/_lib/format/formatters.js
  function formatTimezoneShort(offset, delimiter = "") {
    const sign = offset > 0 ? "-" : "+";
    const absOffset = Math.abs(offset);
    const hours = Math.trunc(absOffset / 60);
    const minutes = absOffset % 60;
    if (minutes === 0) {
      return sign + String(hours);
    }
    return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
  }
  function formatTimezoneWithOptionalMinutes(offset, delimiter) {
    if (offset % 60 === 0) {
      const sign = offset > 0 ? "-" : "+";
      return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
    }
    return formatTimezone(offset, delimiter);
  }
  function formatTimezone(offset, delimiter = "") {
    const sign = offset > 0 ? "-" : "+";
    const absOffset = Math.abs(offset);
    const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
    const minutes = addLeadingZeros(absOffset % 60, 2);
    return sign + hours + delimiter + minutes;
  }
  var dayPeriodEnum, formatters;
  var init_formatters = __esm({
    "node_modules/date-fns/_lib/format/formatters.js"() {
      init_getDayOfYear();
      init_getISOWeek();
      init_getISOWeekYear();
      init_getWeek();
      init_getWeekYear();
      init_addLeadingZeros();
      init_lightFormatters();
      dayPeriodEnum = {
        am: "am",
        pm: "pm",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
      };
      formatters = {
        // Era
        G: function(date, token, localize2) {
          const era = date.getFullYear() > 0 ? 1 : 0;
          switch (token) {
            // AD, BC
            case "G":
            case "GG":
            case "GGG":
              return localize2.era(era, { width: "abbreviated" });
            // A, B
            case "GGGGG":
              return localize2.era(era, { width: "narrow" });
            // Anno Domini, Before Christ
            case "GGGG":
            default:
              return localize2.era(era, { width: "wide" });
          }
        },
        // Year
        y: function(date, token, localize2) {
          if (token === "yo") {
            const signedYear = date.getFullYear();
            const year = signedYear > 0 ? signedYear : 1 - signedYear;
            return localize2.ordinalNumber(year, { unit: "year" });
          }
          return lightFormatters.y(date, token);
        },
        // Local week-numbering year
        Y: function(date, token, localize2, options) {
          const signedWeekYear = getWeekYear(date, options);
          const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
          if (token === "YY") {
            const twoDigitYear = weekYear % 100;
            return addLeadingZeros(twoDigitYear, 2);
          }
          if (token === "Yo") {
            return localize2.ordinalNumber(weekYear, { unit: "year" });
          }
          return addLeadingZeros(weekYear, token.length);
        },
        // ISO week-numbering year
        R: function(date, token) {
          const isoWeekYear = getISOWeekYear(date);
          return addLeadingZeros(isoWeekYear, token.length);
        },
        // Extended year. This is a single number designating the year of this calendar system.
        // The main difference between `y` and `u` localizers are B.C. years:
        // | Year | `y` | `u` |
        // |------|-----|-----|
        // | AC 1 |   1 |   1 |
        // | BC 1 |   1 |   0 |
        // | BC 2 |   2 |  -1 |
        // Also `yy` always returns the last two digits of a year,
        // while `uu` pads single digit years to 2 characters and returns other years unchanged.
        u: function(date, token) {
          const year = date.getFullYear();
          return addLeadingZeros(year, token.length);
        },
        // Quarter
        Q: function(date, token, localize2) {
          const quarter = Math.ceil((date.getMonth() + 1) / 3);
          switch (token) {
            // 1, 2, 3, 4
            case "Q":
              return String(quarter);
            // 01, 02, 03, 04
            case "QQ":
              return addLeadingZeros(quarter, 2);
            // 1st, 2nd, 3rd, 4th
            case "Qo":
              return localize2.ordinalNumber(quarter, { unit: "quarter" });
            // Q1, Q2, Q3, Q4
            case "QQQ":
              return localize2.quarter(quarter, {
                width: "abbreviated",
                context: "formatting"
              });
            // 1, 2, 3, 4 (narrow quarter; could be not numerical)
            case "QQQQQ":
              return localize2.quarter(quarter, {
                width: "narrow",
                context: "formatting"
              });
            // 1st quarter, 2nd quarter, ...
            case "QQQQ":
            default:
              return localize2.quarter(quarter, {
                width: "wide",
                context: "formatting"
              });
          }
        },
        // Stand-alone quarter
        q: function(date, token, localize2) {
          const quarter = Math.ceil((date.getMonth() + 1) / 3);
          switch (token) {
            // 1, 2, 3, 4
            case "q":
              return String(quarter);
            // 01, 02, 03, 04
            case "qq":
              return addLeadingZeros(quarter, 2);
            // 1st, 2nd, 3rd, 4th
            case "qo":
              return localize2.ordinalNumber(quarter, { unit: "quarter" });
            // Q1, Q2, Q3, Q4
            case "qqq":
              return localize2.quarter(quarter, {
                width: "abbreviated",
                context: "standalone"
              });
            // 1, 2, 3, 4 (narrow quarter; could be not numerical)
            case "qqqqq":
              return localize2.quarter(quarter, {
                width: "narrow",
                context: "standalone"
              });
            // 1st quarter, 2nd quarter, ...
            case "qqqq":
            default:
              return localize2.quarter(quarter, {
                width: "wide",
                context: "standalone"
              });
          }
        },
        // Month
        M: function(date, token, localize2) {
          const month = date.getMonth();
          switch (token) {
            case "M":
            case "MM":
              return lightFormatters.M(date, token);
            // 1st, 2nd, ..., 12th
            case "Mo":
              return localize2.ordinalNumber(month + 1, { unit: "month" });
            // Jan, Feb, ..., Dec
            case "MMM":
              return localize2.month(month, {
                width: "abbreviated",
                context: "formatting"
              });
            // J, F, ..., D
            case "MMMMM":
              return localize2.month(month, {
                width: "narrow",
                context: "formatting"
              });
            // January, February, ..., December
            case "MMMM":
            default:
              return localize2.month(month, { width: "wide", context: "formatting" });
          }
        },
        // Stand-alone month
        L: function(date, token, localize2) {
          const month = date.getMonth();
          switch (token) {
            // 1, 2, ..., 12
            case "L":
              return String(month + 1);
            // 01, 02, ..., 12
            case "LL":
              return addLeadingZeros(month + 1, 2);
            // 1st, 2nd, ..., 12th
            case "Lo":
              return localize2.ordinalNumber(month + 1, { unit: "month" });
            // Jan, Feb, ..., Dec
            case "LLL":
              return localize2.month(month, {
                width: "abbreviated",
                context: "standalone"
              });
            // J, F, ..., D
            case "LLLLL":
              return localize2.month(month, {
                width: "narrow",
                context: "standalone"
              });
            // January, February, ..., December
            case "LLLL":
            default:
              return localize2.month(month, { width: "wide", context: "standalone" });
          }
        },
        // Local week of year
        w: function(date, token, localize2, options) {
          const week = getWeek(date, options);
          if (token === "wo") {
            return localize2.ordinalNumber(week, { unit: "week" });
          }
          return addLeadingZeros(week, token.length);
        },
        // ISO week of year
        I: function(date, token, localize2) {
          const isoWeek = getISOWeek(date);
          if (token === "Io") {
            return localize2.ordinalNumber(isoWeek, { unit: "week" });
          }
          return addLeadingZeros(isoWeek, token.length);
        },
        // Day of the month
        d: function(date, token, localize2) {
          if (token === "do") {
            return localize2.ordinalNumber(date.getDate(), { unit: "date" });
          }
          return lightFormatters.d(date, token);
        },
        // Day of year
        D: function(date, token, localize2) {
          const dayOfYear = getDayOfYear(date);
          if (token === "Do") {
            return localize2.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
          }
          return addLeadingZeros(dayOfYear, token.length);
        },
        // Day of week
        E: function(date, token, localize2) {
          const dayOfWeek = date.getDay();
          switch (token) {
            // Tue
            case "E":
            case "EE":
            case "EEE":
              return localize2.day(dayOfWeek, {
                width: "abbreviated",
                context: "formatting"
              });
            // T
            case "EEEEE":
              return localize2.day(dayOfWeek, {
                width: "narrow",
                context: "formatting"
              });
            // Tu
            case "EEEEEE":
              return localize2.day(dayOfWeek, {
                width: "short",
                context: "formatting"
              });
            // Tuesday
            case "EEEE":
            default:
              return localize2.day(dayOfWeek, {
                width: "wide",
                context: "formatting"
              });
          }
        },
        // Local day of week
        e: function(date, token, localize2, options) {
          const dayOfWeek = date.getDay();
          const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
          switch (token) {
            // Numerical value (Nth day of week with current locale or weekStartsOn)
            case "e":
              return String(localDayOfWeek);
            // Padded numerical value
            case "ee":
              return addLeadingZeros(localDayOfWeek, 2);
            // 1st, 2nd, ..., 7th
            case "eo":
              return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
            case "eee":
              return localize2.day(dayOfWeek, {
                width: "abbreviated",
                context: "formatting"
              });
            // T
            case "eeeee":
              return localize2.day(dayOfWeek, {
                width: "narrow",
                context: "formatting"
              });
            // Tu
            case "eeeeee":
              return localize2.day(dayOfWeek, {
                width: "short",
                context: "formatting"
              });
            // Tuesday
            case "eeee":
            default:
              return localize2.day(dayOfWeek, {
                width: "wide",
                context: "formatting"
              });
          }
        },
        // Stand-alone local day of week
        c: function(date, token, localize2, options) {
          const dayOfWeek = date.getDay();
          const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
          switch (token) {
            // Numerical value (same as in `e`)
            case "c":
              return String(localDayOfWeek);
            // Padded numerical value
            case "cc":
              return addLeadingZeros(localDayOfWeek, token.length);
            // 1st, 2nd, ..., 7th
            case "co":
              return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
            case "ccc":
              return localize2.day(dayOfWeek, {
                width: "abbreviated",
                context: "standalone"
              });
            // T
            case "ccccc":
              return localize2.day(dayOfWeek, {
                width: "narrow",
                context: "standalone"
              });
            // Tu
            case "cccccc":
              return localize2.day(dayOfWeek, {
                width: "short",
                context: "standalone"
              });
            // Tuesday
            case "cccc":
            default:
              return localize2.day(dayOfWeek, {
                width: "wide",
                context: "standalone"
              });
          }
        },
        // ISO day of week
        i: function(date, token, localize2) {
          const dayOfWeek = date.getDay();
          const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
          switch (token) {
            // 2
            case "i":
              return String(isoDayOfWeek);
            // 02
            case "ii":
              return addLeadingZeros(isoDayOfWeek, token.length);
            // 2nd
            case "io":
              return localize2.ordinalNumber(isoDayOfWeek, { unit: "day" });
            // Tue
            case "iii":
              return localize2.day(dayOfWeek, {
                width: "abbreviated",
                context: "formatting"
              });
            // T
            case "iiiii":
              return localize2.day(dayOfWeek, {
                width: "narrow",
                context: "formatting"
              });
            // Tu
            case "iiiiii":
              return localize2.day(dayOfWeek, {
                width: "short",
                context: "formatting"
              });
            // Tuesday
            case "iiii":
            default:
              return localize2.day(dayOfWeek, {
                width: "wide",
                context: "formatting"
              });
          }
        },
        // AM or PM
        a: function(date, token, localize2) {
          const hours = date.getHours();
          const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
          switch (token) {
            case "a":
            case "aa":
              return localize2.dayPeriod(dayPeriodEnumValue, {
                width: "abbreviated",
                context: "formatting"
              });
            case "aaa":
              return localize2.dayPeriod(dayPeriodEnumValue, {
                width: "abbreviated",
                context: "formatting"
              }).toLowerCase();
            case "aaaaa":
              return localize2.dayPeriod(dayPeriodEnumValue, {
                width: "narrow",
                context: "formatting"
              });
            case "aaaa":
            default:
              return localize2.dayPeriod(dayPeriodEnumValue, {
                width: "wide",
                context: "formatting"
              });
          }
        },
        // AM, PM, midnight, noon
        b: function(date, token, localize2) {
          const hours = date.getHours();
          let dayPeriodEnumValue;
          if (hours === 12) {
            dayPeriodEnumValue = dayPeriodEnum.noon;
          } else if (hours === 0) {
            dayPeriodEnumValue = dayPeriodEnum.midnight;
          } else {
            dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
          }
          switch (token) {
            case "b":
            case "bb":
              return localize2.dayPeriod(dayPeriodEnumValue, {
                width: "abbreviated",
                context: "formatting"
              });
            case "bbb":
              return localize2.dayPeriod(dayPeriodEnumValue, {
                width: "abbreviated",
                context: "formatting"
              }).toLowerCase();
            case "bbbbb":
              return localize2.dayPeriod(dayPeriodEnumValue, {
                width: "narrow",
                context: "formatting"
              });
            case "bbbb":
            default:
              return localize2.dayPeriod(dayPeriodEnumValue, {
                width: "wide",
                context: "formatting"
              });
          }
        },
        // in the morning, in the afternoon, in the evening, at night
        B: function(date, token, localize2) {
          const hours = date.getHours();
          let dayPeriodEnumValue;
          if (hours >= 17) {
            dayPeriodEnumValue = dayPeriodEnum.evening;
          } else if (hours >= 12) {
            dayPeriodEnumValue = dayPeriodEnum.afternoon;
          } else if (hours >= 4) {
            dayPeriodEnumValue = dayPeriodEnum.morning;
          } else {
            dayPeriodEnumValue = dayPeriodEnum.night;
          }
          switch (token) {
            case "B":
            case "BB":
            case "BBB":
              return localize2.dayPeriod(dayPeriodEnumValue, {
                width: "abbreviated",
                context: "formatting"
              });
            case "BBBBB":
              return localize2.dayPeriod(dayPeriodEnumValue, {
                width: "narrow",
                context: "formatting"
              });
            case "BBBB":
            default:
              return localize2.dayPeriod(dayPeriodEnumValue, {
                width: "wide",
                context: "formatting"
              });
          }
        },
        // Hour [1-12]
        h: function(date, token, localize2) {
          if (token === "ho") {
            let hours = date.getHours() % 12;
            if (hours === 0) hours = 12;
            return localize2.ordinalNumber(hours, { unit: "hour" });
          }
          return lightFormatters.h(date, token);
        },
        // Hour [0-23]
        H: function(date, token, localize2) {
          if (token === "Ho") {
            return localize2.ordinalNumber(date.getHours(), { unit: "hour" });
          }
          return lightFormatters.H(date, token);
        },
        // Hour [0-11]
        K: function(date, token, localize2) {
          const hours = date.getHours() % 12;
          if (token === "Ko") {
            return localize2.ordinalNumber(hours, { unit: "hour" });
          }
          return addLeadingZeros(hours, token.length);
        },
        // Hour [1-24]
        k: function(date, token, localize2) {
          let hours = date.getHours();
          if (hours === 0) hours = 24;
          if (token === "ko") {
            return localize2.ordinalNumber(hours, { unit: "hour" });
          }
          return addLeadingZeros(hours, token.length);
        },
        // Minute
        m: function(date, token, localize2) {
          if (token === "mo") {
            return localize2.ordinalNumber(date.getMinutes(), { unit: "minute" });
          }
          return lightFormatters.m(date, token);
        },
        // Second
        s: function(date, token, localize2) {
          if (token === "so") {
            return localize2.ordinalNumber(date.getSeconds(), { unit: "second" });
          }
          return lightFormatters.s(date, token);
        },
        // Fraction of second
        S: function(date, token) {
          return lightFormatters.S(date, token);
        },
        // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
        X: function(date, token, _localize) {
          const timezoneOffset = date.getTimezoneOffset();
          if (timezoneOffset === 0) {
            return "Z";
          }
          switch (token) {
            // Hours and optional minutes
            case "X":
              return formatTimezoneWithOptionalMinutes(timezoneOffset);
            // Hours, minutes and optional seconds without `:` delimiter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `XX`
            case "XXXX":
            case "XX":
              return formatTimezone(timezoneOffset);
            // Hours, minutes and optional seconds with `:` delimiter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `XXX`
            case "XXXXX":
            case "XXX":
            // Hours and minutes with `:` delimiter
            default:
              return formatTimezone(timezoneOffset, ":");
          }
        },
        // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
        x: function(date, token, _localize) {
          const timezoneOffset = date.getTimezoneOffset();
          switch (token) {
            // Hours and optional minutes
            case "x":
              return formatTimezoneWithOptionalMinutes(timezoneOffset);
            // Hours, minutes and optional seconds without `:` delimiter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `xx`
            case "xxxx":
            case "xx":
              return formatTimezone(timezoneOffset);
            // Hours, minutes and optional seconds with `:` delimiter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `xxx`
            case "xxxxx":
            case "xxx":
            // Hours and minutes with `:` delimiter
            default:
              return formatTimezone(timezoneOffset, ":");
          }
        },
        // Timezone (GMT)
        O: function(date, token, _localize) {
          const timezoneOffset = date.getTimezoneOffset();
          switch (token) {
            // Short
            case "O":
            case "OO":
            case "OOO":
              return "GMT" + formatTimezoneShort(timezoneOffset, ":");
            // Long
            case "OOOO":
            default:
              return "GMT" + formatTimezone(timezoneOffset, ":");
          }
        },
        // Timezone (specific non-location)
        z: function(date, token, _localize) {
          const timezoneOffset = date.getTimezoneOffset();
          switch (token) {
            // Short
            case "z":
            case "zz":
            case "zzz":
              return "GMT" + formatTimezoneShort(timezoneOffset, ":");
            // Long
            case "zzzz":
            default:
              return "GMT" + formatTimezone(timezoneOffset, ":");
          }
        },
        // Seconds timestamp
        t: function(date, token, _localize) {
          const timestamp = Math.trunc(+date / 1e3);
          return addLeadingZeros(timestamp, token.length);
        },
        // Milliseconds timestamp
        T: function(date, token, _localize) {
          return addLeadingZeros(+date, token.length);
        }
      };
    }
  });

  // node_modules/date-fns/_lib/format/longFormatters.js
  var dateLongFormatter, timeLongFormatter, dateTimeLongFormatter, longFormatters;
  var init_longFormatters = __esm({
    "node_modules/date-fns/_lib/format/longFormatters.js"() {
      dateLongFormatter = (pattern, formatLong2) => {
        switch (pattern) {
          case "P":
            return formatLong2.date({ width: "short" });
          case "PP":
            return formatLong2.date({ width: "medium" });
          case "PPP":
            return formatLong2.date({ width: "long" });
          case "PPPP":
          default:
            return formatLong2.date({ width: "full" });
        }
      };
      timeLongFormatter = (pattern, formatLong2) => {
        switch (pattern) {
          case "p":
            return formatLong2.time({ width: "short" });
          case "pp":
            return formatLong2.time({ width: "medium" });
          case "ppp":
            return formatLong2.time({ width: "long" });
          case "pppp":
          default:
            return formatLong2.time({ width: "full" });
        }
      };
      dateTimeLongFormatter = (pattern, formatLong2) => {
        const matchResult = pattern.match(/(P+)(p+)?/) || [];
        const datePattern = matchResult[1];
        const timePattern = matchResult[2];
        if (!timePattern) {
          return dateLongFormatter(pattern, formatLong2);
        }
        let dateTimeFormat;
        switch (datePattern) {
          case "P":
            dateTimeFormat = formatLong2.dateTime({ width: "short" });
            break;
          case "PP":
            dateTimeFormat = formatLong2.dateTime({ width: "medium" });
            break;
          case "PPP":
            dateTimeFormat = formatLong2.dateTime({ width: "long" });
            break;
          case "PPPP":
          default:
            dateTimeFormat = formatLong2.dateTime({ width: "full" });
            break;
        }
        return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
      };
      longFormatters = {
        p: timeLongFormatter,
        P: dateTimeLongFormatter
      };
    }
  });

  // node_modules/date-fns/_lib/protectedTokens.js
  function isProtectedDayOfYearToken(token) {
    return dayOfYearTokenRE.test(token);
  }
  function isProtectedWeekYearToken(token) {
    return weekYearTokenRE.test(token);
  }
  function warnOrThrowProtectedError(token, format3, input) {
    const _message = message(token, format3, input);
    console.warn(_message);
    if (throwTokens.includes(token)) throw new RangeError(_message);
  }
  function message(token, format3, input) {
    const subject = token[0] === "Y" ? "years" : "days of the month";
    return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format3}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
  }
  var dayOfYearTokenRE, weekYearTokenRE, throwTokens;
  var init_protectedTokens = __esm({
    "node_modules/date-fns/_lib/protectedTokens.js"() {
      dayOfYearTokenRE = /^D+$/;
      weekYearTokenRE = /^Y+$/;
      throwTokens = ["D", "DD", "YY", "YYYY"];
    }
  });

  // node_modules/date-fns/format.js
  function format(date, formatStr, options) {
    const defaultOptions2 = getDefaultOptions();
    const locale = options?.locale ?? defaultOptions2.locale ?? enUS;
    const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
    const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
    const originalDate = toDate(date, options?.in);
    if (!isValid(originalDate)) {
      throw new RangeError("Invalid time value");
    }
    let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        const longFormatter = longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    }).join("").match(formattingTokensRegExp).map((substring) => {
      if (substring === "''") {
        return { isToken: false, value: "'" };
      }
      const firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return { isToken: false, value: cleanEscapedString(substring) };
      }
      if (formatters[firstCharacter]) {
        return { isToken: true, value: substring };
      }
      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
        );
      }
      return { isToken: false, value: substring };
    });
    if (locale.localize.preprocessor) {
      parts = locale.localize.preprocessor(originalDate, parts);
    }
    const formatterOptions = {
      firstWeekContainsDate,
      weekStartsOn,
      locale
    };
    return parts.map((part) => {
      if (!part.isToken) return part.value;
      const token = part.value;
      if (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token) || !options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) {
        warnOrThrowProtectedError(token, formatStr, String(date));
      }
      const formatter = formatters[token[0]];
      return formatter(originalDate, token, locale.localize, formatterOptions);
    }).join("");
  }
  function cleanEscapedString(input) {
    const matched = input.match(escapedStringRegExp);
    if (!matched) {
      return input;
    }
    return matched[1].replace(doubleQuoteRegExp, "'");
  }
  var formattingTokensRegExp, longFormattingTokensRegExp, escapedStringRegExp, doubleQuoteRegExp, unescapedLatinCharacterRegExp;
  var init_format = __esm({
    "node_modules/date-fns/format.js"() {
      init_defaultLocale();
      init_defaultOptions();
      init_formatters();
      init_longFormatters();
      init_protectedTokens();
      init_isValid();
      init_toDate();
      formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
      longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
      escapedStringRegExp = /^'([^]*?)'?$/;
      doubleQuoteRegExp = /''/g;
      unescapedLatinCharacterRegExp = /[a-zA-Z]/;
    }
  });

  // node_modules/date-fns/formatDistance.js
  var init_formatDistance2 = __esm({
    "node_modules/date-fns/formatDistance.js"() {
    }
  });

  // node_modules/date-fns/formatDistanceStrict.js
  var init_formatDistanceStrict = __esm({
    "node_modules/date-fns/formatDistanceStrict.js"() {
    }
  });

  // node_modules/date-fns/formatDistanceToNow.js
  var init_formatDistanceToNow = __esm({
    "node_modules/date-fns/formatDistanceToNow.js"() {
    }
  });

  // node_modules/date-fns/formatDistanceToNowStrict.js
  var init_formatDistanceToNowStrict = __esm({
    "node_modules/date-fns/formatDistanceToNowStrict.js"() {
    }
  });

  // node_modules/date-fns/formatDuration.js
  var init_formatDuration = __esm({
    "node_modules/date-fns/formatDuration.js"() {
    }
  });

  // node_modules/date-fns/formatISO.js
  var init_formatISO = __esm({
    "node_modules/date-fns/formatISO.js"() {
    }
  });

  // node_modules/date-fns/formatISO9075.js
  var init_formatISO9075 = __esm({
    "node_modules/date-fns/formatISO9075.js"() {
    }
  });

  // node_modules/date-fns/formatISODuration.js
  var init_formatISODuration = __esm({
    "node_modules/date-fns/formatISODuration.js"() {
    }
  });

  // node_modules/date-fns/formatRFC3339.js
  var init_formatRFC3339 = __esm({
    "node_modules/date-fns/formatRFC3339.js"() {
    }
  });

  // node_modules/date-fns/formatRFC7231.js
  var init_formatRFC7231 = __esm({
    "node_modules/date-fns/formatRFC7231.js"() {
    }
  });

  // node_modules/date-fns/formatRelative.js
  var init_formatRelative2 = __esm({
    "node_modules/date-fns/formatRelative.js"() {
    }
  });

  // node_modules/date-fns/fromUnixTime.js
  var init_fromUnixTime = __esm({
    "node_modules/date-fns/fromUnixTime.js"() {
    }
  });

  // node_modules/date-fns/getDate.js
  var init_getDate = __esm({
    "node_modules/date-fns/getDate.js"() {
    }
  });

  // node_modules/date-fns/getDay.js
  var init_getDay = __esm({
    "node_modules/date-fns/getDay.js"() {
    }
  });

  // node_modules/date-fns/getDaysInMonth.js
  var init_getDaysInMonth = __esm({
    "node_modules/date-fns/getDaysInMonth.js"() {
    }
  });

  // node_modules/date-fns/isLeapYear.js
  var init_isLeapYear = __esm({
    "node_modules/date-fns/isLeapYear.js"() {
    }
  });

  // node_modules/date-fns/getDaysInYear.js
  var init_getDaysInYear = __esm({
    "node_modules/date-fns/getDaysInYear.js"() {
    }
  });

  // node_modules/date-fns/getDecade.js
  var init_getDecade = __esm({
    "node_modules/date-fns/getDecade.js"() {
    }
  });

  // node_modules/date-fns/getDefaultOptions.js
  function getDefaultOptions2() {
    return Object.assign({}, getDefaultOptions());
  }
  var init_getDefaultOptions = __esm({
    "node_modules/date-fns/getDefaultOptions.js"() {
      init_defaultOptions();
    }
  });

  // node_modules/date-fns/getHours.js
  var init_getHours = __esm({
    "node_modules/date-fns/getHours.js"() {
    }
  });

  // node_modules/date-fns/getISODay.js
  var init_getISODay = __esm({
    "node_modules/date-fns/getISODay.js"() {
    }
  });

  // node_modules/date-fns/getISOWeeksInYear.js
  var init_getISOWeeksInYear = __esm({
    "node_modules/date-fns/getISOWeeksInYear.js"() {
    }
  });

  // node_modules/date-fns/getMilliseconds.js
  var init_getMilliseconds = __esm({
    "node_modules/date-fns/getMilliseconds.js"() {
    }
  });

  // node_modules/date-fns/getMinutes.js
  var init_getMinutes = __esm({
    "node_modules/date-fns/getMinutes.js"() {
    }
  });

  // node_modules/date-fns/getMonth.js
  var init_getMonth = __esm({
    "node_modules/date-fns/getMonth.js"() {
    }
  });

  // node_modules/date-fns/getOverlappingDaysInIntervals.js
  var init_getOverlappingDaysInIntervals = __esm({
    "node_modules/date-fns/getOverlappingDaysInIntervals.js"() {
    }
  });

  // node_modules/date-fns/getSeconds.js
  var init_getSeconds = __esm({
    "node_modules/date-fns/getSeconds.js"() {
    }
  });

  // node_modules/date-fns/getTime.js
  var init_getTime = __esm({
    "node_modules/date-fns/getTime.js"() {
    }
  });

  // node_modules/date-fns/getUnixTime.js
  var init_getUnixTime = __esm({
    "node_modules/date-fns/getUnixTime.js"() {
    }
  });

  // node_modules/date-fns/getWeekOfMonth.js
  var init_getWeekOfMonth = __esm({
    "node_modules/date-fns/getWeekOfMonth.js"() {
    }
  });

  // node_modules/date-fns/lastDayOfMonth.js
  var init_lastDayOfMonth = __esm({
    "node_modules/date-fns/lastDayOfMonth.js"() {
    }
  });

  // node_modules/date-fns/getWeeksInMonth.js
  var init_getWeeksInMonth = __esm({
    "node_modules/date-fns/getWeeksInMonth.js"() {
    }
  });

  // node_modules/date-fns/getYear.js
  var init_getYear = __esm({
    "node_modules/date-fns/getYear.js"() {
    }
  });

  // node_modules/date-fns/hoursToMilliseconds.js
  var init_hoursToMilliseconds = __esm({
    "node_modules/date-fns/hoursToMilliseconds.js"() {
    }
  });

  // node_modules/date-fns/hoursToMinutes.js
  var init_hoursToMinutes = __esm({
    "node_modules/date-fns/hoursToMinutes.js"() {
    }
  });

  // node_modules/date-fns/hoursToSeconds.js
  var init_hoursToSeconds = __esm({
    "node_modules/date-fns/hoursToSeconds.js"() {
    }
  });

  // node_modules/date-fns/interval.js
  var init_interval = __esm({
    "node_modules/date-fns/interval.js"() {
    }
  });

  // node_modules/date-fns/intervalToDuration.js
  var init_intervalToDuration = __esm({
    "node_modules/date-fns/intervalToDuration.js"() {
    }
  });

  // node_modules/date-fns/intlFormat.js
  var init_intlFormat = __esm({
    "node_modules/date-fns/intlFormat.js"() {
    }
  });

  // node_modules/date-fns/intlFormatDistance.js
  var init_intlFormatDistance = __esm({
    "node_modules/date-fns/intlFormatDistance.js"() {
    }
  });

  // node_modules/date-fns/isAfter.js
  var init_isAfter = __esm({
    "node_modules/date-fns/isAfter.js"() {
    }
  });

  // node_modules/date-fns/isBefore.js
  var init_isBefore = __esm({
    "node_modules/date-fns/isBefore.js"() {
    }
  });

  // node_modules/date-fns/isEqual.js
  var init_isEqual = __esm({
    "node_modules/date-fns/isEqual.js"() {
    }
  });

  // node_modules/date-fns/isExists.js
  var init_isExists = __esm({
    "node_modules/date-fns/isExists.js"() {
    }
  });

  // node_modules/date-fns/isFirstDayOfMonth.js
  var init_isFirstDayOfMonth = __esm({
    "node_modules/date-fns/isFirstDayOfMonth.js"() {
    }
  });

  // node_modules/date-fns/isFriday.js
  var init_isFriday = __esm({
    "node_modules/date-fns/isFriday.js"() {
    }
  });

  // node_modules/date-fns/isFuture.js
  var init_isFuture = __esm({
    "node_modules/date-fns/isFuture.js"() {
    }
  });

  // node_modules/date-fns/transpose.js
  var init_transpose = __esm({
    "node_modules/date-fns/transpose.js"() {
    }
  });

  // node_modules/date-fns/setWeek.js
  var init_setWeek = __esm({
    "node_modules/date-fns/setWeek.js"() {
    }
  });

  // node_modules/date-fns/setISOWeek.js
  var init_setISOWeek = __esm({
    "node_modules/date-fns/setISOWeek.js"() {
    }
  });

  // node_modules/date-fns/setDay.js
  var init_setDay = __esm({
    "node_modules/date-fns/setDay.js"() {
    }
  });

  // node_modules/date-fns/setISODay.js
  var init_setISODay = __esm({
    "node_modules/date-fns/setISODay.js"() {
    }
  });

  // node_modules/date-fns/parse.js
  var init_parse = __esm({
    "node_modules/date-fns/parse.js"() {
    }
  });

  // node_modules/date-fns/isMatch.js
  var init_isMatch = __esm({
    "node_modules/date-fns/isMatch.js"() {
    }
  });

  // node_modules/date-fns/isMonday.js
  var init_isMonday = __esm({
    "node_modules/date-fns/isMonday.js"() {
    }
  });

  // node_modules/date-fns/isPast.js
  var init_isPast = __esm({
    "node_modules/date-fns/isPast.js"() {
    }
  });

  // node_modules/date-fns/startOfHour.js
  var init_startOfHour = __esm({
    "node_modules/date-fns/startOfHour.js"() {
    }
  });

  // node_modules/date-fns/isSameHour.js
  var init_isSameHour = __esm({
    "node_modules/date-fns/isSameHour.js"() {
    }
  });

  // node_modules/date-fns/isSameWeek.js
  var init_isSameWeek = __esm({
    "node_modules/date-fns/isSameWeek.js"() {
    }
  });

  // node_modules/date-fns/isSameISOWeek.js
  var init_isSameISOWeek = __esm({
    "node_modules/date-fns/isSameISOWeek.js"() {
    }
  });

  // node_modules/date-fns/isSameISOWeekYear.js
  var init_isSameISOWeekYear = __esm({
    "node_modules/date-fns/isSameISOWeekYear.js"() {
    }
  });

  // node_modules/date-fns/startOfMinute.js
  var init_startOfMinute = __esm({
    "node_modules/date-fns/startOfMinute.js"() {
    }
  });

  // node_modules/date-fns/isSameMinute.js
  var init_isSameMinute = __esm({
    "node_modules/date-fns/isSameMinute.js"() {
    }
  });

  // node_modules/date-fns/isSameMonth.js
  var init_isSameMonth = __esm({
    "node_modules/date-fns/isSameMonth.js"() {
    }
  });

  // node_modules/date-fns/isSameQuarter.js
  var init_isSameQuarter = __esm({
    "node_modules/date-fns/isSameQuarter.js"() {
    }
  });

  // node_modules/date-fns/startOfSecond.js
  var init_startOfSecond = __esm({
    "node_modules/date-fns/startOfSecond.js"() {
    }
  });

  // node_modules/date-fns/isSameSecond.js
  var init_isSameSecond = __esm({
    "node_modules/date-fns/isSameSecond.js"() {
    }
  });

  // node_modules/date-fns/isSameYear.js
  var init_isSameYear = __esm({
    "node_modules/date-fns/isSameYear.js"() {
    }
  });

  // node_modules/date-fns/isThisHour.js
  var init_isThisHour = __esm({
    "node_modules/date-fns/isThisHour.js"() {
    }
  });

  // node_modules/date-fns/isThisISOWeek.js
  var init_isThisISOWeek = __esm({
    "node_modules/date-fns/isThisISOWeek.js"() {
    }
  });

  // node_modules/date-fns/isThisMinute.js
  var init_isThisMinute = __esm({
    "node_modules/date-fns/isThisMinute.js"() {
    }
  });

  // node_modules/date-fns/isThisMonth.js
  var init_isThisMonth = __esm({
    "node_modules/date-fns/isThisMonth.js"() {
    }
  });

  // node_modules/date-fns/isThisQuarter.js
  var init_isThisQuarter = __esm({
    "node_modules/date-fns/isThisQuarter.js"() {
    }
  });

  // node_modules/date-fns/isThisSecond.js
  var init_isThisSecond = __esm({
    "node_modules/date-fns/isThisSecond.js"() {
    }
  });

  // node_modules/date-fns/isThisWeek.js
  var init_isThisWeek = __esm({
    "node_modules/date-fns/isThisWeek.js"() {
    }
  });

  // node_modules/date-fns/isThisYear.js
  var init_isThisYear = __esm({
    "node_modules/date-fns/isThisYear.js"() {
    }
  });

  // node_modules/date-fns/isThursday.js
  var init_isThursday = __esm({
    "node_modules/date-fns/isThursday.js"() {
    }
  });

  // node_modules/date-fns/isToday.js
  var init_isToday = __esm({
    "node_modules/date-fns/isToday.js"() {
    }
  });

  // node_modules/date-fns/isTomorrow.js
  var init_isTomorrow = __esm({
    "node_modules/date-fns/isTomorrow.js"() {
    }
  });

  // node_modules/date-fns/isTuesday.js
  var init_isTuesday = __esm({
    "node_modules/date-fns/isTuesday.js"() {
    }
  });

  // node_modules/date-fns/isWednesday.js
  var init_isWednesday = __esm({
    "node_modules/date-fns/isWednesday.js"() {
    }
  });

  // node_modules/date-fns/isWithinInterval.js
  var init_isWithinInterval = __esm({
    "node_modules/date-fns/isWithinInterval.js"() {
    }
  });

  // node_modules/date-fns/subDays.js
  function subDays(date, amount, options) {
    return addDays(date, -amount, options);
  }
  var init_subDays = __esm({
    "node_modules/date-fns/subDays.js"() {
      init_addDays();
    }
  });

  // node_modules/date-fns/isYesterday.js
  var init_isYesterday = __esm({
    "node_modules/date-fns/isYesterday.js"() {
    }
  });

  // node_modules/date-fns/lastDayOfDecade.js
  var init_lastDayOfDecade = __esm({
    "node_modules/date-fns/lastDayOfDecade.js"() {
    }
  });

  // node_modules/date-fns/lastDayOfWeek.js
  var init_lastDayOfWeek = __esm({
    "node_modules/date-fns/lastDayOfWeek.js"() {
    }
  });

  // node_modules/date-fns/lastDayOfISOWeek.js
  var init_lastDayOfISOWeek = __esm({
    "node_modules/date-fns/lastDayOfISOWeek.js"() {
    }
  });

  // node_modules/date-fns/lastDayOfISOWeekYear.js
  var init_lastDayOfISOWeekYear = __esm({
    "node_modules/date-fns/lastDayOfISOWeekYear.js"() {
    }
  });

  // node_modules/date-fns/lastDayOfQuarter.js
  var init_lastDayOfQuarter = __esm({
    "node_modules/date-fns/lastDayOfQuarter.js"() {
    }
  });

  // node_modules/date-fns/lastDayOfYear.js
  var init_lastDayOfYear = __esm({
    "node_modules/date-fns/lastDayOfYear.js"() {
    }
  });

  // node_modules/date-fns/lightFormat.js
  var init_lightFormat = __esm({
    "node_modules/date-fns/lightFormat.js"() {
    }
  });

  // node_modules/date-fns/milliseconds.js
  var init_milliseconds = __esm({
    "node_modules/date-fns/milliseconds.js"() {
    }
  });

  // node_modules/date-fns/millisecondsToHours.js
  var init_millisecondsToHours = __esm({
    "node_modules/date-fns/millisecondsToHours.js"() {
    }
  });

  // node_modules/date-fns/millisecondsToMinutes.js
  var init_millisecondsToMinutes = __esm({
    "node_modules/date-fns/millisecondsToMinutes.js"() {
    }
  });

  // node_modules/date-fns/millisecondsToSeconds.js
  var init_millisecondsToSeconds = __esm({
    "node_modules/date-fns/millisecondsToSeconds.js"() {
    }
  });

  // node_modules/date-fns/minutesToHours.js
  var init_minutesToHours = __esm({
    "node_modules/date-fns/minutesToHours.js"() {
    }
  });

  // node_modules/date-fns/minutesToMilliseconds.js
  var init_minutesToMilliseconds = __esm({
    "node_modules/date-fns/minutesToMilliseconds.js"() {
    }
  });

  // node_modules/date-fns/minutesToSeconds.js
  var init_minutesToSeconds = __esm({
    "node_modules/date-fns/minutesToSeconds.js"() {
    }
  });

  // node_modules/date-fns/monthsToQuarters.js
  var init_monthsToQuarters = __esm({
    "node_modules/date-fns/monthsToQuarters.js"() {
    }
  });

  // node_modules/date-fns/monthsToYears.js
  var init_monthsToYears = __esm({
    "node_modules/date-fns/monthsToYears.js"() {
    }
  });

  // node_modules/date-fns/nextDay.js
  var init_nextDay = __esm({
    "node_modules/date-fns/nextDay.js"() {
    }
  });

  // node_modules/date-fns/nextFriday.js
  var init_nextFriday = __esm({
    "node_modules/date-fns/nextFriday.js"() {
    }
  });

  // node_modules/date-fns/nextMonday.js
  var init_nextMonday = __esm({
    "node_modules/date-fns/nextMonday.js"() {
    }
  });

  // node_modules/date-fns/nextSaturday.js
  var init_nextSaturday = __esm({
    "node_modules/date-fns/nextSaturday.js"() {
    }
  });

  // node_modules/date-fns/nextSunday.js
  var init_nextSunday = __esm({
    "node_modules/date-fns/nextSunday.js"() {
    }
  });

  // node_modules/date-fns/nextThursday.js
  var init_nextThursday = __esm({
    "node_modules/date-fns/nextThursday.js"() {
    }
  });

  // node_modules/date-fns/nextTuesday.js
  var init_nextTuesday = __esm({
    "node_modules/date-fns/nextTuesday.js"() {
    }
  });

  // node_modules/date-fns/nextWednesday.js
  var init_nextWednesday = __esm({
    "node_modules/date-fns/nextWednesday.js"() {
    }
  });

  // node_modules/date-fns/parseISO.js
  var init_parseISO = __esm({
    "node_modules/date-fns/parseISO.js"() {
    }
  });

  // node_modules/date-fns/parseJSON.js
  var init_parseJSON = __esm({
    "node_modules/date-fns/parseJSON.js"() {
    }
  });

  // node_modules/date-fns/previousDay.js
  var init_previousDay = __esm({
    "node_modules/date-fns/previousDay.js"() {
    }
  });

  // node_modules/date-fns/previousFriday.js
  var init_previousFriday = __esm({
    "node_modules/date-fns/previousFriday.js"() {
    }
  });

  // node_modules/date-fns/previousMonday.js
  var init_previousMonday = __esm({
    "node_modules/date-fns/previousMonday.js"() {
    }
  });

  // node_modules/date-fns/previousSaturday.js
  var init_previousSaturday = __esm({
    "node_modules/date-fns/previousSaturday.js"() {
    }
  });

  // node_modules/date-fns/previousSunday.js
  var init_previousSunday = __esm({
    "node_modules/date-fns/previousSunday.js"() {
    }
  });

  // node_modules/date-fns/previousThursday.js
  var init_previousThursday = __esm({
    "node_modules/date-fns/previousThursday.js"() {
    }
  });

  // node_modules/date-fns/previousTuesday.js
  var init_previousTuesday = __esm({
    "node_modules/date-fns/previousTuesday.js"() {
    }
  });

  // node_modules/date-fns/previousWednesday.js
  var init_previousWednesday = __esm({
    "node_modules/date-fns/previousWednesday.js"() {
    }
  });

  // node_modules/date-fns/quartersToMonths.js
  var init_quartersToMonths = __esm({
    "node_modules/date-fns/quartersToMonths.js"() {
    }
  });

  // node_modules/date-fns/quartersToYears.js
  var init_quartersToYears = __esm({
    "node_modules/date-fns/quartersToYears.js"() {
    }
  });

  // node_modules/date-fns/roundToNearestHours.js
  var init_roundToNearestHours = __esm({
    "node_modules/date-fns/roundToNearestHours.js"() {
    }
  });

  // node_modules/date-fns/roundToNearestMinutes.js
  var init_roundToNearestMinutes = __esm({
    "node_modules/date-fns/roundToNearestMinutes.js"() {
    }
  });

  // node_modules/date-fns/secondsToHours.js
  var init_secondsToHours = __esm({
    "node_modules/date-fns/secondsToHours.js"() {
    }
  });

  // node_modules/date-fns/secondsToMilliseconds.js
  var init_secondsToMilliseconds = __esm({
    "node_modules/date-fns/secondsToMilliseconds.js"() {
    }
  });

  // node_modules/date-fns/secondsToMinutes.js
  var init_secondsToMinutes = __esm({
    "node_modules/date-fns/secondsToMinutes.js"() {
    }
  });

  // node_modules/date-fns/setMonth.js
  var init_setMonth = __esm({
    "node_modules/date-fns/setMonth.js"() {
    }
  });

  // node_modules/date-fns/set.js
  var init_set = __esm({
    "node_modules/date-fns/set.js"() {
    }
  });

  // node_modules/date-fns/setDate.js
  var init_setDate = __esm({
    "node_modules/date-fns/setDate.js"() {
    }
  });

  // node_modules/date-fns/setDayOfYear.js
  var init_setDayOfYear = __esm({
    "node_modules/date-fns/setDayOfYear.js"() {
    }
  });

  // node_modules/date-fns/setDefaultOptions.js
  var init_setDefaultOptions = __esm({
    "node_modules/date-fns/setDefaultOptions.js"() {
    }
  });

  // node_modules/date-fns/setHours.js
  var init_setHours = __esm({
    "node_modules/date-fns/setHours.js"() {
    }
  });

  // node_modules/date-fns/setMilliseconds.js
  var init_setMilliseconds = __esm({
    "node_modules/date-fns/setMilliseconds.js"() {
    }
  });

  // node_modules/date-fns/setMinutes.js
  var init_setMinutes = __esm({
    "node_modules/date-fns/setMinutes.js"() {
    }
  });

  // node_modules/date-fns/setQuarter.js
  var init_setQuarter = __esm({
    "node_modules/date-fns/setQuarter.js"() {
    }
  });

  // node_modules/date-fns/setSeconds.js
  var init_setSeconds = __esm({
    "node_modules/date-fns/setSeconds.js"() {
    }
  });

  // node_modules/date-fns/setWeekYear.js
  var init_setWeekYear = __esm({
    "node_modules/date-fns/setWeekYear.js"() {
    }
  });

  // node_modules/date-fns/setYear.js
  var init_setYear = __esm({
    "node_modules/date-fns/setYear.js"() {
    }
  });

  // node_modules/date-fns/startOfDecade.js
  var init_startOfDecade = __esm({
    "node_modules/date-fns/startOfDecade.js"() {
    }
  });

  // node_modules/date-fns/startOfToday.js
  var init_startOfToday = __esm({
    "node_modules/date-fns/startOfToday.js"() {
    }
  });

  // node_modules/date-fns/startOfTomorrow.js
  var init_startOfTomorrow = __esm({
    "node_modules/date-fns/startOfTomorrow.js"() {
    }
  });

  // node_modules/date-fns/startOfYesterday.js
  var init_startOfYesterday = __esm({
    "node_modules/date-fns/startOfYesterday.js"() {
    }
  });

  // node_modules/date-fns/subMonths.js
  var init_subMonths = __esm({
    "node_modules/date-fns/subMonths.js"() {
    }
  });

  // node_modules/date-fns/sub.js
  var init_sub = __esm({
    "node_modules/date-fns/sub.js"() {
    }
  });

  // node_modules/date-fns/subBusinessDays.js
  var init_subBusinessDays = __esm({
    "node_modules/date-fns/subBusinessDays.js"() {
    }
  });

  // node_modules/date-fns/subHours.js
  var init_subHours = __esm({
    "node_modules/date-fns/subHours.js"() {
    }
  });

  // node_modules/date-fns/subMilliseconds.js
  var init_subMilliseconds = __esm({
    "node_modules/date-fns/subMilliseconds.js"() {
    }
  });

  // node_modules/date-fns/subMinutes.js
  var init_subMinutes = __esm({
    "node_modules/date-fns/subMinutes.js"() {
    }
  });

  // node_modules/date-fns/subQuarters.js
  var init_subQuarters = __esm({
    "node_modules/date-fns/subQuarters.js"() {
    }
  });

  // node_modules/date-fns/subSeconds.js
  var init_subSeconds = __esm({
    "node_modules/date-fns/subSeconds.js"() {
    }
  });

  // node_modules/date-fns/subWeeks.js
  var init_subWeeks = __esm({
    "node_modules/date-fns/subWeeks.js"() {
    }
  });

  // node_modules/date-fns/subYears.js
  var init_subYears = __esm({
    "node_modules/date-fns/subYears.js"() {
    }
  });

  // node_modules/date-fns/weeksToDays.js
  var init_weeksToDays = __esm({
    "node_modules/date-fns/weeksToDays.js"() {
    }
  });

  // node_modules/date-fns/yearsToDays.js
  var init_yearsToDays = __esm({
    "node_modules/date-fns/yearsToDays.js"() {
    }
  });

  // node_modules/date-fns/yearsToMonths.js
  var init_yearsToMonths = __esm({
    "node_modules/date-fns/yearsToMonths.js"() {
    }
  });

  // node_modules/date-fns/yearsToQuarters.js
  var init_yearsToQuarters = __esm({
    "node_modules/date-fns/yearsToQuarters.js"() {
    }
  });

  // node_modules/date-fns/index.js
  var init_date_fns = __esm({
    "node_modules/date-fns/index.js"() {
      init_add();
      init_addBusinessDays();
      init_addDays();
      init_addHours();
      init_addISOWeekYears();
      init_addMilliseconds();
      init_addMinutes();
      init_addMonths();
      init_addQuarters();
      init_addSeconds();
      init_addWeeks();
      init_addYears();
      init_areIntervalsOverlapping();
      init_clamp();
      init_closestIndexTo();
      init_closestTo();
      init_compareAsc();
      init_compareDesc();
      init_constructFrom();
      init_constructNow();
      init_daysToWeeks();
      init_differenceInBusinessDays();
      init_differenceInCalendarDays();
      init_differenceInCalendarISOWeekYears();
      init_differenceInCalendarISOWeeks();
      init_differenceInCalendarMonths();
      init_differenceInCalendarQuarters();
      init_differenceInCalendarWeeks();
      init_differenceInCalendarYears();
      init_differenceInDays();
      init_differenceInHours();
      init_differenceInISOWeekYears();
      init_differenceInMilliseconds();
      init_differenceInMinutes();
      init_differenceInMonths();
      init_differenceInQuarters();
      init_differenceInSeconds();
      init_differenceInWeeks();
      init_differenceInYears();
      init_eachDayOfInterval();
      init_eachHourOfInterval();
      init_eachMinuteOfInterval();
      init_eachMonthOfInterval();
      init_eachQuarterOfInterval();
      init_eachWeekOfInterval();
      init_eachWeekendOfInterval();
      init_eachWeekendOfMonth();
      init_eachWeekendOfYear();
      init_eachYearOfInterval();
      init_endOfDay();
      init_endOfDecade();
      init_endOfHour();
      init_endOfISOWeek();
      init_endOfISOWeekYear();
      init_endOfMinute();
      init_endOfMonth();
      init_endOfQuarter();
      init_endOfSecond();
      init_endOfToday();
      init_endOfTomorrow();
      init_endOfWeek();
      init_endOfYear();
      init_endOfYesterday();
      init_format();
      init_formatDistance2();
      init_formatDistanceStrict();
      init_formatDistanceToNow();
      init_formatDistanceToNowStrict();
      init_formatDuration();
      init_formatISO();
      init_formatISO9075();
      init_formatISODuration();
      init_formatRFC3339();
      init_formatRFC7231();
      init_formatRelative2();
      init_fromUnixTime();
      init_getDate();
      init_getDay();
      init_getDayOfYear();
      init_getDaysInMonth();
      init_getDaysInYear();
      init_getDecade();
      init_getDefaultOptions();
      init_getHours();
      init_getISODay();
      init_getISOWeek();
      init_getISOWeekYear();
      init_getISOWeeksInYear();
      init_getMilliseconds();
      init_getMinutes();
      init_getMonth();
      init_getOverlappingDaysInIntervals();
      init_getQuarter();
      init_getSeconds();
      init_getTime();
      init_getUnixTime();
      init_getWeek();
      init_getWeekOfMonth();
      init_getWeekYear();
      init_getWeeksInMonth();
      init_getYear();
      init_hoursToMilliseconds();
      init_hoursToMinutes();
      init_hoursToSeconds();
      init_interval();
      init_intervalToDuration();
      init_intlFormat();
      init_intlFormatDistance();
      init_isAfter();
      init_isBefore();
      init_isDate();
      init_isEqual();
      init_isExists();
      init_isFirstDayOfMonth();
      init_isFriday();
      init_isFuture();
      init_isLastDayOfMonth();
      init_isLeapYear();
      init_isMatch();
      init_isMonday();
      init_isPast();
      init_isSameDay();
      init_isSameHour();
      init_isSameISOWeek();
      init_isSameISOWeekYear();
      init_isSameMinute();
      init_isSameMonth();
      init_isSameQuarter();
      init_isSameSecond();
      init_isSameWeek();
      init_isSameYear();
      init_isSaturday();
      init_isSunday();
      init_isThisHour();
      init_isThisISOWeek();
      init_isThisMinute();
      init_isThisMonth();
      init_isThisQuarter();
      init_isThisSecond();
      init_isThisWeek();
      init_isThisYear();
      init_isThursday();
      init_isToday();
      init_isTomorrow();
      init_isTuesday();
      init_isValid();
      init_isWednesday();
      init_isWeekend();
      init_isWithinInterval();
      init_isYesterday();
      init_lastDayOfDecade();
      init_lastDayOfISOWeek();
      init_lastDayOfISOWeekYear();
      init_lastDayOfMonth();
      init_lastDayOfQuarter();
      init_lastDayOfWeek();
      init_lastDayOfYear();
      init_lightFormat();
      init_max();
      init_milliseconds();
      init_millisecondsToHours();
      init_millisecondsToMinutes();
      init_millisecondsToSeconds();
      init_min();
      init_minutesToHours();
      init_minutesToMilliseconds();
      init_minutesToSeconds();
      init_monthsToQuarters();
      init_monthsToYears();
      init_nextDay();
      init_nextFriday();
      init_nextMonday();
      init_nextSaturday();
      init_nextSunday();
      init_nextThursday();
      init_nextTuesday();
      init_nextWednesday();
      init_parse();
      init_parseISO();
      init_parseJSON();
      init_previousDay();
      init_previousFriday();
      init_previousMonday();
      init_previousSaturday();
      init_previousSunday();
      init_previousThursday();
      init_previousTuesday();
      init_previousWednesday();
      init_quartersToMonths();
      init_quartersToYears();
      init_roundToNearestHours();
      init_roundToNearestMinutes();
      init_secondsToHours();
      init_secondsToMilliseconds();
      init_secondsToMinutes();
      init_set();
      init_setDate();
      init_setDay();
      init_setDayOfYear();
      init_setDefaultOptions();
      init_setHours();
      init_setISODay();
      init_setISOWeek();
      init_setISOWeekYear();
      init_setMilliseconds();
      init_setMinutes();
      init_setMonth();
      init_setQuarter();
      init_setSeconds();
      init_setWeek();
      init_setWeekYear();
      init_setYear();
      init_startOfDay();
      init_startOfDecade();
      init_startOfHour();
      init_startOfISOWeek();
      init_startOfISOWeekYear();
      init_startOfMinute();
      init_startOfMonth();
      init_startOfQuarter();
      init_startOfSecond();
      init_startOfToday();
      init_startOfTomorrow();
      init_startOfWeek();
      init_startOfWeekYear();
      init_startOfYear();
      init_startOfYesterday();
      init_sub();
      init_subBusinessDays();
      init_subDays();
      init_subHours();
      init_subISOWeekYears();
      init_subMilliseconds();
      init_subMinutes();
      init_subMonths();
      init_subQuarters();
      init_subSeconds();
      init_subWeeks();
      init_subYears();
      init_toDate();
      init_transpose();
      init_weeksToDays();
      init_yearsToDays();
      init_yearsToMonths();
      init_yearsToQuarters();
    }
  });

  // node_modules/date-fns-tz/dist/esm/_lib/tzIntlTimeZoneName/index.js
  function tzIntlTimeZoneName(length, date, options) {
    const defaultOptions2 = getDefaultOptions2();
    const dtf = getDTF(length, options.timeZone, options.locale ?? defaultOptions2.locale);
    return "formatToParts" in dtf ? partsTimeZone(dtf, date) : hackyTimeZone(dtf, date);
  }
  function partsTimeZone(dtf, date) {
    const formatted = dtf.formatToParts(date);
    for (let i = formatted.length - 1; i >= 0; --i) {
      if (formatted[i].type === "timeZoneName") {
        return formatted[i].value;
      }
    }
    return void 0;
  }
  function hackyTimeZone(dtf, date) {
    const formatted = dtf.format(date).replace(/\u200E/g, "");
    const tzNameMatch = / [\w-+ ]+$/.exec(formatted);
    return tzNameMatch ? tzNameMatch[0].substr(1) : "";
  }
  function getDTF(length, timeZone, locale) {
    return new Intl.DateTimeFormat(locale ? [locale.code, "en-US"] : void 0, {
      timeZone,
      timeZoneName: length
    });
  }
  var init_tzIntlTimeZoneName = __esm({
    "node_modules/date-fns-tz/dist/esm/_lib/tzIntlTimeZoneName/index.js"() {
      init_date_fns();
    }
  });

  // node_modules/date-fns-tz/dist/esm/_lib/tzTokenizeDate/index.js
  function tzTokenizeDate(date, timeZone) {
    const dtf = getDateTimeFormat(timeZone);
    return "formatToParts" in dtf ? partsOffset(dtf, date) : hackyOffset(dtf, date);
  }
  function partsOffset(dtf, date) {
    try {
      const formatted = dtf.formatToParts(date);
      const filled = [];
      for (let i = 0; i < formatted.length; i++) {
        const pos = typeToPos[formatted[i].type];
        if (pos !== void 0) {
          filled[pos] = parseInt(formatted[i].value, 10);
        }
      }
      return filled;
    } catch (error) {
      if (error instanceof RangeError) {
        return [NaN];
      }
      throw error;
    }
  }
  function hackyOffset(dtf, date) {
    const formatted = dtf.format(date);
    const parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted);
    return [
      parseInt(parsed[3], 10),
      parseInt(parsed[1], 10),
      parseInt(parsed[2], 10),
      parseInt(parsed[4], 10),
      parseInt(parsed[5], 10),
      parseInt(parsed[6], 10)
    ];
  }
  function getDateTimeFormat(timeZone) {
    if (!dtfCache[timeZone]) {
      dtfCache[timeZone] = hourCycleSupported ? new Intl.DateTimeFormat("en-US", {
        hourCycle: "h23",
        timeZone,
        year: "numeric",
        month: "numeric",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }) : new Intl.DateTimeFormat("en-US", {
        hour12: false,
        timeZone,
        year: "numeric",
        month: "numeric",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    }
    return dtfCache[timeZone];
  }
  var typeToPos, dtfCache, testDateFormatted, hourCycleSupported;
  var init_tzTokenizeDate = __esm({
    "node_modules/date-fns-tz/dist/esm/_lib/tzTokenizeDate/index.js"() {
      typeToPos = {
        year: 0,
        month: 1,
        day: 2,
        hour: 3,
        minute: 4,
        second: 5
      };
      dtfCache = {};
      testDateFormatted = new Intl.DateTimeFormat("en-US", {
        hourCycle: "h23",
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z"));
      hourCycleSupported = testDateFormatted === "06/25/2014, 00:00:00" || testDateFormatted === "\u200E06\u200E/\u200E25\u200E/\u200E2014\u200E \u200E00\u200E:\u200E00\u200E:\u200E00";
    }
  });

  // node_modules/date-fns-tz/dist/esm/_lib/newDateUTC/index.js
  function newDateUTC(fullYear, month, day, hour, minute, second, millisecond) {
    const utcDate = /* @__PURE__ */ new Date(0);
    utcDate.setUTCFullYear(fullYear, month, day);
    utcDate.setUTCHours(hour, minute, second, millisecond);
    return utcDate;
  }
  var init_newDateUTC = __esm({
    "node_modules/date-fns-tz/dist/esm/_lib/newDateUTC/index.js"() {
    }
  });

  // node_modules/date-fns-tz/dist/esm/_lib/tzParseTimezone/index.js
  function tzParseTimezone(timezoneString, date, isUtcDate) {
    if (!timezoneString) {
      return 0;
    }
    let token = patterns.timezoneZ.exec(timezoneString);
    if (token) {
      return 0;
    }
    let hours;
    let absoluteOffset;
    token = patterns.timezoneHH.exec(timezoneString);
    if (token) {
      hours = parseInt(token[1], 10);
      if (!validateTimezone(hours)) {
        return NaN;
      }
      return -(hours * MILLISECONDS_IN_HOUR);
    }
    token = patterns.timezoneHHMM.exec(timezoneString);
    if (token) {
      hours = parseInt(token[2], 10);
      const minutes = parseInt(token[3], 10);
      if (!validateTimezone(hours, minutes)) {
        return NaN;
      }
      absoluteOffset = Math.abs(hours) * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
      return token[1] === "+" ? -absoluteOffset : absoluteOffset;
    }
    if (isValidTimezoneIANAString(timezoneString)) {
      date = new Date(date || Date.now());
      const utcDate = isUtcDate ? date : toUtcDate(date);
      const offset = calcOffset(utcDate, timezoneString);
      const fixedOffset = isUtcDate ? offset : fixOffset(date, offset, timezoneString);
      return -fixedOffset;
    }
    return NaN;
  }
  function toUtcDate(date) {
    return newDateUTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
  }
  function calcOffset(date, timezoneString) {
    const tokens = tzTokenizeDate(date, timezoneString);
    const asUTC = newDateUTC(tokens[0], tokens[1] - 1, tokens[2], tokens[3] % 24, tokens[4], tokens[5], 0).getTime();
    let asTS = date.getTime();
    const over = asTS % 1e3;
    asTS -= over >= 0 ? over : 1e3 + over;
    return asUTC - asTS;
  }
  function fixOffset(date, offset, timezoneString) {
    const localTS = date.getTime();
    let utcGuess = localTS - offset;
    const o2 = calcOffset(new Date(utcGuess), timezoneString);
    if (offset === o2) {
      return offset;
    }
    utcGuess -= o2 - offset;
    const o3 = calcOffset(new Date(utcGuess), timezoneString);
    if (o2 === o3) {
      return o2;
    }
    return Math.max(o2, o3);
  }
  function validateTimezone(hours, minutes) {
    return -23 <= hours && hours <= 23 && (minutes == null || 0 <= minutes && minutes <= 59);
  }
  function isValidTimezoneIANAString(timeZoneString) {
    if (validIANATimezoneCache[timeZoneString])
      return true;
    try {
      new Intl.DateTimeFormat(void 0, { timeZone: timeZoneString });
      validIANATimezoneCache[timeZoneString] = true;
      return true;
    } catch (error) {
      return false;
    }
  }
  var MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE, patterns, validIANATimezoneCache;
  var init_tzParseTimezone = __esm({
    "node_modules/date-fns-tz/dist/esm/_lib/tzParseTimezone/index.js"() {
      init_tzTokenizeDate();
      init_newDateUTC();
      MILLISECONDS_IN_HOUR = 36e5;
      MILLISECONDS_IN_MINUTE = 6e4;
      patterns = {
        timezone: /([Z+-].*)$/,
        timezoneZ: /^(Z)$/,
        timezoneHH: /^([+-]\d{2})$/,
        timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
      };
      validIANATimezoneCache = {};
    }
  });

  // node_modules/date-fns-tz/dist/esm/format/formatters/index.js
  function getTimeZoneOffset(timeZone, originalDate) {
    const timeZoneOffset = timeZone ? tzParseTimezone(timeZone, originalDate, true) / MILLISECONDS_IN_MINUTE2 : originalDate?.getTimezoneOffset() ?? 0;
    if (Number.isNaN(timeZoneOffset)) {
      throw new RangeError("Invalid time zone specified: " + timeZone);
    }
    return timeZoneOffset;
  }
  function addLeadingZeros2(number, targetLength) {
    const sign = number < 0 ? "-" : "";
    let output = Math.abs(number).toString();
    while (output.length < targetLength) {
      output = "0" + output;
    }
    return sign + output;
  }
  function formatTimezone2(offset, delimiter = "") {
    const sign = offset > 0 ? "-" : "+";
    const absOffset = Math.abs(offset);
    const hours = addLeadingZeros2(Math.floor(absOffset / 60), 2);
    const minutes = addLeadingZeros2(Math.floor(absOffset % 60), 2);
    return sign + hours + delimiter + minutes;
  }
  function formatTimezoneWithOptionalMinutes2(offset, delimiter) {
    if (offset % 60 === 0) {
      const sign = offset > 0 ? "-" : "+";
      return sign + addLeadingZeros2(Math.abs(offset) / 60, 2);
    }
    return formatTimezone2(offset, delimiter);
  }
  function formatTimezoneShort2(offset, delimiter = "") {
    const sign = offset > 0 ? "-" : "+";
    const absOffset = Math.abs(offset);
    const hours = Math.floor(absOffset / 60);
    const minutes = absOffset % 60;
    if (minutes === 0) {
      return sign + String(hours);
    }
    return sign + String(hours) + delimiter + addLeadingZeros2(minutes, 2);
  }
  var MILLISECONDS_IN_MINUTE2, formatters2;
  var init_formatters2 = __esm({
    "node_modules/date-fns-tz/dist/esm/format/formatters/index.js"() {
      init_tzIntlTimeZoneName();
      init_tzParseTimezone();
      MILLISECONDS_IN_MINUTE2 = 60 * 1e3;
      formatters2 = {
        // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
        X: function(date, token, options) {
          const timezoneOffset = getTimeZoneOffset(options.timeZone, date);
          if (timezoneOffset === 0) {
            return "Z";
          }
          switch (token) {
            // Hours and optional minutes
            case "X":
              return formatTimezoneWithOptionalMinutes2(timezoneOffset);
            // Hours, minutes and optional seconds without `:` delimeter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `XX`
            case "XXXX":
            case "XX":
              return formatTimezone2(timezoneOffset);
            // Hours, minutes and optional seconds with `:` delimeter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `XXX`
            case "XXXXX":
            case "XXX":
            // Hours and minutes with `:` delimeter
            default:
              return formatTimezone2(timezoneOffset, ":");
          }
        },
        // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
        x: function(date, token, options) {
          const timezoneOffset = getTimeZoneOffset(options.timeZone, date);
          switch (token) {
            // Hours and optional minutes
            case "x":
              return formatTimezoneWithOptionalMinutes2(timezoneOffset);
            // Hours, minutes and optional seconds without `:` delimeter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `xx`
            case "xxxx":
            case "xx":
              return formatTimezone2(timezoneOffset);
            // Hours, minutes and optional seconds with `:` delimeter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `xxx`
            case "xxxxx":
            case "xxx":
            // Hours and minutes with `:` delimeter
            default:
              return formatTimezone2(timezoneOffset, ":");
          }
        },
        // Timezone (GMT)
        O: function(date, token, options) {
          const timezoneOffset = getTimeZoneOffset(options.timeZone, date);
          switch (token) {
            // Short
            case "O":
            case "OO":
            case "OOO":
              return "GMT" + formatTimezoneShort2(timezoneOffset, ":");
            // Long
            case "OOOO":
            default:
              return "GMT" + formatTimezone2(timezoneOffset, ":");
          }
        },
        // Timezone (specific non-location)
        z: function(date, token, options) {
          switch (token) {
            // Short
            case "z":
            case "zz":
            case "zzz":
              return tzIntlTimeZoneName("short", date, options);
            // Long
            case "zzzz":
            default:
              return tzIntlTimeZoneName("long", date, options);
          }
        }
      };
    }
  });

  // node_modules/date-fns-tz/dist/esm/_lib/getTimezoneOffsetInMilliseconds/index.js
  function getTimezoneOffsetInMilliseconds2(date) {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    utcDate.setUTCFullYear(date.getFullYear());
    return +date - +utcDate;
  }
  var init_getTimezoneOffsetInMilliseconds2 = __esm({
    "node_modules/date-fns-tz/dist/esm/_lib/getTimezoneOffsetInMilliseconds/index.js"() {
    }
  });

  // node_modules/date-fns-tz/dist/esm/_lib/tzPattern/index.js
  var tzPattern;
  var init_tzPattern = __esm({
    "node_modules/date-fns-tz/dist/esm/_lib/tzPattern/index.js"() {
      tzPattern = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
    }
  });

  // node_modules/date-fns-tz/dist/esm/toDate/index.js
  function toDate2(argument, options = {}) {
    if (arguments.length < 1) {
      throw new TypeError("1 argument required, but only " + arguments.length + " present");
    }
    if (argument === null) {
      return /* @__PURE__ */ new Date(NaN);
    }
    const additionalDigits = options.additionalDigits == null ? DEFAULT_ADDITIONAL_DIGITS : Number(options.additionalDigits);
    if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
      throw new RangeError("additionalDigits must be 0, 1 or 2");
    }
    if (argument instanceof Date || typeof argument === "object" && Object.prototype.toString.call(argument) === "[object Date]") {
      return new Date(argument.getTime());
    } else if (typeof argument === "number" || Object.prototype.toString.call(argument) === "[object Number]") {
      return new Date(argument);
    } else if (!(Object.prototype.toString.call(argument) === "[object String]")) {
      return /* @__PURE__ */ new Date(NaN);
    }
    const dateStrings = splitDateString(argument);
    const { year, restDateString } = parseYear(dateStrings.date, additionalDigits);
    const date = parseDate(restDateString, year);
    if (date === null || isNaN(date.getTime())) {
      return /* @__PURE__ */ new Date(NaN);
    }
    if (date) {
      const timestamp = date.getTime();
      let time = 0;
      let offset;
      if (dateStrings.time) {
        time = parseTime(dateStrings.time);
        if (time === null || isNaN(time)) {
          return /* @__PURE__ */ new Date(NaN);
        }
      }
      if (dateStrings.timeZone || options.timeZone) {
        offset = tzParseTimezone(dateStrings.timeZone || options.timeZone, new Date(timestamp + time));
        if (isNaN(offset)) {
          return /* @__PURE__ */ new Date(NaN);
        }
      } else {
        offset = getTimezoneOffsetInMilliseconds2(new Date(timestamp + time));
        offset = getTimezoneOffsetInMilliseconds2(new Date(timestamp + time + offset));
      }
      return new Date(timestamp + time + offset);
    } else {
      return /* @__PURE__ */ new Date(NaN);
    }
  }
  function splitDateString(dateString) {
    const dateStrings = {};
    let parts = patterns2.dateTimePattern.exec(dateString);
    let timeString;
    if (!parts) {
      parts = patterns2.datePattern.exec(dateString);
      if (parts) {
        dateStrings.date = parts[1];
        timeString = parts[2];
      } else {
        dateStrings.date = null;
        timeString = dateString;
      }
    } else {
      dateStrings.date = parts[1];
      timeString = parts[3];
    }
    if (timeString) {
      const token = patterns2.timeZone.exec(timeString);
      if (token) {
        dateStrings.time = timeString.replace(token[1], "");
        dateStrings.timeZone = token[1].trim();
      } else {
        dateStrings.time = timeString;
      }
    }
    return dateStrings;
  }
  function parseYear(dateString, additionalDigits) {
    if (dateString) {
      const patternYYY = patterns2.YYY[additionalDigits];
      const patternYYYYY = patterns2.YYYYY[additionalDigits];
      let token = patterns2.YYYY.exec(dateString) || patternYYYYY.exec(dateString);
      if (token) {
        const yearString = token[1];
        return {
          year: parseInt(yearString, 10),
          restDateString: dateString.slice(yearString.length)
        };
      }
      token = patterns2.YY.exec(dateString) || patternYYY.exec(dateString);
      if (token) {
        const centuryString = token[1];
        return {
          year: parseInt(centuryString, 10) * 100,
          restDateString: dateString.slice(centuryString.length)
        };
      }
    }
    return {
      year: null
    };
  }
  function parseDate(dateString, year) {
    if (year === null) {
      return null;
    }
    let date;
    let month;
    let week;
    if (!dateString || !dateString.length) {
      date = /* @__PURE__ */ new Date(0);
      date.setUTCFullYear(year);
      return date;
    }
    let token = patterns2.MM.exec(dateString);
    if (token) {
      date = /* @__PURE__ */ new Date(0);
      month = parseInt(token[1], 10) - 1;
      if (!validateDate(year, month)) {
        return /* @__PURE__ */ new Date(NaN);
      }
      date.setUTCFullYear(year, month);
      return date;
    }
    token = patterns2.DDD.exec(dateString);
    if (token) {
      date = /* @__PURE__ */ new Date(0);
      const dayOfYear = parseInt(token[1], 10);
      if (!validateDayOfYearDate(year, dayOfYear)) {
        return /* @__PURE__ */ new Date(NaN);
      }
      date.setUTCFullYear(year, 0, dayOfYear);
      return date;
    }
    token = patterns2.MMDD.exec(dateString);
    if (token) {
      date = /* @__PURE__ */ new Date(0);
      month = parseInt(token[1], 10) - 1;
      const day = parseInt(token[2], 10);
      if (!validateDate(year, month, day)) {
        return /* @__PURE__ */ new Date(NaN);
      }
      date.setUTCFullYear(year, month, day);
      return date;
    }
    token = patterns2.Www.exec(dateString);
    if (token) {
      week = parseInt(token[1], 10) - 1;
      if (!validateWeekDate(week)) {
        return /* @__PURE__ */ new Date(NaN);
      }
      return dayOfISOWeekYear(year, week);
    }
    token = patterns2.WwwD.exec(dateString);
    if (token) {
      week = parseInt(token[1], 10) - 1;
      const dayOfWeek = parseInt(token[2], 10) - 1;
      if (!validateWeekDate(week, dayOfWeek)) {
        return /* @__PURE__ */ new Date(NaN);
      }
      return dayOfISOWeekYear(year, week, dayOfWeek);
    }
    return null;
  }
  function parseTime(timeString) {
    let hours;
    let minutes;
    let token = patterns2.HH.exec(timeString);
    if (token) {
      hours = parseFloat(token[1].replace(",", "."));
      if (!validateTime(hours)) {
        return NaN;
      }
      return hours % 24 * MILLISECONDS_IN_HOUR2;
    }
    token = patterns2.HHMM.exec(timeString);
    if (token) {
      hours = parseInt(token[1], 10);
      minutes = parseFloat(token[2].replace(",", "."));
      if (!validateTime(hours, minutes)) {
        return NaN;
      }
      return hours % 24 * MILLISECONDS_IN_HOUR2 + minutes * MILLISECONDS_IN_MINUTE3;
    }
    token = patterns2.HHMMSS.exec(timeString);
    if (token) {
      hours = parseInt(token[1], 10);
      minutes = parseInt(token[2], 10);
      const seconds = parseFloat(token[3].replace(",", "."));
      if (!validateTime(hours, minutes, seconds)) {
        return NaN;
      }
      return hours % 24 * MILLISECONDS_IN_HOUR2 + minutes * MILLISECONDS_IN_MINUTE3 + seconds * 1e3;
    }
    return null;
  }
  function dayOfISOWeekYear(isoWeekYear, week, day) {
    week = week || 0;
    day = day || 0;
    const date = /* @__PURE__ */ new Date(0);
    date.setUTCFullYear(isoWeekYear, 0, 4);
    const fourthOfJanuaryDay = date.getUTCDay() || 7;
    const diff = week * 7 + day + 1 - fourthOfJanuaryDay;
    date.setUTCDate(date.getUTCDate() + diff);
    return date;
  }
  function isLeapYearIndex(year) {
    return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
  }
  function validateDate(year, month, date) {
    if (month < 0 || month > 11) {
      return false;
    }
    if (date != null) {
      if (date < 1) {
        return false;
      }
      const isLeapYear = isLeapYearIndex(year);
      if (isLeapYear && date > DAYS_IN_MONTH_LEAP_YEAR[month]) {
        return false;
      }
      if (!isLeapYear && date > DAYS_IN_MONTH[month]) {
        return false;
      }
    }
    return true;
  }
  function validateDayOfYearDate(year, dayOfYear) {
    if (dayOfYear < 1) {
      return false;
    }
    const isLeapYear = isLeapYearIndex(year);
    if (isLeapYear && dayOfYear > 366) {
      return false;
    }
    if (!isLeapYear && dayOfYear > 365) {
      return false;
    }
    return true;
  }
  function validateWeekDate(week, day) {
    if (week < 0 || week > 52) {
      return false;
    }
    if (day != null && (day < 0 || day > 6)) {
      return false;
    }
    return true;
  }
  function validateTime(hours, minutes, seconds) {
    if (hours < 0 || hours >= 25) {
      return false;
    }
    if (minutes != null && (minutes < 0 || minutes >= 60)) {
      return false;
    }
    if (seconds != null && (seconds < 0 || seconds >= 60)) {
      return false;
    }
    return true;
  }
  var MILLISECONDS_IN_HOUR2, MILLISECONDS_IN_MINUTE3, DEFAULT_ADDITIONAL_DIGITS, patterns2, DAYS_IN_MONTH, DAYS_IN_MONTH_LEAP_YEAR;
  var init_toDate2 = __esm({
    "node_modules/date-fns-tz/dist/esm/toDate/index.js"() {
      init_getTimezoneOffsetInMilliseconds2();
      init_tzParseTimezone();
      init_tzPattern();
      MILLISECONDS_IN_HOUR2 = 36e5;
      MILLISECONDS_IN_MINUTE3 = 6e4;
      DEFAULT_ADDITIONAL_DIGITS = 2;
      patterns2 = {
        dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
        datePattern: /^([0-9W+-]+)(.*)/,
        plainTime: /:/,
        // year tokens
        YY: /^(\d{2})$/,
        YYY: [
          /^([+-]\d{2})$/,
          // 0 additional digits
          /^([+-]\d{3})$/,
          // 1 additional digit
          /^([+-]\d{4})$/
          // 2 additional digits
        ],
        YYYY: /^(\d{4})/,
        YYYYY: [
          /^([+-]\d{4})/,
          // 0 additional digits
          /^([+-]\d{5})/,
          // 1 additional digit
          /^([+-]\d{6})/
          // 2 additional digits
        ],
        // date tokens
        MM: /^-(\d{2})$/,
        DDD: /^-?(\d{3})$/,
        MMDD: /^-?(\d{2})-?(\d{2})$/,
        Www: /^-?W(\d{2})$/,
        WwwD: /^-?W(\d{2})-?(\d{1})$/,
        HH: /^(\d{2}([.,]\d*)?)$/,
        HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
        HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
        // time zone tokens (to identify the presence of a tz)
        timeZone: tzPattern
      };
      DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
  });

  // node_modules/date-fns-tz/dist/esm/format/index.js
  function format2(date, formatStr, options = {}) {
    formatStr = String(formatStr);
    const matches = formatStr.match(tzFormattingTokensRegExp);
    if (matches) {
      const d = toDate2(options.originalDate || date, options);
      formatStr = matches.reduce(function(result, token) {
        if (token[0] === "'") {
          return result;
        }
        const pos = result.indexOf(token);
        const precededByQuotedSection = result[pos - 1] === "'";
        const replaced = result.replace(token, "'" + formatters2[token[0]](d, token, options) + "'");
        return precededByQuotedSection ? replaced.substring(0, pos - 1) + replaced.substring(pos + 1) : replaced;
      }, formatStr);
    }
    return format(date, formatStr, options);
  }
  var tzFormattingTokensRegExp;
  var init_format2 = __esm({
    "node_modules/date-fns-tz/dist/esm/format/index.js"() {
      init_format();
      init_formatters2();
      init_toDate2();
      tzFormattingTokensRegExp = /([xXOz]+)|''|'(''|[^'])+('|$)/g;
    }
  });

  // node_modules/date-fns-tz/dist/esm/toZonedTime/index.js
  function toZonedTime(date, timeZone, options) {
    date = toDate2(date, options);
    const offsetMilliseconds = tzParseTimezone(timeZone, date, true);
    const d = new Date(date.getTime() - offsetMilliseconds);
    const resultDate = /* @__PURE__ */ new Date(0);
    resultDate.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    resultDate.setHours(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
    return resultDate;
  }
  var init_toZonedTime = __esm({
    "node_modules/date-fns-tz/dist/esm/toZonedTime/index.js"() {
      init_tzParseTimezone();
      init_toDate2();
    }
  });

  // node_modules/date-fns-tz/dist/esm/formatInTimeZone/index.js
  var init_formatInTimeZone = __esm({
    "node_modules/date-fns-tz/dist/esm/formatInTimeZone/index.js"() {
      init_format2();
      init_toZonedTime();
    }
  });

  // node_modules/date-fns-tz/dist/esm/fromZonedTime/index.js
  var init_fromZonedTime = __esm({
    "node_modules/date-fns-tz/dist/esm/fromZonedTime/index.js"() {
      init_toDate2();
      init_tzPattern();
      init_tzParseTimezone();
      init_newDateUTC();
    }
  });

  // node_modules/date-fns-tz/dist/esm/getTimezoneOffset/index.js
  var init_getTimezoneOffset = __esm({
    "node_modules/date-fns-tz/dist/esm/getTimezoneOffset/index.js"() {
      init_tzParseTimezone();
    }
  });

  // node_modules/date-fns-tz/dist/esm/index.js
  var init_esm = __esm({
    "node_modules/date-fns-tz/dist/esm/index.js"() {
      init_format2();
      init_formatInTimeZone();
      init_fromZonedTime();
      init_toZonedTime();
      init_getTimezoneOffset();
      init_toDate2();
    }
  });

  // config.json
  var config_default;
  var init_config = __esm({
    "config.json"() {
      config_default = {
        webhookUrl: "YOUR_WEBHOOK_URL_HERE",
        businessDate: {
          hour: 5,
          timeZone: "Europe/Moscow"
        },
        expenseCategories: [
          "\u041F\u0440\u043E\u0434\u0443\u043A\u0442\u044B",
          "\u0425\u043E\u0437\u0442\u043E\u0432\u0430\u0440\u044B",
          "\u0420\u0435\u043C\u043E\u043D\u0442",
          "\u0414\u0440\u0443\u0433\u043E\u0435"
        ],
        messages: {
          surplus: "\u0412 \u043A\u0430\u0441\u0441\u0435 \u0438\u0437\u043B\u0438\u0448\u0435\u043A. \u041F\u0435\u0440\u0435\u0441\u0447\u0438\u0442\u0430\u0439\u0442\u0435 \u043D\u0430\u043B\u0438\u0447\u043D\u043E\u0441\u0442\u044C \u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0432\u0441\u0435 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438.",
          shortage: "\u0412 \u043A\u0430\u0441\u0441\u0435 \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0447\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 Z-\u043E\u0442\u0447\u0435\u0442, \u0432\u0441\u0435 \u0447\u0435\u043A\u0438 \u0438 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438."
        }
      };
    }
  });

  // app.js
  var require_app = __commonJS({
    "app.js"() {
      init_date_fns();
      init_esm();
      init_config();
      var appState = {
        config: null,
        businessDate: null
      };
      var debounceTimer = null;
      var savableInputIds = [
        "opening-cash",
        "presto-revenue",
        "presto-cash",
        "presto-card",
        "actual-cash"
      ];
      var mathInputIds = [
        "opening-cash",
        "presto-revenue",
        "presto-cash",
        "presto-card",
        "actual-cash"
      ];
      document.addEventListener("DOMContentLoaded", () => {
        console.log("Shift report application initialized.");
        loadConfig().then(() => {
          setupEventListeners();
        });
      });
      async function loadConfig() {
        try {
          appState.config = config_default;
          console.log("Configuration loaded:", appState.config);
          initializeBusinessDate();
          loadState();
        } catch (error) {
          console.error("Could not load configuration:", error);
          alert("\u041E\u0448\u0438\u0431\u043A\u0430: \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u0430\u0439\u043B \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438. \u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C.");
        }
      }
      function initializeBusinessDate() {
        const { timeZone, hour: cutoffHour } = appState.config.businessDate;
        const nowInZone = toZonedTime(/* @__PURE__ */ new Date(), timeZone);
        let businessDate = nowInZone;
        if (nowInZone.getHours() < cutoffHour) {
          businessDate = subDays(nowInZone, 1);
        }
        appState.businessDate = format2(businessDate, "yyyy-MM-dd", { timeZone });
        console.log(`Business date determined: ${appState.businessDate}`);
        const businessDateEl = document.getElementById("summary-business-date");
        if (businessDateEl) {
          businessDateEl.textContent = format2(businessDate, "dd.MM.yyyy", { timeZone });
        }
      }
      function getStorageKey() {
        return `shiftReport-${appState.businessDate}`;
      }
      function saveState() {
        if (!appState.businessDate) return;
        const state = {
          expenses: []
        };
        savableInputIds.forEach((id) => {
          const input = document.getElementById(id);
          if (input) {
            if (mathInputIds.includes(id)) {
              state[id] = {
                value: input.value,
                formula: input.dataset.formula || ""
              };
            } else {
              state[id] = input.value;
            }
          }
        });
        document.querySelectorAll(".expense-row").forEach((row) => {
          const amountInput = row.querySelector(".expense-amount");
          const expense = {
            amount: {
              value: amountInput.value,
              formula: amountInput.dataset.formula || ""
            },
            category: row.querySelector(".expense-category").value,
            comment: row.querySelector(".expense-comment").value
          };
          state.expenses.push(expense);
        });
        localStorage.setItem(getStorageKey(), JSON.stringify(state));
        console.log("State saved for", appState.businessDate);
        updateSummary();
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(sendDataToWebhook, 6e4);
      }
      function loadState() {
        if (!appState.businessDate) return;
        const savedState = localStorage.getItem(getStorageKey());
        if (savedState) {
          const state = JSON.parse(savedState);
          console.log("Loading saved state:", state);
          savableInputIds.forEach((id) => {
            const input = document.getElementById(id);
            if (input && state[id]) {
              if (mathInputIds.includes(id) && typeof state[id] === "object") {
                input.value = state[id].value;
                input.dataset.formula = state[id].formula;
              } else {
                input.value = state[id];
              }
            }
          });
          if (state.expenses && state.expenses.length > 0) {
            document.getElementById("expenses-list").innerHTML = "";
            state.expenses.forEach((expense) => addExpenseRow(expense));
          }
          updateSummary();
        } else {
          console.log("No saved state found for", appState.businessDate);
        }
      }
      function setupEventListeners() {
        savableInputIds.forEach((id) => {
          const input = document.getElementById(id);
          if (input) {
            input.addEventListener("input", saveState);
            if (mathInputIds.includes(id)) {
              input.addEventListener("focus", handleMathFocus);
              input.addEventListener("blur", handleMathBlur);
            }
          }
        });
        const addExpenseBtn = document.getElementById("add-expense");
        if (addExpenseBtn) {
          addExpenseBtn.addEventListener("click", () => addExpenseRow());
        }
        console.log("Event listeners set up.");
      }
      function addExpenseRow(expense) {
        const expensesList = document.getElementById("expenses-list");
        const row = document.createElement("div");
        row.className = "form-group expense-row";
        const amount = expense ? expense.amount : { value: "", formula: "" };
        const category = expense ? expense.category : "";
        const comment = expense ? expense.comment : "";
        const categoryOptions = appState.config.expenseCategories.map((cat) => `<option value="${cat}" ${cat === category ? "selected" : ""}>${cat}</option>`).join("");
        row.innerHTML = `
        <input type="text" class="expense-amount" placeholder="\u0421\u0443\u043C\u043C\u0430" value="${amount.value || ""}" data-formula="${amount.formula || ""}">
        <select class="expense-category">${categoryOptions}</select>
        <input type="text" class="expense-comment" placeholder="\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439" value="${comment || ""}">
        <button class="delete-expense">\u{1F5D1}\uFE0F</button>
    `;
        row.querySelectorAll("input, select").forEach((input) => {
          input.addEventListener("input", saveState);
        });
        const amountInput = row.querySelector(".expense-amount");
        amountInput.addEventListener("focus", handleMathFocus);
        amountInput.addEventListener("blur", handleMathBlur);
        row.querySelector(".delete-expense").addEventListener("click", () => {
          row.remove();
          saveState();
        });
        expensesList.appendChild(row);
      }
      function evaluateExpression(expr) {
        if (!/^[0-9+\-.\s]*$/.test(expr)) {
          return null;
        }
        try {
          return new Function(`return ${expr}`)();
        } catch (error) {
          console.error("Invalid math expression:", expr, error);
          return null;
        }
      }
      function handleMathFocus(event) {
        const input = event.target;
        if (input.dataset.formula) {
          input.value = input.dataset.formula;
        }
      }
      function handleMathBlur(event) {
        const input = event.target;
        const expression = input.value;
        if (!isNaN(expression) && expression.trim() !== "") {
          input.dataset.formula = "";
          saveState();
          return;
        }
        const result = evaluateExpression(expression);
        if (result !== null) {
          input.dataset.formula = expression;
          input.value = result;
          saveState();
        }
      }
      function getNumericValue(elementId) {
        const element = document.getElementById(elementId);
        return parseFloat(element.value) || 0;
      }
      function updateSummary() {
        const prestoRevenue = getNumericValue("presto-revenue");
        document.getElementById("summary-presto-revenue").textContent = prestoRevenue;
        let totalExpenses = 0;
        document.querySelectorAll(".expense-amount").forEach((input) => {
          totalExpenses += parseFloat(input.value) || 0;
        });
        document.getElementById("summary-total-expenses").textContent = totalExpenses;
        const openingCash = getNumericValue("opening-cash");
        const prestoCash = getNumericValue("presto-cash");
        const expectedCash = openingCash + prestoCash - totalExpenses;
        document.getElementById("summary-expected-cash").textContent = expectedCash;
        const actualCash = getNumericValue("actual-cash");
        document.getElementById("summary-actual-cash").textContent = actualCash;
        const discrepancy = actualCash - expectedCash;
        document.getElementById("summary-discrepancy").textContent = discrepancy;
        updateDiscrepancyMessage(discrepancy);
      }
      function updateDiscrepancyMessage(discrepancy) {
        const container = document.getElementById("discrepancy-message-container");
        container.innerHTML = "";
        if (discrepancy === 0) {
          return;
        }
        const message2 = document.createElement("div");
        message2.className = "discrepancy-message";
        if (discrepancy > 0) {
          message2.classList.add("surplus");
          message2.textContent = appState.config.messages.surplus;
        } else {
          message2.classList.add("shortage");
          message2.textContent = appState.config.messages.shortage;
        }
        container.appendChild(message2);
      }
      async function sendDataToWebhook() {
        console.log("Debounce timer elapsed. Sending data to webhook...");
        const { webhookUrl } = appState.config;
        if (!webhookUrl || webhookUrl === "YOUR_WEBHOOK_URL_HERE") {
          console.warn("Webhook URL is not configured. Skipping submission.");
          return;
        }
        const stateString = localStorage.getItem(getStorageKey());
        if (!stateString) {
          console.error("Could not retrieve state from localStorage to send.");
          return;
        }
        const state = JSON.parse(stateString);
        const summary = {};
        document.querySelectorAll("#summary-details .summary-item span[id]").forEach((span) => {
          summary[span.id.replace("summary-", "")] = span.textContent;
        });
        const payload = {
          reportId: `shift-${appState.businessDate}`,
          businessDate: appState.businessDate,
          data: state,
          summary
        };
        try {
          const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload, null, 2)
          });
          if (response.ok) {
            console.log("Successfully sent data to webhook.");
          } else {
            console.error(`Webhook submission failed with status: ${response.status}`);
            const errorBody = await response.text();
            console.error("Error body:", errorBody);
          }
        } catch (error) {
          console.error("An error occurred during webhook submission:", error);
        }
      }
    }
  });
  require_app();
})();
