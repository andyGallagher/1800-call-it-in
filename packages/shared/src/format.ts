export const formatCentsToDollars = (cents: number): string => {
    const inDollars = (cents / 100).toFixed(2);
    return `$${inDollars}`;
};

/**
 * Remove newlines in a tagged template literal.
 *
 * Used like: removeNewlines`
 * my string
 * won't have
 * newlines
 * `
 *
 * returns "my string won't have newlines"
 */
export const removeNewlines = (
    rawStrings: TemplateStringsArray,
    ...args: any[] | never
) => {
    // Interpolate template strings with variables
    const joinedString = rawStrings
        .flatMap((rawString, index) =>
            index < rawStrings.length ? [rawString, args[index]] : rawString,
        )
        .join("");

    // Split against newlines, filter out empty sequences, join with spaces, and trim.
    return joinedString
        .split("\n")
        .filter((line) => line !== "")
        .join(" ")
        .trim();
};

/**
 * Remove indents in a tagged template literal.
 *
 * Used like: unindented`
 *     my string
 *     won't have weird leading spaces
 *     but will still have newlines
 * `
 *
 * returns: "my string\nwon't have weird leading spaces\nbut will still have newlines"
 */
export const unindented = (
    rawStrings: TemplateStringsArray,
    ...args: any[] | never
) => {
    // Interpolate template strings with variables
    const joinedString = rawStrings
        .flatMap((rawString, index) =>
            index < rawStrings.length ? [rawString, args[index]] : rawString,
        )
        .join("");

    // Split against newlines
    const splitLines = joinedString.split("\n");

    if (splitLines[0].trim() === "") {
        splitLines.shift();
    }
    if (splitLines[splitLines.length - 1].trim() === "") {
        splitLines.pop();
    }

    // Remove leading and trailing spaces
    const removedLeadingSpaces = splitLines
        .map((line) => {
            return line;
        })
        .filter((line): line is string => line !== undefined);

    // Replace all tabs
    const removedTabs = removedLeadingSpaces.map((line) =>
        line.replace(/^\s+/g, ""),
    );

    // Join with newlines
    return removedTabs.join("\n");
};

/**
 * Remove indents and newlines in a tagged template literal.
 *
 * Used like: collapsed`
 *     my string
 *     won't have weird leading spaces
 *     and also won't have newlines
 * `
 *
 * returns: "my string won't have weird leading spaces and also won't have newlines"
 */
export const collapsed = (
    rawStrings: TemplateStringsArray,
    ...args: any[] | never
) => {
    return removeNewlines`${unindented(rawStrings, ...args)}`;
};
