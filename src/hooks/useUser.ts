import { useEffect, useState } from 'react';

const useUser = () => {
  const [user, setUser] = useState<string>('');

  useEffect(() => {
    const storedUser = localStorage.getItem('devdesign-user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const saveUser = (name: string) => {
    localStorage.setItem('devdesign-user', name);
    setUser(name);
  };
  const clearUser = () => {
    localStorage.removeItem('devdesign-user');
    setUser('');
    window.location.reload();
  };

  return { user, saveUser, clearUser };
};

export default useUser;
