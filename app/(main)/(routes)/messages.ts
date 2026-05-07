interface EntityActions {
  page: "create" | "restore" | "delete" | "archive";
  icon: "update" | "remove";
  trash: "delete" | "empty";
}

type Entity = keyof EntityActions;
type ActionFor<E extends Entity> = EntityActions[E];

interface Message {
  loading: string;
  success: string;
  error: string;
}

export const DOCUMENT_MESSAGES: {
  [A in Entity]: {
    [B in ActionFor<A>]: Message;
  };
} = {
  page: {
    create: {
      loading: "Creating Page...",
      success: "Page was created",
      error: "Couldn't create page",
    },
    restore: {
      loading: "Restoring Page...",
      success: "Page was restored",
      error: "Couldn't restore page",
    },
    delete: {
      loading: "Deleting Page...",
      success: "Page was deleted",
      error: "Couldn't delete page",
    },
    archive: {
      loading: "Archiving Page...",
      success: "Page was archived",
      error: "Couldn't archive page",
    },
  },
  icon: {
    update: {
      loading: "Updating icon...",
      success: "Icon was updated",
      error: "Couldn't update icon",
    },
    remove: {
      loading: "Removing icon...",
      success: "Icon was removed",
      error: "Couldn't remove icon",
    },
  },
  trash: {
    delete: {
      loading: "Deleting from Trash...",
      success: "Deleted from Trash",
      error: "Couldn't delete from Trash",
    },
    empty: {
      loading: "Emptying Trash...",
      success: "Trash was emptied",
      error: "Couldn't empty trash",
    },
  },
};
