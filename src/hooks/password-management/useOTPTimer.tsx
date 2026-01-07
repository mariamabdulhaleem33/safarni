import { useTimer } from 'react-timer-hook';

export const useOTPTimer = (duration:number = 59) =>{
  const getExpiryTimestamp = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + duration);
    return time;
  };

  const {
    seconds,
    isRunning,
    restart,
  } = useTimer({
    expiryTimestamp: getExpiryTimestamp(),
    autoStart: true,
    onExpire: () => console.log('Expired'),
  });

  const resend = (newDuration = duration) => {
    const newExpiry = new Date();
    newExpiry.setSeconds(newExpiry.getSeconds() + newDuration);
    restart(newExpiry, true);
  };

  return {
    seconds,
    isRunning,
    resend,
  };
}