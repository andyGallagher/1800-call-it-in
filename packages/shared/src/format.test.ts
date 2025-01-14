import { expect, test } from "vitest";
import { collapsed, removeNewlines, unindented } from "./format";

test("removeNewLines", () => {
    expect(removeNewlines`
Test ${777}
`).toEqual("Test 777");

    expect(removeNewlines`

Interesting

`).toEqual(`Interesting`);

    expect(removeNewlines`Test
  `).toEqual(`Test`);
    expect(removeNewlines`
  Test`).toEqual(`Test`);
    expect(removeNewlines`Test`).toEqual(`Test`);
});

test("unindented", () => {
    expect(unindented`
    Test ${777}
  `).toEqual("Test 777");

    expect(unindented`

    Interesting

  `).toEqual(`
Interesting
`);

    expect(unindented`Test
  `).toEqual(`Test`);
    expect(unindented`
  Test`).toEqual(`Test`);
    expect(unindented`Test`).toEqual(`Test`);
});

test("collapsed", () => {
    expect(collapsed`

    Test ${777}

  `).toEqual("Test 777");
});
