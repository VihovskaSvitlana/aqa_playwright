import type { Reporter, TestCase, TestResult } from "@playwright/test/reporter";

class TestReporter implements Reporter {
  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Finished test ${test.title}: ${result.status}`);
  }
  onError(error: any) {
    console.log(`Error is the test: ${error}`);
  }
}
export default TestReporter;
