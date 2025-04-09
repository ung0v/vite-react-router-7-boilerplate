import Cookies from 'js-cookie';
import { create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

import { UserType } from '@/types/user';

// cookie's storage object
export const CookieStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    // console.log(name, 'has been retrieved');
    return Cookies.get(name) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    // console.log(name, 'with value', value, 'has been saved');
    Cookies.set(name, value, { expires: 7, sameSite: 'None', secure: true });
  },
  removeItem: async (name: string): Promise<void> => {
    // console.log(name, 'has been deleted');
    Cookies.remove(name);
  },
};

export type UserState = {
  user: UserType | null;
  isLoggedIn: boolean;
};

type UserDispatch = {
  setUser: (user: UserType | null) => void;
  setAccessToken: (accessToken: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  reset: () => void;
};

const INITIAL_STATE: UserState = {
  user: null,
  isLoggedIn: false,
};

export const useUserStore = create<UserState & UserDispatch>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setUser: (user: UserType | null) => set((state) => ({ ...state, user })),
      setAccessToken: (accessToken: string) =>
        set((state) => ({
          ...state,
          user: { ...state.user, accessToken } as UserType,
        })),
      setIsLoggedIn: (isLoggedIn: boolean) =>
        set((state) => ({ ...state, isLoggedIn })),
      reset: () => {
        return set(INITIAL_STATE);
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => CookieStorage),
      // skipHydration: true,
    },
  ),
);
