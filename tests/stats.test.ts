import { assertAlmostEquals, assertEquals } from "jsr:@std/assert";
import { Stats } from "../mod.ts";

Deno.test("Stats.average", () => {
  assertAlmostEquals(Stats.average([1, 2, 3, 4, 7]), 3.4);
});

Deno.test("Stats variance", () => {
  assertAlmostEquals(Stats.variance([1, 2, 3, 4, 7]), 4.24, 0.001);
});

Deno.test("Stats.stdDev", () => {
  assertAlmostEquals(Stats.stdDev([1, 2, 3, 4, 7]), 2.06, 0.001);
});

Deno.test("Stats.median", () => {
  assertEquals(Stats.median([1, 2, 3, 4, 7]), 3);
});

Deno.test("Stats.mode", () => {
  assertEquals(Stats.mode([1, 2, 3, 4, 7, 7, 7, 7]), 7);
});

Deno.test("Stats.range", () => {
  assertEquals(Stats.range([1, 2, 3, 4, 7]), 6);
});
