const hasSpecicalChar = (name: string) => {
  const specicalChars = ['.', ',', ' ', '(', ')', '{', '}', '+', '-', '*', '/', '%', '\\'];
  for (const char of specicalChars) {
    if (name.indexOf(char) >= 0) {
      return true;
    }
  }
  return false;
};

export const addEscape = (name: string) => {
  let formatName = name;
  if (name.indexOf('\\') >= 0) {
    formatName = formatName.replace(/\\/g, '\\\\');
  }
  if (name.indexOf('}') >= 0) {
    formatName = formatName.replace(/}/g, '\\}');
  }
  return formatName;
};

export const removeEscape = (name: string) => {
  let formatName = name;
  if (name.indexOf('\\}') >= 0) {
    formatName = formatName.replace(/\\}/g, '}');
  }
  if (name.indexOf('\\\\') >= 0) {
    formatName = formatName.replace(/\\\\/g, '\\');
  }
  return formatName;
};

export const getFormatName = (name: string) => {
  let formatName = name;
  if (hasSpecicalChar(formatName)) {
    formatName = addEscape(formatName);
    formatName = `{${formatName}}`;
  }
  return formatName;
};

export const getRangePosition = ({
  value,
  selectionStart,
}: {
  value: string;
  selectionStart: number;
}) => {
  let replaceStartIndex;
  let replaceEndIndex;
  let stopMap: { [key: string]: any } = {
    ',': 1,
    ' ': 1,
    '(': 1,
    ')': 1,
    '+': 1,
    '-': 1,
    '*': 1,
    '/': 1,
    '%': 1,
    '{': 1,
    '}': 1,
  };

  const length = value.length;

  replaceStartIndex = selectionStart;

  while (replaceStartIndex > 0 && !stopMap[value[replaceStartIndex - 1]]) {
    replaceStartIndex = replaceStartIndex - 1;
  }

  if (value[replaceStartIndex - 1] === '{') {
    stopMap = {
      '}': 1,
    };
  }

  replaceEndIndex = replaceStartIndex;

  while (replaceEndIndex < length) {
    const char = value[replaceEndIndex];
    if (char === '\\') {
      replaceEndIndex += 2;
    } else if (!stopMap[char]) {
      replaceEndIndex = replaceEndIndex + 1;
    } else {
      break;
    }
  }

  return { replaceStartIndex, replaceEndIndex };
};

export const fieldParse = ({
  columnsNameMap,
  value = '',
}: {
  columnsNameMap: any;
  value: string;
}) => {
  const referencedColumnIdsForValue = [];
  let formulaTextParsed = value;
  let cursorIndex = 0;

  while (cursorIndex <= formulaTextParsed.length) {
    const { replaceStartIndex, replaceEndIndex } = getRangePosition({
      value: formulaTextParsed,
      selectionStart: cursorIndex,
    });

    const rangeStr = formulaTextParsed.slice(replaceStartIndex, replaceEndIndex);

    const column = columnsNameMap[removeEscape(rangeStr)];

    if (column) {
      referencedColumnIdsForValue.push(column.id);
      formulaTextParsed = formulaTextParsed.replace(rangeStr, `column_value_${column.id}`);
    }
    cursorIndex = replaceEndIndex + 1;
  }

  return {
    referencedColumnIdsForValue,
    formulaTextParsed,
  };
};

export const fieldFormat = ({ columnsIdMap, value }: { columnsIdMap: any; value: any }) => {
  const { referencedColumnIdsForValue, formulaTextParsed } = value;
  let replacedValue = formulaTextParsed || '';
  referencedColumnIdsForValue.forEach((colId: string) => {
    const column = columnsIdMap[colId];
    replacedValue = replacedValue.replace(
      new RegExp(`column_value_${colId}`, 'g'),
      addEscape(column.name),
    );
  });

  return replacedValue;
};
