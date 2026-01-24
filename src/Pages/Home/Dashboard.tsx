// import { useEffect, useRef } from 'react';
// import { useAppDispatch, useAppSelector } from '@/Redux/Store/hooks';
// import { fetchUsers, selectUser } from '@/Redux/Store/usersSlice';
// import UserDrawer from '@/components/Molecules/UserDrawer';

const Dashboard = () => {
  // https://dummyjson.com/docs/users

  // const FindUniqueNumbers = (input: number[]): number[] => {
  //   const counts = new Map<number, number>();
  //   for (const num of input) {
  //     counts.set(num, (counts.get(num) || 0) + 1);
  //   }
  //   return input.filter(num => counts.get(num) === 1);
  // };
  // const nums: number[] = [1, 2, 2, 3, 4, 4, 5];
  // const unique: number[] = FindUniqueNumbers(nums);

  // console.log(unique, 'numbers');
  // const dispatch = useAppDispatch();
  // const { list, loading, page } = useAppSelector(s => s.users);
  // const loaderRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (list.length === 0) {
  //     dispatch(fetchUsers(0));
  //   }
  // }, []);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting && !loading) {
  //       dispatch(fetchUsers(page));
  //     }
  //   });

  //   if (loaderRef.current) observer.observe(loaderRef.current);
  //   return () => observer.disconnect();
  // }, [loading, page]);

  return (
    <div className="h-screen overflow-auto p-6">
      {/* <table className="min-w-full rounded bg-white shadow">
        <thead className="sticky top-0 bg-gray-200">
          <tr>
            {[
              'ID',
              'First Name',
              'Last Name',
              'Username',
              'Email',
              'Phone',
              'IP',
            ].map(h => (
              <th key={h} className="px-4 py-2 text-left text-sm font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((u, i) => (
            <tr
              key={i}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => dispatch(selectUser(u))}
            >
              <td className="px-4 py-2">{u?.id}</td>
              <td className="px-4 py-2">{u?.firstName}</td>
              <td className="px-4 py-2">{u?.lastName}</td>
              <td className="px-4 py-2">{u?.username}</td>
              <td className="px-4 py-2">{u?.email}</td>
              <td className="px-4 py-2">{u?.phone}</td>
              <td className="px-4 py-2">{u?.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div ref={loaderRef} className="h-10" />
      <UserDrawer /> */}
    </div>
  );
};

export default Dashboard;
