import { useAppDispatch, useAppSelector } from '@/Redux/Store/hooks';
import { clearUser } from '@/Redux/Store/usersSlice';
import { Fragment } from 'react';

export default function UserDrawer() {
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(s => s.users.selectedUser);

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className={
          `fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ` +
          (selectedUser
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0')
        }
        onClick={() => dispatch(clearUser())}
      />

      {/* Drawer */}
      <aside
        className={
          `fixed right-0 top-0 z-50 h-full w-96 bg-white shadow-xl ` +
          `transform transition-transform duration-300 ease-out ` +
          (selectedUser ? 'translate-x-0' : 'translate-x-full')
        }
      >
        {selectedUser && (
          <div className="p-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <img
                src={selectedUser?.image}
                alt="avatar"
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <h2 className="text-lg font-semibold">
                  {selectedUser?.firstName} {selectedUser?.lastName}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedUser?.username}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-6 text-sm">
              <p>
                <span className="font-medium">Age:</span> {selectedUser?.age}
              </p>
              <p>
                <span className="font-medium">Blood group:</span>{' '}
                {selectedUser?.bloodGroup}
              </p>
              <div className="flex w-1/2 gap-4">
                <p>
                  <span className="font-medium">Height:</span>{' '}
                  {selectedUser?.height}
                </p>
                <p>
                  <span className="font-medium">Weight:</span>{' '}
                  {selectedUser?.weight}
                </p>
              </div>
              <div className="flex w-1/2 gap-4">
                <p>
                  <span className="font-medium">Bye color:</span>{' '}
                  {selectedUser?.eyeColor}
                </p>
                <p>
                  <span className="font-medium">Hair color:</span>{' '}
                  {selectedUser?.hair?.color}
                </p>
              </div>

              <p className="pt-2">
                <span className="font-medium">Address:</span>
                <br />
                {selectedUser?.address?.address}, {selectedUser?.address?.city},{' '}
                {selectedUser?.address?.state}
              </p>
              <p className="pt-2">
                <span className="font-medium">Address:</span>
                <br />
                {selectedUser?.address?.address}, {selectedUser?.address?.city},{' '}
                {selectedUser?.address?.state}
              </p>
            </div>
          </div>
        )}
      </aside>
    </Fragment>
  );
}
