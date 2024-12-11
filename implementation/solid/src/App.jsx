import { createSignal, createEffect, onCleanup } from "solid-js";

const timerOptions = [
  { label: "25", value: 25 },
  { label: "20", value: 20 },
  { label: "15", value: 15 },
  { label: "10", value: 10 },
  { label: "5", value: 5 },
];

export default function App() {
  const [selectedOption, setSelectedOption] = createSignal(null);
  const [countDown, setCountDown] = createSignal(0);
  const [timerInterval, setTimerInterval] = createSignal(null);
  let audioRef;

  onCleanup(() => {
    if (timerInterval()) {
      clearInterval(timerInterval());
    }
  });

  const startTimer = () => {
    if (timerInterval()) {
      clearInterval(timerInterval());
    }

    setCountDown(selectedOption());
    const interval = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          audioRef
            .play()
            .catch((err) => console.warn("Audio playback failed:", err));
          setSelectedOption(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimerInterval(interval);
  };

  return (
    <>
      <div>
        <p>Count down options</p>
        {timerOptions.map((option) => (
          <button
            aria-pressed={selectedOption() === option.value}
            onClick={() => setSelectedOption(option.value)}
          >
            {option.label}
          </button>
        ))}
        <button
          onClick={() => {
            if (timerInterval()) {
              clearInterval(timerInterval());
              setTimerInterval(null);
            }
            setSelectedOption(null);
            setCountDown(0);
          }}
        >
          reset
        </button>
      </div>
      <div>
        {selectedOption() && (
          <div>
            <div>selected option: {selectedOption()}</div>
            <button onClick={startTimer}>
              start
            </button>
            {countDown() > 0 && (
              <div>count down: {countDown()}</div>
            )}
          </div>
        )}
      </div>
      <audio ref={audioRef} src="/audio/audio.mp3"></audio>
    </>
  );
}
