"use client";
import algoliaSearch from "algoliasearch/lite";
const algoliaClient = algoliaSearch("SM5LP1JAFS", process.env.NEXT_PUBLIC_SEARCH_ALGOLIA_KEY);
export { algoliaClient };
