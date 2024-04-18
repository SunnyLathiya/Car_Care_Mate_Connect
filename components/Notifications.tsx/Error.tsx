export const InlineError = ({ text }: { text: any }) => {
    return (
      <div className="text-subMain w-full mt-2 text-xs font-medium">
        <p>{text}</p>
      </div>
    );
  };
  