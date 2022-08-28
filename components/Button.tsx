type Props = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export const Button = (props: Props) => {
  const style = [
    "flex",
    "gap-4",
    "items-center",
    "space-x-3",
    "px-4",
    "h-12",
    "bg-slate-800",
    "rounded-lg",
    "text-slate-200",
    "hover:bg-slate-700",
  ];

  if (props.className) {
    style.push(props.className);
  }

  return (
    <button className={style.join(" ")} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
