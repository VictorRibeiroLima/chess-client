export function millisecondsToString(milliseconds: number): string {
  if (milliseconds < 0) {
    throw new Error("Time cannot be negative");
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const remainingMilliseconds = milliseconds % 1000;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMilliseconds = String(remainingMilliseconds).padStart(3, '0');

  return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}