export const TitlePage: React.FC<{ title: string }> = ({ title }) => {
  return <h1 className="font-semibold mb-2 text-xl md:text-3xl">{title}</h1>;
};
