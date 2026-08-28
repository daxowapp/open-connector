export const googleDriveReadonlyScope = "https://www.googleapis.com/auth/drive.readonly";
export const googleDriveMetadataReadonlyScope = "https://www.googleapis.com/auth/drive.metadata.readonly";
export const googleDriveFullScope = "https://www.googleapis.com/auth/drive";

// Declare the narrow read scopes as selectable OAuth client scopes. The default
// catalog still supports write actions through googleDriveFullScope, while a
// Daxow-style runtime can request metadata-only access.
export const googledriveOAuthScopes: string[] = [
  googleDriveMetadataReadonlyScope,
  googleDriveReadonlyScope,
  googleDriveFullScope,
];
