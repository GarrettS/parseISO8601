parseISO8601
============

Parse ISO 8601 subset that is a union of what is specified both in ECMAScript and ISO 8601. 


## Valid Formats
```
YYYY
YYYY-MM
YYYY-MM-DD
YYYY-MM-DDThh
YYYY-MM-DDThh:mm
YYYY-MM-DDThh:mm:ss
YYYY-MM-DDThh:mm:ss.m
YYYY-MM-DDThh:mm:ss.mm
YYYY-MM-DDThh:mm:ss.mmm
```

Parses local date formats.

Ecma parsing switches between local and UTC, 
parsing ISO 8601 extended format with 
missing z designator as UTC.


```
var date = new Date(Date.parse("2011-01-01"));
date.getFullYear() // 2010
```
But middle endian format works:

```
var date2 = new Date(Date.parse("01/01/2011"));
date2.getFullYear() // 2011
```

Native `Date` will parse dates that don't exist:

```
var date3 = new Date(Date.parse("11/31/2010"));
 date3.toString(); Wed Dec 01 2010
```

Likewise in YUI. Designed as documented. [https://yuilibrary.com/yui/docs/datatype/datatype-dateparse.html](https://yuilibrary.com/yui/docs/datatype/datatype-dateparse.html).
 
EcmaScript 5 introduced incorrect ISO8601 parsing:
> The value of an absent time zone offset is “Z”."

[http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) 
That's wrong. Missing z is to be interpreted as a local time.
 


ECMAScript draft 6 corrects this mistake:

| If the time zone offset is absent, the date-time is interpreted as a
local time.
[https://people.mozilla.org/~jorendorff/es6-draft.html#sec-date-time-string-format](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-date-time-string-format)

Historical problems with Date.parse: [http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.4.2](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.4.2)
>   The String may be interpreted as a local time,
>    a UTC time, or a time in some other time zone"
