var isoExp = 
/^\s*(\d{4})(?:-(\d\d)(?:-(\d\d)(?:T([0-2][0-9])(?:(?:\:([0-5][0-9]))?(?:\:([0-5][0-9])(\.\d{1,3})?)?))?)?)?\s*$/;

function parseISO8601(dateStringInRange) {
   var date = new Date(NaN), month,
       parts = isoExp.exec(dateStringInRange);

  if(parts) {
    // XXX IE8.
    // Ecma says capturing groups that don't match
    // (NPCG) should set to undefined (s 15.10.2.5).
    //
    // IE <= 8 sets NPCG to "", So in IE8, 
    // when parts[2] is "", "" - 1 results -1.
    month = (parts[2]&&parts[2]-1)||0;
    date.setFullYear(parts[1], month, parts[3]||1);
    if(month !== date.getMonth()) {
      date.setTime(NaN);
    } else if(parts[3]) {
      setThyme(date, parts[4], parts[5], parts[6], parts[7]);
    }
  }
  return date;
}

/**
 * @param date Date object to be modified.
 * @param hh 00-24
 * @param mm 00-59
 * @param ss 00-59 (no leap seconds)
 */
function setThyme(date, hh, mm, ss, mmm) {
  var undef0 = /^(undefined|00)$/;
  if(hh > 24 || hh === "24" &&
     !(undef0.test(mm) && undef0.test(ss))) {
       date.setTime(NaN);
  } else {
    date.setHours(hh||0, mm||0, ss||0, (1000*mmm)||0);
  }
}
