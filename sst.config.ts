//@ts-nocheck
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "amrdiab",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket("hadabaBucket", {
      public: true,
    });
    new sst.aws.Nextjs("hadaba", {
      link: [bucket],
      environment: {
        PRIVATE_KEY: process.env.PRIVATE_KEY!,
        CLIENT_EMAIL: process.env.CLIENT_EMAIL!,
        ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY!,
        NEXT_PUBLIC_SEARCH_ALGOLIA_KEY:
          process.env.NEXT_PUBLIC_SEARCH_ALGOLIA_KEY!,
      },
    });
  },
});
