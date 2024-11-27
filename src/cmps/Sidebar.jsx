export default function Sidebar({ userList }) {
    return (
        <div className='sidebar flex flex-col items-center'>
            {userList.map(user => (
                <div className='flex justify-between px-2'>
                    <div>{user.nickname}</div>
                    <div>{user.score}</div>
                </div>
            ))}
        </div>
    )
}
