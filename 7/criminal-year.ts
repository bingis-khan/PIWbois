
type MyDate =
	| { kind: 'dotted', year: string }
	| { kind: 'numeric', year: number, month: number, day: number }
	| { kind: 'mixed', year: number, month: string, day: number }
	| { kind: 'leap', month: number, day: number, leap: boolean };


function daysPassed(leap: boolean, month: number, day: number) {
	const months =
	[	31
	,	28
	,	31
	,	30
	,	31
	,	30
	,	31
	,	31
	,	30
	,	31
	,	30
	,	31
	]

	let days = 0;
	for (let i = 0; i < month - 1; i++)
		if (i === 1 && leap)
			days += 29;
		else
			days += months[i];
	
	if (day > months[month - 1])
		return 'invalid date';
	else
		return days + day;
};

function isLeapYear(year: number) {
	return year % 100 == 0 && year % 400 != 0;
}

function fromMonthName(month: string) {
	const map = {
		'marzec': 2
	};

	return map[month];
}

function criminalYear(date: MyDate) {
	switch (date.kind) {
	case 'dotted': {
		const parsedDate = date.year.split('.'); 
		return daysPassed(isLeapYear(+parsedDate[0]), +parsedDate[1], +parsedDate[0]);
	}
	case 'numeric':
		return daysPassed(isLeapYear(date.year), date.month, date.day);	
	case 'mixed':
		return daysPassed(isLeapYear(date.year), fromMonthName(date.month), date.day);
	case 'leap':
		return daysPassed(date.leap, date.month, date.day);
	}
};
