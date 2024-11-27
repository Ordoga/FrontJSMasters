export default function Header({ nickname }) {
    return (
        <header className='flex items-center justify-between bg-[#4A628A] px-16 header'>
            <h1 className='text-[#DFF2EB] text-2xl font-bold'>JS Masters</h1>

            {nickname && <div className='text-[#DFF2EB] text-2xl'>{`Hello ${nickname}`}</div>}
        </header>
    )
}
