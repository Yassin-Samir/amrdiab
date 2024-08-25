import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "amrdiab",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        environment: {
          PRIVATE_KEY: process.env.PRIVATE_KEY!,
          CLIENT_EMAIL: process.env.CLIENT_EMAIL!,
          ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY!,
          NEXT_PUBLIC_SEARCH_ALGOLIA_KEY:
            process.env.NEXT_PUBLIC_SEARCH_ALGOLIA_KEY!,
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
