export const isGreeting = (text: string) => {
  const greetings = ['hi', 'hello', 'hey', 'hii', ' '];
  return greetings.includes(text.toLowerCase().trim());
};
