import React, { useContext, useState, useEffect } from "react"
import { supabase } from "../supabaseClient"

const AuthContext = React.createContext()

export function AuthProvider({ children }) {
	const [user, setUser] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// Check active sessions and sets the user

		const getSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession()
			setUser(session?.user ?? null)
			setLoading(false)
		}
		getSession()

		// Listen for changes on auth state (logged in, signed out, etc.)
		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (event, session) => {
				setUser(session?.user ?? null)
				setLoading(false)
			}
		)

		return () => {
			authListener?.unsubscribe()
		}
	}, [])

	// Will be passed down to Signup, Login and Dashboard components
	const value = {
		signUp: async (data) => await supabase.auth.signUp(data),
		signIn: async (data) => await supabase.auth.signInWithPassword(data),
		signInWithGoogle: async (data) =>
			await supabase.auth.signInWithOAuth({
				provider: "google",
			}),
		signInWithFacebook: async (data) => {
			await supabase.auth.signInWithOAuth({
				provider: "facebook",
			})
		},
		signInWithDiscord: async (data) => {
			await supabase.auth.signInWithOAuth({
				provider: "discord",
			})
		},
		signOut: async () => await supabase.auth.signOut(),
		user,
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	return useContext(AuthContext)
}
