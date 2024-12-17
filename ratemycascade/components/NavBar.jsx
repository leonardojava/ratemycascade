import Link from 'next/link';

export default function NavBar() {
    /**
     * <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    <div href="/">Rate my Cascade</div>
                </div>
                <div className="flex space-x-4">
                    <Link href="/search">
                        <div className="text-white">Search</div>
                    </Link>
                    <Link href="/">
                        <div className="text-white">Login</div>
                    </Link>
                    <Link href="/dashboard">
                            <div className="text-white">Dashboard</div>
                    </Link>
                </div>
            </div>
     */
    return (
        <div className="flex justify-between items-center max-w-full h-20 px-4 text-xl font-bold text-white" style = {{background: '#8a1e15'}}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">
                    <div href="/">Rate my Cascade</div>
                </div>
                <div className="flex space-x-4">
                    <Link href="/search">
                        <div className="text-white">Search</div>
                    </Link>
                    <Link href="/">
                        <div className="text-white">Login</div>
                    </Link>
                    <Link href="/dashboard" passHref className="text-white" target="_blank" rel="noopener noreferrer">
                         Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}