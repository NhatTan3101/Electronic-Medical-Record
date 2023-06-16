import { Stack, Typography } from "@mui/material";
import * as React from "react";
import UserAvatar from "../UserAvatar/UserAvatar.avatar";

export default function AvatarItem(props) {
  const { name, code } = props;
  return (
    <Stack padding={1} spacing={2} direction="row">
        <UserAvatar>{name}</UserAvatar>
        <Stack>
          <Typography color="black" variant="caption">
            {name}
          </Typography>
          <Typography color="black" variant="caption">
            {code}
          </Typography>
        </Stack>
    </Stack>
  );
}
