// src/contexts/AuthContext.ts (or similar path)
import { createContext } from "react";
import type { User } from "firebase/auth";

// Your interfaces and context definition
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// // AuthProvider.tsx
// import React, { createContext, useState,  useEffect } from "react";
// import type { ReactNode } from "react";
// import {
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import type { User } from "firebase/auth";
// import { auth } from "@/firebase";

// // Your interfaces and context definition remain here
// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   error: string | null;
//   loading: boolean;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   const login = async (email: string, password: string) => {
//     setError(null);
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         setError(error.message);
//       } else {
//         setError("An unknown error occurred.");
//       }
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         setError(error.message);
//       } else {
//         setError("An unknown error occurred.");
//       }
//     }
//   };

//   const value = {
//     user,
//     isAuthenticated: !!user,
//     login,
//     logout,
//     error,
//     loading,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // **Note:** The `useAuth` hook is no longer here.

// // import React, { createContext, useState, useContext, useEffect } from "react";
// // import type { ReactNode } from "react";
// // import {
// //   signInWithEmailAndPassword,
// //   signOut,
// //   onAuthStateChanged,
// // } from "firebase/auth";
// // import type { User } from "firebase/auth";
// // import { auth } from "@/firebase";

// // interface AuthContextType {
// //   user: User | null;
// //   isAuthenticated: boolean;
// //   login: (email: string, password: string) => Promise<void>;
// //   logout: () => Promise<void>;
// //   error: string | null;
// //   loading: boolean;
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // export const AuthProvider: React.FC<{ children: ReactNode }> = ({
// //   children,
// // }) => {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [error, setError] = useState<string | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// //       setUser(user);
// //       setLoading(false);
// //     });

// //     return unsubscribe;
// //   }, []);

// //   const login = async (email: string, password: string) => {
// //     setError(null);
// //     try {
// //       await signInWithEmailAndPassword(auth, email, password);
// //     } catch (error: unknown) {
// //       if (error instanceof Error) {
// //         setError(error.message);
// //       } else {
// //         setError("An unknown error occurred.");
// //       }
// //       throw error;
// //     }
// //   };

// //   const logout = async () => {
// //     try {
// //       await signOut(auth);
// //     } catch (error: unknown) {
// //       // You must now check the type of `error` before using it
// //       if (error instanceof Error) {
// //         setError(error.message);
// //       } else {
// //         // Handle cases where the error is not a standard Error object
// //         setError("An unknown error occurred.");
// //       }
// //     }
// //   };
// //   const value = {
// //     user,
// //     isAuthenticated: !!user,
// //     login,
// //     logout,
// //     error,
// //     loading,
// //   };

// //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// // };

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (context === undefined) {
// //     throw new Error("useAuth must be used within an AuthProvider");
// //   }
// //   return context;
// // };
