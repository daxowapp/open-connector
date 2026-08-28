import { describe, expect, it } from "vitest";
import { provider } from "./definition.ts";

const googleDriveFullScope = "https://www.googleapis.com/auth/drive";
const googleDriveReadonlyScope = "https://www.googleapis.com/auth/drive.readonly";
const googleDriveMetadataReadonlyScope = "https://www.googleapis.com/auth/drive.metadata.readonly";

describe("Google Drive provider definition", () => {
  it("declares narrow read scopes for requestedScopes while retaining full catalog support", () => {
    const oauth = provider.auth.find((auth) => auth.type === "oauth2");

    expect(oauth?.scopes).toEqual([googleDriveMetadataReadonlyScope, googleDriveReadonlyScope, googleDriveFullScope]);
  });
});
