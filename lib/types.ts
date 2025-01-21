export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    photo: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  export interface AuthStore {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (response: AuthResponse) => void;
    logout: () => void;
  }