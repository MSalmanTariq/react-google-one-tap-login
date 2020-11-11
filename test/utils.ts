type TestCasesExecutorType = {
  title: string;
  cases: Function[];
};
const testCasesExecutor = (args: TestCasesExecutorType): void => {
  describe(args.title, () => {
    args.cases.forEach((testCase) => testCase());
  });
};

export default testCasesExecutor;
