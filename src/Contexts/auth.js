import React, { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"

const AuthContext = React.createContext()

export function AuthProvider({ children }) {
	const [user, setUser] = useState()
	const [language, setLanguage] = useState(
		localStorage.getItem("unime-language") || "vi"
	)
	const [loading, setLoading] = useState(true)

	const navigate = useNavigate()

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
			if (authListener) {
				authListener.subscription.unsubscribe()
			}
		}
	}, [])

	// Will be passed down to components
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
		setLanguage: (data) => {
			localStorage.setItem("unime-language", data)
			if (data === "eng") {
				navigate("/eng")
			} else {
				navigate("/")
			}
			setLanguage(data)
		},
		language,
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
