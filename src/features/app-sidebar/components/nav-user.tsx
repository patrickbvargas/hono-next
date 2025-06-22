"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";
import { SidebarGroup } from "~/shared/components";

export function NavUser() {
  const user = {
    avatar: "https://github.com/patrickbvargas.png",
    name: "Patrick Vargas",
    email: "fj8oT@example.com",
  };

  return (
    <SidebarGroup>
      <Dropdown placement="right-end">
        <DropdownTrigger>
          <User
            name={user.name}
            description={user.email}
            avatarProps={{
              src: user.avatar,
              radius: "lg",
            }}
            className="w-full justify-start transition-transform cursor-pointer"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@tonyreichert</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </SidebarGroup>
  );
}
