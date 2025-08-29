export function FlyingBirdIcon() {
  return (
    <div className="mb-6 relative">
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        className="text-birds-secondary/50 mx-auto"
        style={{ animation: 'soar 4s ease-in-out infinite' }}
      >
        <path
          d="M50 25C45 25 40 30 40 30S45 35 50 35S60 30 60 30S55 25 50 25Z"
          fill="currentColor"
        />
        <path
          d="M40 30C35 35 25 45 25 45L40 40L40 30Z"
          fill="currentColor"
          style={{ animation: 'wingFlap 1.2s ease-in-out infinite' }}
        />
        <path
          d="M60 30C65 35 75 45 75 45L60 40L60 30Z"
          fill="currentColor"
          style={{ animation: 'wingFlap 1.2s ease-in-out infinite reverse' }}
        />
      </svg>
    </div>
  );
}