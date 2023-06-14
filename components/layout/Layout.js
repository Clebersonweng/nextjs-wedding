import MainNavigation from './MainNavigation';

function Layout(props) {
	return (
		<div className='static'>
			<MainNavigation />
			<main className='w-full bg-white-400'>{props.children}</main>
		</div>
	);
}

export default Layout;