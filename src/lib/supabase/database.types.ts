export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          invite_code: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          invite_code?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          invite_code?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      organization_members: {
        Row: {
          id: string;
          organization_id: string;
          user_id: string;
          role: "owner" | "admin" | "member";
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          user_id: string;
          role?: "owner" | "admin" | "member";
          created_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          user_id?: string;
          role?: "owner" | "admin" | "member";
          created_at?: string;
        };
        Relationships: [];
      };
      workspaces: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          name: string;
          slug: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          name?: string;
          slug?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      channels: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          kind: "chat" | "system" | "storage";
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          name: string;
          kind?: "chat" | "system" | "storage";
          created_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          name?: string;
          kind?: "chat" | "system" | "storage";
          created_at?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          channel_id: string;
          author_id: string | null;
          body: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          channel_id: string;
          author_id?: string | null;
          body: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          channel_id?: string;
          author_id?: string | null;
          body?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          id: string;
          workspace_id: string;
          title: string;
          description: string | null;
          status: "todo" | "in_progress" | "review" | "done";
          priority: "low" | "medium" | "high";
          assignee_id: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          title: string;
          description?: string | null;
          status?: "todo" | "in_progress" | "review" | "done";
          priority?: "low" | "medium" | "high";
          assignee_id?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          title?: string;
          description?: string | null;
          status?: "todo" | "in_progress" | "review" | "done";
          priority?: "low" | "medium" | "high";
          assignee_id?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      flowcharts: {
        Row: {
          id: string;
          workspace_id: string;
          title: string;
          data: Json;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          title: string;
          data?: Json;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          title?: string;
          data?: Json;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      whiteboards: {
        Row: {
          id: string;
          workspace_id: string;
          title: string;
          scene: Json;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          title: string;
          scene?: Json;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          title?: string;
          scene?: Json;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      workspace_files: {
        Row: {
          id: string;
          workspace_id: string;
          uploaded_by: string | null;
          name: string;
          storage_path: string;
          mime_type: string;
          size_bytes: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          uploaded_by?: string | null;
          name: string;
          storage_path: string;
          mime_type?: string;
          size_bytes?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          uploaded_by?: string | null;
          name?: string;
          storage_path?: string;
          mime_type?: string;
          size_bytes?: number | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      create_personal_workspace: {
        Args: {
          org_name?: string;
        };
        Returns: string;
      };
      create_company_workspace: {
        Args: {
          company_name: string;
        };
        Returns: string;
      };
      join_organization_by_code: {
        Args: {
          join_code: string;
        };
        Returns: string;
      };
    };
    Enums: {
      org_role: "owner" | "admin" | "member";
      channel_kind: "chat" | "system" | "storage";
      task_status: "todo" | "in_progress" | "review" | "done";
      task_priority: "low" | "medium" | "high";
    };
    CompositeTypes: Record<string, never>;
  };
};
