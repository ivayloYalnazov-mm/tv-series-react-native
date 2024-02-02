import { stripHtml } from "./stripHtml";

describe("stripHtml", () => {
  it("removes basic HTML tags", () => {
    const input = "<p>This is a paragraph.</p>";
    const output = stripHtml(input);
    expect(output).toBe("This is a paragraph.");
  });

  it("removes nested HTML tags", () => {
    const input = "<div><p>This <b>is</b> a paragraph.</p></div>";
    const output = stripHtml(input);
    expect(output).toBe("This is a paragraph.");
  });

  it("does not remove HTML entities", () => {
    const input = "This is a test &amp; only a test";
    const output = stripHtml(input);
    expect(output).toBe("This is a test &amp; only a test");
  });

  it("leaves text without HTML unchanged", () => {
    const input = "This is a test without HTML tags.";
    const output = stripHtml(input);
    expect(output).toBe("This is a test without HTML tags.");
  });

  it("handles empty strings", () => {
    const input = "";
    const output = stripHtml(input);
    expect(output).toBe("");
  });
});
