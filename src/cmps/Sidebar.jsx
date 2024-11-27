export default function Sidebar({ userList }) {
    return (
        <div className='sidebar flex flex-col items-center'>
            {userList &&
                userList.map(user => (
                    <div className='flex w-full justify-between px-8' key={user.id}>
                        <div>{user.nickname}</div>
                        <div>{user.score}</div>
                    </div>
                ))}
        </div>
    )
}
