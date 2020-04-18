import React from "react";

import NavPills from "components/NavPills/NavPills.js";

import CreateWorldData from "components/CustomComponents/CreateWorldData";
import CreateIndianStateData from "components/CustomComponents/CreateIndianStateData";

export default function DetailedDescription() {
  return (
    <NavPills
      color="warning"
      tabs={[
        {
          tabButton: "Indian States",
          tabContent: <CreateIndianStateData />
        },
        {
          tabButton: "World",
          tabContent: <CreateWorldData />
        }
      ]}
    />
  );
}
