"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { useRouter } from "next/navigation"

type UserRole = "student" | "sponsor" | null

interface User {
  uid: string
  email: string | null
  emailVerified: boolean
}

interface AuthContextType {
  user: User | null
  userRole: UserRole
  loading: boolean
  signup: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  sponsorLogin: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  sendVerificationEmail: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const signup = async (email: string, password: string) => {
    // Simulate signup process
    setLoading(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Create mock user
    const mockUser: User = {
      uid: "mock-user-" + Math.random().toString(36).substring(2, 9),
      email: email,
      emailVerified: false,
    }

    setUser(mockUser)
    setUserRole("student")
    setLoading(false)

    console.log("Mock signup:", { email, password })
    return
  }

  const login = async (email: string, password: string) => {
    // Simulate login process
    setLoading(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Create mock user
    const mockUser: User = {
      uid: "mock-user-" + Math.random().toString(36).substring(2, 9),
      email: email,
      emailVerified: true,
    }

    setUser(mockUser)
    setUserRole("student")
    setLoading(false)

    console.log("Mock login:", { email, password })
    return
  }

  const sponsorLogin = async (email: string, password: string) => {
    // Simulate sponsor login process
    setLoading(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Create mock user
    const mockUser: User = {
      uid: "mock-sponsor-" + Math.random().toString(36).substring(2, 9),
      email: email,
      emailVerified: true,
    }

    setUser(mockUser)
    setUserRole("sponsor")
    setLoading(false)

    console.log("Mock sponsor login:", { email, password })
    return
  }

  const logout = async () => {
    // Simulate logout process
    setLoading(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    setUser(null)
    setUserRole(null)
    setLoading(false)

    console.log("Mock logout")
    router.push("/")
    return
  }

  const sendVerificationEmail = async () => {
    // Simulate sending verification email
    console.log("Mock: Sending verification email")
    return
  }

  const resetPassword = async (email: string) => {
    // Simulate password reset
    console.log("Mock: Sending password reset email to", email)
    return
  }

  const value = {
    user,
    userRole,
    loading,
    signup,
    login,
    sponsorLogin,
    logout,
    sendVerificationEmail,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
