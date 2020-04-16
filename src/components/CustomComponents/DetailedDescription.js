import React from "react";

import NavPills from "components/NavPills/NavPills.js";

import CreateWorldData from "components/CustomComponents/CreateWorldData";

export default function DetailedDescription() {
  return (
    <NavPills
      color="warning"
      tabs={[
        {
          tabButton: "Indian States",
          tabContent: (
            <span>
              <p>coming soon...</p>
            </span>
          )
        },
        {
          tabButton: "World",
          tabContent: <CreateWorldData />
        }
      ]}
    />
  );
}
