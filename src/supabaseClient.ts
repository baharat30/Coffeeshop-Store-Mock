// src/supabaseClient.ts
type User = { id: number; email: string };

let currentUser: User | null = null;
let authCallback: ((event: string, session: { user: User | null } | null) => void) | null = null;

export const supabase = {
  auth: {
    getUser: async () => ({ data: { user: currentUser }, error: null }),
    onAuthStateChange: (callback: (event: string, session: { user: User | null } | null) => void) => {
      authCallback = callback;
      // شبیه‌سازی callback اولیه
      setTimeout(() => callback(currentUser ? "SIGNED_IN" : "SIGNED_OUT", { user: currentUser }), 0);
      return { data: { subscription: { unsubscribe: () => { authCallback = null } } }, error: null };
    },
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      currentUser = { id: 1, email };
      authCallback?.("SIGNED_IN", { user: currentUser });
      return { data: { user: currentUser }, error: null };
    },
    signOut: async () => {
      currentUser = null;
      authCallback?.("SIGNED_OUT", { user: null });
      return { data: null, error: null };
    },
  },

  from: (table: string) => ({
    select: (columns?: string) => ({
      eq: (field: string, value: any) => ({
        order: (field: string, options?: { ascending: boolean }) => ({
          single: () => ({
            data:
              table === "orders"
                ? {
                    id: 101,
                    user_id: 1,
                    full_name: "Mock User",
                    address: "123 Mock St",
                    created_at: new Date().toISOString(),
                  }
                : { id: 1, name: "Mock Item" },
            error: null,
          }),
        }),
        single: () => ({
          data:
            table === "orders"
              ? {
                  id: 101,
                  user_id: 1,
                  full_name: "Mock User",
                  address: "123 Mock St",
                  created_at: new Date().toISOString(),
                }
              : { id: 1, name: "Mock Item" },
          error: null,
        }),
      }),
      order: (field: string, options?: { ascending: boolean }) => ({
        single: () => ({
          data:
            table === "orders"
              ? {
                  id: 101,
                  user_id: 1,
                  full_name: "Mock User",
                  address: "123 Mock St",
                  created_at: new Date().toISOString(),
                }
              : { id: 1, name: "Mock Item" },
          error: null,
        }),
      }),
      single: () => ({
        data:
          table === "orders"
            ? {
                id: 101,
                user_id: 1,
                full_name: "Mock User",
                address: "123 Mock St",
                created_at: new Date().toISOString(),
              }
            : { id: 1, name: "Mock Item" },
        error: null,
      }),
    }),
  }),
};
