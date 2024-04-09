import { assertEquals } from "jsr:@std/assert";
import { max, min } from "../mod.ts";

Deno.test("Maths.sum", () => {
  assertEquals(max([1, 2, 3, 4, 7]), 7);
});

Deno.test("Maths.min", () => {
  assertEquals(min([1, 2, 3, 4, 7]), 1);
});
