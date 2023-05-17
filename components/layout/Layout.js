import MainNavigation from './MainNavigation';

function Layout(props) {
	return (
		<div>
			<MainNavigation />
			<main className='w-full overflow-y-auto bg-white-400'>{props.children}</main>
		</div>
	);
}

export default Layout;