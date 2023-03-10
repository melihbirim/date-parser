const formats = [
    'YYYY/MM/DD HH:mm:ss.SSS z',
    'YYYY/MM/DD HH:mm:ss.SSS',
    'YYYY/MM/DD HH:mm:ss z',
    'YYYY/MM/DD HH:mm:ss',
    'YYYY-MM-DDTHH:mm:ss.SSSZ',
    'YYYY-MM-DD HH:mm:ss.SSS z',
    'YYYY-MM-DD HH:mm:ss.SSS',
    'YYYY-MM-DD HH:mm:ss z',
    'YYYY-MM-DD HH:mm:ss',
    'dd MMM yyyy HH:mm:ss.SSS z',
    'MMM dd yyyy HH:mm:ss.SSS z',
    'MM/DD/YYYY HH:mm:ss.SSS z',
    'MM/DD/YYYY HH:mm:ss.SSS',
    'MM/DD/YYYY HH:mm:ss z',
    'MM/DD/YYYY HH:mm:ss',
    'DD/MM/YYYY HH:mm:ss.SSS z',
    'DD/MM/YYYY HH:mm:ss.SSS',
    'DD/MM/YYYY HH:mm:ss z',
    'DD/MM/YYYY HH:mm:ss',
    'YYYY/MM/DD',
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'YYYY-MM-DD',
    'MM-DD-YYYY',
    'DD-MM-YYYY',
];


function parseDate(input) {

    for (const format of formats) {
        const date = parseWithFormat(input, format);
        if (date !== null) {
            return { date: date, format: format };
        }
    }

    throw new Error(`Invalid date format: ${input}`);
}

function parseWithFormat(input, format) {
    const parts = input.trim().split(/[\s\/\-\:\.]+/);
    const formatParts = format.trim().split(/[\s\/\-\:\.]+/);

    if (parts.length !== formatParts.length) {
        return null;
    }

    const dateValues = {};
    let timezoneOffset = null;

    for (let i = 0; i < parts.length; i++) {
        const formatPart = formatParts[i];
        const part = parts[i];

        if (formatPart === 'YYYY' || formatPart === 'yyyy') {
            dateValues.year = parseInt(part, 10);
        } else if (formatPart === 'MM') {
            dateValues.month = parseInt(part, 10) - 1;
        } else if (formatPart === 'MMM') {
            dateValues.month = parseMonth(part);
        } else if (formatPart === 'DD' || formatPart == 'dd') {
            dateValues.day = parseInt(part, 10);
        } else if (formatPart === 'HH' || formatPart === 'hh' ) {
            dateValues.hour = parseInt(part, 10);
        } else if (formatPart === 'mm') {
            dateValues.minute = parseInt(part, 10);
        } else if (formatPart === 'ss') {
            dateValues.second = parseInt(part, 10);
        } else if (formatPart === 'SSS') {
            dateValues.millisecond = parseInt(part, 10);
        } else if (formatPart === 'z') {
            timezoneOffset = parseTimezoneOffset(part);
        }
    }

    if (!dateValues.year || !dateValues.month || !dateValues.day) {
        return null;
    }

    const dateObject = new Date(
        Date.UTC(
            dateValues.year,
            dateValues.month,
            dateValues.day,
            dateValues.hour || 0,
            dateValues.minute || 0,
            dateValues.second || 0,
            dateValues.millisecond || 0
        )
    );

    if (timezoneOffset !== null) {
        const localTime = dateObject.getTime();
        const localOffset = dateObject.getTimezoneOffset() * 60000;
        const targetOffset = timezoneOffset * 60000;
        const targetTime = localTime - localOffset + targetOffset;
        dateObject.setTime(targetTime);
    }
    return dateObject;
}

function parseMonth(monthString) {
    const monthNames = [
        'jan', 'feb', 'mar', 'apr', 'may', 'jun',
        'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
    ];
    const monthIndex = monthNames.indexOf(monthString.toLowerCase());
    if (monthIndex === -1) {
        // invalid month string, cannot parse date
        return undefined;
    }
    return monthIndex;
}

function parseTimezoneOffset(input) {
    const match = input.match(/^([+-])(\d{2}):?(\d{2})?$/);
    if (!match) {
        return null;
    }

    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3] || '00', 10);

    return sign * ((hours * 60) + minutes);
}

module.exports = parseDate;  