'use client'
import Faq from '@/components/main/Faq'
import Header from '@/components/main/Header'
import History from '@/components/main/History'
import Main from '@/components/main/Main'
import { useDispatch, Provider } from 'react-redux'
import { AppDispatch, AppStore, store } from '../store/store'
import { initializeAuth } from '../store/authActions'
import { useEffect, useRef } from 'react'
import StoreProvider from '../store/storeProvider'

export default function Home() {
	const storeRef = useRef<AppStore | null>(null)
	if (!storeRef.current) {
		storeRef.current = store()
		storeRef.current.dispatch(initializeAuth())
	}
	return (
		<Provider store={storeRef.current}>
			<Header />
			<Main />
			<History />
			<Faq />
		</Provider>
	)
}
