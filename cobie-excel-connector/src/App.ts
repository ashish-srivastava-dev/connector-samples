/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as pcf from "@itwin/pcf";
import * as path from "path";

// App.ts contains all the parameters to start a connector job and the App.js created from this file will be the executable for your connector.
// CAUTION: You may not want to commit this file as it contains client-specific info.

export async function main() {
  const jobArgs = new pcf.JobArgs({
    subjectKey: "cobie-subject-1",
    connectorPath: path.join(__dirname, "COBieConnector.js"),
    connection: {
      loaderKey: "cobie-xlsx-loader",
      kind: "pcf_file_connection",
      filepath: path.join(__dirname, "../assets/<source XLSX file name>"),
    },
  });
  const hubArgs = new pcf.HubArgs({
    projectId: "<your project ID>",
    iModelId: "<your iModel ID>",
    clientConfig: {
      clientId: "<your client ID>",
      redirectUri: "<your client redirect URI>",
      scope: "<your client scope>",
      issuerUrl: "https://ims.bentley.com",
    },
  });
  const app = new pcf.BaseApp(jobArgs, hubArgs);
  await app.run();
}

main().catch((err) => console.log(err.message));

