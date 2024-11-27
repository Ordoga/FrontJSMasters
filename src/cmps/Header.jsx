export default function Header({ userData }) {
    return (
        <header className='flex items-center justify-between bg-[#4A628A] text-[#DFF2EB] px-16 header'>
            <h1 className='text-2xl font-bold'>JS Masters</h1>
            {userData && (
                <div>
                    <div className='text-[#DFF2EB] text-2xl'>{`Hello ${userData.nickname}`}</div>
                    <div>{`Score : ${userData.score}`}</div>
                </div>
            )}
        </header>
    )
}
