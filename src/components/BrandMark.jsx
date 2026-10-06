// حيّاك's mark: a speech bubble with three dots — the store saying hello.
export default function BrandMark({ className = '', title }) {
  return (
    <svg
      className={'mark ' + className}
      viewBox="0 0 48 48"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path className="mark-bubble" d="M12 6h24a9 9 0 0 1 9 9v13a9 9 0 0 1-9 9H25l-9 7.5V37h-4a9 9 0 0 1-9-9V15a9 9 0 0 1 9-9z" />
      <circle className="mark-dot" cx="16" cy="21.5" r="3" />
      <circle className="mark-dot" cx="24" cy="21.5" r="3" />
      <circle className="mark-dot" cx="32" cy="21.5" r="3" />
    </svg>
  );
}
