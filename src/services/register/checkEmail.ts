const checkEmailAvailability = (email: string) => {
  try {
    const userData = localStorage.getItem('user');

    if (!userData) return true;

    const user = JSON.parse(userData);

    return user.email !== email;
  } catch (error) {
    console.error('Failed to parse localStorage user:', error);

    return true;
  }
};

export default checkEmailAvailability;
