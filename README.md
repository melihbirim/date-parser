# Date Parser

A lightweight library for parsing date strings into Date objects.

## Installation

To install the package, run:

`npm install re-date-parser`


## Usage

To use the library, require the `date-parser` module and call the `parseDate` function with a date string and format string:

```javascript
const parseDate = require('re-date-parser');

const dateString = '2023-03-09T15:12:47.621Z';
const result = parseDate(dateString);

if (result) {
  console.log(`Parsed date: ${result.date.toISOString()}, using format: ${result.format}`);
} else {
  console.log('Failed to parse date.');
}

```

## Supported formats

The library currently supports the following date formats:

- YYYY/MM/DD
- MM/DD/YYYY
- DD/MM/YYYY
- YYYY-MM-DD
- MM-DD-YYYY
- DD-MM-YYYY
- YYYY/MM/DD HH:mm
- MM/DD/YYYY HH:mm
- DD/MM/YYYY HH:mm
- YYYY-MM-DD HH:mm
- MM-DD-YYYY HH:mm
- DD-MM-YYYY HH:mm
- YYYY/MM/DD HH:mm:ss
- MM/DD/YYYY HH:mm:ss
- DD/MM/YYYY HH:mm:ss
- YYYY-MM-DD HH:mm:ss
- MM-DD-YYYY HH:mm:ss
- DD-MM-YYYY HH:mm:ss
- YYYY/MM/DD HH:mm:ss.SSS
- YYYY-MM-DDTHH:mm:ss.SSSZ
- YYYY/MM/DD HH:mm:ss z
- YYYY-MM-DD HH:mm:ss z
- dd MMM yyyy HH:mm:ss.SSS z
- MMM dd yyyy HH:mm:ss.SSS z
- YYYY/MM/DD HH:mm:ss.SSS z
- YYYY-MM-DD HH:mm:ss.SSS z

## License

This library is licensed under the MIT License.