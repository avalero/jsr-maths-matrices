import { assertEquals } from "jsr:@std/assert";
import { Maths } from "../mod.ts";

Deno.test("Maths.sum", () => {
  assertEquals(Maths.max([1, 2, 3, 4, 7]), 7);
});

Deno.test("Maths.min", () => {
  assertEquals(Maths.min([1, 2, 3, 4, 7]), 1);
});
