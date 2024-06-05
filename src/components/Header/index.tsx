import Link from 'next/link';
import { Container } from '#components/Container';
import { CartButton } from '#components/CartButton';
// import { ToggleThemeButton } from '#components/ToggleThemeButton';

/* dark styles backup: header
  ${({ theme }) => theme.dark && css`
    background-color: ${colors.dark.blue4};
  `}
*/

export function Header () {
  return  (
    <header className="sticky top-0 z-10 bg-[--color-marine-blue]">
      <Container>
        <nav className="
          flex justify-between items-center
          h-[60px] md:h-[70px] lg:h-[80px]
        ">
          <Link href="/">
            <h2 className="cursor-pointer
              text-[18px] uppercase
              text-[--color-white]
            ">
              SHOP
            </h2>
          </Link>
          
          <div className="flex items-center gap-x-[16px] md:gap-x-[30px]">
            <Link className="
                text-[18px] capitalize
                text-[--color-white]
                cursor-pointer
              "
              href="/"
            >
              Home
            </Link>
            <Link className="
                text-[18px] capitalize
                text-[--color-white]
                cursor-pointer
              "
              href="/record"
            >
              Record
            </Link>
            {/* <ToggleThemeButton /> */}
            <CartButton />
          </div>
        </nav>
      </Container>
    </header>
  );
}