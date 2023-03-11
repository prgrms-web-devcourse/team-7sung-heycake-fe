interface RemoveImageButtonProp {
  onClick: () => void;
}

function RemoveImageButton({ onClick }: RemoveImageButtonProp) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: -10, right: -10 }}
      cursor="pointer"
      onClick={onClick}
    >
      <circle cx="12.0002" cy="12.0002" r="10.8" fill="#EFEFEF" />
      <path
        d="M15.458 15.6006L8.40045 8.54302"
        stroke="#999999"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.54395 15.4575L15.6015 8.39996"
        stroke="#999999"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default RemoveImageButton;
