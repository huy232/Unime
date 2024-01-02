import React, { useContext, useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"

const AuthContext = React.createContext()

export function AuthProvider({ children }) {
	const [user, setUser] = useState()
	const [language, setLanguage] = useState(
		localStorage.getItem("unime-language") || "eng"
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
	const contextValue = useMemo(
		() => ({
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
		}),
		[user, language, navigate]
	)

	return (
		<AuthContext.Provider value={contextValue}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	const {
		signUp,
		signIn,
		signInWithGoogle,
		signInWithFacebook,
		signInWithDiscord,
		signOut,
		user,
		setLanguage,
		language,
	} = context
	const memoizedContext = useMemo(
		() => ({
			signUp,
			signIn,
			signInWithGoogle,
			signInWithFacebook,
			signInWithDiscord,
			signOut,
			user,
			setLanguage,
			language,
		}),
		[
			language,
			setLanguage,
			signIn,
			signInWithDiscord,
			signInWithFacebook,
			signInWithGoogle,
			signOut,
			signUp,
			user,
		]
	)
	return memoizedContext
}
