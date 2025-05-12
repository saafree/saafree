import puppeteer from "puppeteer";

async function runTests() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  const tests = [
    {
      name: "Test 1: Modal sell → Zalo",
      run: async () => {
        await page.goto("http://localhost:3000/create-ad/sell");
        await page.click('button[data-testid="open-modal"]');
        await page.waitForSelector('button[data-testid="platform-zalo"]');
        await page.click('button[data-testid="platform-zalo"]');
        await page.waitForNavigation();
        return page.url() === "http://localhost:3000/create-ad/sell/zalo";
      },
    },
    {
      name: "Test 2: Modal promote → Facebook",
      run: async () => {
        await page.goto("http://localhost:3000/create-ad/promote");
        await page.click('button[data-testid="open-modal"]');
        await page.waitForSelector('button[data-testid="platform-facebook"]');
        await page.click('button[data-testid="platform-facebook"]');
        await page.waitForNavigation();
        return page.url() === "http://localhost:3000/create-ad/promote/facebook";
      },
    },
    {
      name: "Test 3: ChatInput ghi âm và gửi prompt",
      run: async () => {
        await page.goto("http://localhost:3000");
        await page.click('button[data-testid="speech-button"]');
        await new Promise(res => setTimeout(res, 2000)); // Giả lập thời gian ghi âm
        await page.click('button[data-testid="speech-button"]'); // Dừng ghi âm
        await page.type('input[data-testid="chat-input"]', "Test prompt");
        await page.click('button[data-testid="submit-button"]');
        await page.waitForSelector('div[data-testid="toast-success"]');
        return true;
      },
    },
    {
      name: "Test 4: AdForm ghi âm và submit",
      run: async () => {
        await page.goto("http://localhost:3000/create-ad/sell/zalo");
        await page.click('button[data-testid="speech-title"]');
        await new Promise(res => setTimeout(res, 2000)); // Giả lập thời gian ghi âm
        await page.click('button[data-testid="speech-title"]'); // Dừng ghi âm
        await page.type('input[data-testid="title-input"]', "Test title");
        await page.type('textarea[data-testid="description-input"]', "Test description");
        await page.type('input[data-testid="price-input"]', "100000");
        await page.click('button[data-testid="submit-form"]');
        await page.waitForSelector('div[data-testid="toast-success"]');
        return true;
      },
    },
  ];

  const results = [];
  for (const test of tests) {
    console.log(`Running ${test.name}`);
    try {
      const passed = await test.run();
      results.push({ name: test.name, passed });
      console.log(`${test.name}: ${passed ? "PASS" : "FAIL"}`);
    } catch (error) {
      console.error(`${test.name}: FAIL`, error);
      results.push({ name: test.name, passed: false });
    }
  }

  await browser.close();

  console.log("\nTest Results:");
  results.forEach((result) => {
    console.log(`${result.name}: ${result.passed ? "PASS" : "FAIL"}`);
  });
  console.log(`\nSummary: ${results.filter((r) => r.passed).length}/${results.length} tests passed`);
}

runTests().catch((error) => {
  console.error("Test suite failed:", error);
  process.exit(1);
});