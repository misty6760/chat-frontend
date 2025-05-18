import ChatSideBar from "@/components/chat/ChatSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

const ChatLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <ChatSideBar title={"EE2E Chat"} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default ChatLayout;
