export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='py-4 text-center text-gray-600'>
      All rights reserved &copy;VivaCare {year} - IgorJFS
    </footer>
  );
}
