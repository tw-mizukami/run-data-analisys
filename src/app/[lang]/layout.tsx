// import {usePathname} from "next/navigation"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // const pathname = usePathname();

  return (
    <>
      <div className="text-white">
      </div>
      {children}
    </>
  );
}
