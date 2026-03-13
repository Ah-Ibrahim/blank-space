import { initEdgeStore } from "@edgestore/server";
import { initEdgeStoreClient } from "@edgestore/server/core";

const es = initEdgeStore.create();

export const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket().beforeDelete(() => {
    return true;
  }),
});

export const backendClient = initEdgeStoreClient({
  router: edgeStoreRouter,
});
