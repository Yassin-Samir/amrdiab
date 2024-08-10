function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-[1200px] mx-auto mt-[140px] mb-20">{children}</main>
  );
}

export default layout;
